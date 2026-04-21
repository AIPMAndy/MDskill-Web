/**
 * 微信公众号专用模板
 * 特点：
 * 1. 所有样式完全内联到标签上
 * 2. 只使用微信白名单内的 CSS 属性
 * 3. 避免使用 class、id
 */

export const wechatStyles = {
  // 微信公众号 CSS 白名单
  body: 'font-family: -apple-system-font, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", Arial, sans-serif; font-size: 17px; line-height: 1.6; color: #3e3e3e; padding: 20px 16px;',
  
  h1: 'font-size: 24px; font-weight: bold; color: #2c2c2c; margin: 20px 0 10px 0; line-height: 1.4;',
  
  h2: 'font-size: 20px; font-weight: bold; color: #2c2c2c; margin: 18px 0 10px 0; padding-bottom: 8px; border-bottom: 2px solid #3e7bff; line-height: 1.4;',
  
  h3: 'font-size: 18px; font-weight: bold; color: #2c2c2c; margin: 16px 0 8px 0; line-height: 1.4;',
  
  p: 'margin: 10px 0; font-size: 16px; line-height: 1.8; color: #3e3e3e; text-align: justify;',
  
  ul: 'margin: 10px 0; padding-left: 20px;',
  ol: 'margin: 10px 0; padding-left: 20px;',
  
  li: 'margin: 8px 0; font-size: 16px; line-height: 1.8; color: #3e3e3e;',
  
  strong: 'font-weight: bold; color: #3e7bff;',
  
  em: 'font-style: italic; color: #666;',
  
  blockquote: 'margin: 15px 0; padding: 10px 15px; background-color: #f7f7f7; border-left: 4px solid #3e7bff; color: #666; font-style: italic;',
  
  code: 'font-family: Menlo, Monaco, Consolas, "Courier New", monospace; font-size: 14px; background-color: #f5f5f5; padding: 2px 6px; border-radius: 3px; color: #e74c3c;',
  
  pre: 'margin: 15px 0; padding: 15px; background-color: #2c2c2c; border-radius: 5px; overflow-x: auto; font-family: Menlo, Monaco, Consolas, "Courier New", monospace; font-size: 14px; line-height: 1.6; color: #f8f8f2;',
  
  hr: 'margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;',
  
  a: 'color: #3e7bff; text-decoration: none;',
  
  img: 'max-width: 100%; height: auto; display: block; margin: 15px auto;'
};

// 生成内联样式的 HTML
export function generateWechatHTML(markdown) {
  const { marked } = require('marked');
  
  // 自定义渲染器
  const renderer = new marked.Renderer();
  
  renderer.heading = (text, level) => {
    const style = wechatStyles[`h${level}`] || wechatStyles.h3;
    return `<h${level} style="${style}">${text}</h${level}>`;
  };
  
  renderer.paragraph = (text) => {
    return `<p style="${wechatStyles.p}">${text}</p>`;
  };
  
  renderer.list = (body, ordered) => {
    const tag = ordered ? 'ol' : 'ul';
    const style = wechatStyles[tag];
    return `<${tag} style="${style}">${body}</${tag}>`;
  };
  
  renderer.listitem = (text) => {
    return `<li style="${wechatStyles.li}">${text}</li>`;
  };
  
  renderer.strong = (text) => {
    return `<strong style="${wechatStyles.strong}">${text}</strong>`;
  };
  
  renderer.em = (text) => {
    return `<em style="${wechatStyles.em}">${text}</em>`;
  };
  
  renderer.blockquote = (quote) => {
    return `<blockquote style="${wechatStyles.blockquote}">${quote}</blockquote>`;
  };
  
  renderer.codespan = (code) => {
    return `<code style="${wechatStyles.code}">${code}</code>`;
  };
  
  renderer.code = (code, language) => {
    return `<pre style="${wechatStyles.pre}"><code>${code}</code></pre>`;
  };
  
  renderer.hr = () => {
    return `<hr style="${wechatStyles.hr}">`;
  };
  
  renderer.link = (href, title, text) => {
    return `<a href="${href}" style="${wechatStyles.a}" ${title ? `title="${title}"` : ''}>${text}</a>`;
  };
  
  renderer.image = (href, title, text) => {
    return `<img src="${href}" alt="${text}" style="${wechatStyles.img}" ${title ? `title="${title}"` : ''}>`;
  };
  
  marked.setOptions({ renderer });
  
  const html = marked.parse(markdown);
  
  return `<section style="${wechatStyles.body}">${html}</section>`;
}
