# PageSkill CLI

命令行版本的 PageSkill，支持通过命令行快速将 Markdown 转换为精美排版的 HTML。

## 🚀 快速开始

```bash
# 基本用法
node cli.js input.md --output output.html

# 指定模板
node cli.js input.md --template tech --output output.html

# 输出到标准输出（可配合管道使用）
node cli.js input.md > output.html
```

## 📋 命令行参数

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `<markdown-file>` | 输入的 Markdown 文件路径（必填） | - |
| `--template <name>` | 选择模板风格 | `modern` |
| `--output <file>` | 输出 HTML 文件路径 | 标准输出 |

## 🎨 可用模板

### modern（现代风格）
- 渐变紫色背景
- 卡片式白色内容区
- 适合产品介绍、项目更新

### minimal（极简风格）
- 纯白背景
- 衬线字体
- 适合长文阅读、博客文章

### tech（技术风格）
- 深色主题
- 等宽字体
- 适合技术文档、代码教程

## 💡 使用示例

### 示例 1：生成项目更新文档
```bash
node cli.js project-update.md --template modern --output update.html
```

### 示例 2：生成技术博客
```bash
node cli.js tech-article.md --template tech --output blog.html
```

### 示例 3：批量转换
```bash
for file in *.md; do
  node cli.js "$file" --template minimal --output "${file%.md}.html"
done
```

### 示例 4：配合 OpenClaw 使用
```bash
# 在 OpenClaw Skill 中调用
node /path/to/PageSkill/cli.js content.md --template modern --output result.html
```

## 🔧 集成到 OpenClaw

PageSkill CLI 可以无缝集成到 OpenClaw 工作流中：

```javascript
// 在 SKILL.md 中调用
exec(`node /path/to/PageSkill/cli.js ${inputFile} --template modern --output ${outputFile}`)
```

## 📦 依赖

CLI 工具依赖 PageSkill 的 npm 包，确保已安装：

```bash
npm install
```

## 🆚 CLI vs Web 版本

| 特性 | CLI | Web |
|------|-----|-----|
| 实时预览 | ❌ | ✅ |
| 批量处理 | ✅ | ❌ |
| 自动化集成 | ✅ | ⚠️ |
| 导出图片 | ❌ | ✅ |
| 自定义主题 | ⚠️ 需修改代码 | ✅ |

## 🎯 适用场景

- **自动化文档生成**：CI/CD 流程中自动生成文档
- **批量转换**：一次性转换多个 Markdown 文件
- **OpenClaw 集成**：作为 Skill 的一部分使用
- **无头环境**：服务器端生成 HTML

## 📝 输出格式

生成的 HTML 文件：
- 完全独立，无外部依赖
- 内联 CSS 样式
- 可直接在浏览器中打开
- 适合分享和发布

## 🔮 未来计划

- [ ] 支持自定义 CSS 模板
- [ ] 支持配置文件（.pageskillrc）
- [ ] 支持 PDF 导出
- [ ] 支持图片优化
- [ ] 支持多文件合并

## 📄 License

Apache-2.0

---

**GitHub**: [AIPMAndy/PageSkill](https://github.com/AIPMAndy/PageSkill)
