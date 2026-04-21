#!/usr/bin/env node

/**
 * PageSkill CLI - 命令行排版工具
 * 用法: node cli.js <markdown-file> [options]
 */

import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

// 简单的模板系统
const templates = {
  modern: {
    id: 'modern',
    name: '现代风格',
    css: `
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", sans-serif;
        line-height: 1.8;
        color: #2c3e50;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 40px 20px;
        min-height: 100vh;
      }
      .container {
        max-width: 800px;
        margin: 0 auto;
        background: white;
        border-radius: 20px;
        padding: 60px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      }
      h1 {
        font-size: 2.5em;
        color: #667eea;
        margin-bottom: 0.5em;
        text-align: center;
        font-weight: 700;
      }
      h2 {
        font-size: 1.8em;
        color: #764ba2;
        margin-top: 1.5em;
        margin-bottom: 0.8em;
        padding-bottom: 0.3em;
        border-bottom: 3px solid #667eea;
        font-weight: 600;
      }
      h3 {
        font-size: 1.4em;
        color: #5a67d8;
        margin-top: 1.2em;
        margin-bottom: 0.6em;
        font-weight: 600;
      }
      p {
        margin-bottom: 1em;
        font-size: 1.1em;
        color: #4a5568;
      }
      ul, ol {
        margin-left: 2em;
        margin-bottom: 1.5em;
      }
      li {
        margin-bottom: 0.8em;
        font-size: 1.05em;
        color: #4a5568;
      }
      strong {
        color: #667eea;
        font-weight: 600;
      }
      hr {
        border: none;
        border-top: 2px dashed #e2e8f0;
        margin: 2em 0;
      }
      code {
        background: #f7fafc;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Monaco', 'Courier New', monospace;
        font-size: 0.9em;
        color: #e53e3e;
      }
      pre {
        background: #2d3748;
        color: #e2e8f0;
        padding: 20px;
        border-radius: 10px;
        overflow-x: auto;
        margin: 1.5em 0;
      }
      pre code {
        background: none;
        color: inherit;
        padding: 0;
      }
      blockquote {
        border-left: 4px solid #667eea;
        padding-left: 20px;
        margin: 1.5em 0;
        color: #718096;
        font-style: italic;
      }
    `
  },
  minimal: {
    id: 'minimal',
    name: '极简风格',
    css: `
      body {
        font-family: 'Georgia', serif;
        line-height: 1.8;
        color: #333;
        max-width: 700px;
        margin: 60px auto;
        padding: 0 20px;
      }
      h1, h2, h3 {
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
      }
      h1 { font-size: 2em; }
      h2 { font-size: 1.5em; }
      h3 { font-size: 1.2em; }
      p { margin-bottom: 1em; }
      ul, ol { margin-left: 2em; margin-bottom: 1em; }
      li { margin-bottom: 0.5em; }
      strong { font-weight: 600; }
      hr { border: none; border-top: 1px solid #ddd; margin: 2em 0; }
      code {
        background: #f5f5f5;
        padding: 2px 6px;
        border-radius: 3px;
        font-family: 'Monaco', 'Courier New', monospace;
        font-size: 0.9em;
      }
      pre {
        background: #f5f5f5;
        padding: 15px;
        border-radius: 5px;
        overflow-x: auto;
        margin: 1em 0;
      }
      pre code {
        background: none;
        padding: 0;
      }
    `
  },
  tech: {
    id: 'tech',
    name: '技术风格',
    css: `
      body {
        font-family: 'SF Mono', 'Monaco', 'Courier New', monospace;
        line-height: 1.7;
        color: #e2e8f0;
        background: #1a202c;
        padding: 40px 20px;
        min-height: 100vh;
      }
      .container {
        max-width: 900px;
        margin: 0 auto;
        background: #2d3748;
        border-radius: 10px;
        padding: 50px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        border: 1px solid #4a5568;
      }
      h1 {
        font-size: 2.2em;
        color: #63b3ed;
        margin-bottom: 0.5em;
        font-weight: 700;
        border-bottom: 2px solid #4299e1;
        padding-bottom: 0.3em;
      }
      h2 {
        font-size: 1.6em;
        color: #68d391;
        margin-top: 1.5em;
        margin-bottom: 0.8em;
        font-weight: 600;
      }
      h3 {
        font-size: 1.3em;
        color: #f6ad55;
        margin-top: 1.2em;
        margin-bottom: 0.6em;
        font-weight: 600;
      }
      p {
        margin-bottom: 1em;
        font-size: 1em;
        color: #cbd5e0;
      }
      ul, ol {
        margin-left: 2em;
        margin-bottom: 1.5em;
      }
      li {
        margin-bottom: 0.6em;
        font-size: 1em;
        color: #cbd5e0;
      }
      strong {
        color: #fbd38d;
        font-weight: 600;
      }
      hr {
        border: none;
        border-top: 1px solid #4a5568;
        margin: 2em 0;
      }
      code {
        background: #1a202c;
        padding: 3px 8px;
        border-radius: 4px;
        font-family: inherit;
        font-size: 0.95em;
        color: #fc8181;
        border: 1px solid #4a5568;
      }
      pre {
        background: #1a202c;
        color: #e2e8f0;
        padding: 20px;
        border-radius: 8px;
        overflow-x: auto;
        margin: 1.5em 0;
        border: 1px solid #4a5568;
      }
      pre code {
        background: none;
        color: inherit;
        padding: 0;
        border: none;
      }
      blockquote {
        border-left: 4px solid #4299e1;
        padding-left: 20px;
        margin: 1.5em 0;
        color: #a0aec0;
        font-style: italic;
      }
    `
  }
};

function generateHTML(markdown, templateId = 'modern') {
  const template = templates[templateId] || templates.modern;
  const html = marked.parse(markdown);
  
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PageSkill Output</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        ${template.css}
    </style>
</head>
<body>
    <div class="container">
        ${html}
    </div>
</body>
</html>`;
}

// CLI 入口
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('PageSkill CLI - 命令行排版工具');
    console.log('');
    console.log('用法:');
    console.log('  node cli.js <markdown-file> [options]');
    console.log('');
    console.log('选项:');
    console.log('  --template <name>    选择模板 (modern|minimal|tech)，默认: modern');
    console.log('  --output <file>      输出文件路径，默认: 输出到标准输出');
    console.log('');
    console.log('示例:');
    console.log('  node cli.js README.md --template modern --output output.html');
    console.log('  node cli.js article.md --template tech > result.html');
    process.exit(0);
  }
  
  const inputFile = args[0];
  let templateId = 'modern';
  let outputFile = null;
  
  // 解析参数
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--template' && args[i + 1]) {
      templateId = args[i + 1];
      i++;
    } else if (args[i] === '--output' && args[i + 1]) {
      outputFile = args[i + 1];
      i++;
    }
  }
  
  // 验证模板
  if (!templates[templateId]) {
    console.error(`错误: 未知模板 "${templateId}"`);
    console.error(`可用模板: ${Object.keys(templates).join(', ')}`);
    process.exit(1);
  }
  
  // 读取 Markdown 文件
  if (!fs.existsSync(inputFile)) {
    console.error(`错误: 文件不存在 ${inputFile}`);
    process.exit(1);
  }
  
  const markdown = fs.readFileSync(inputFile, 'utf-8');
  const html = generateHTML(markdown, templateId);
  
  // 输出
  if (outputFile) {
    fs.writeFileSync(outputFile, html);
    console.log(`✅ 已生成: ${outputFile}`);
    console.log(`📝 模板: ${templates[templateId].name}`);
    console.log(`📊 大小: ${(html.length / 1024).toFixed(2)} KB`);
  } else {
    console.log(html);
  }
}

main();
