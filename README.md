# MDskill-Web

> 🌐 **MDskill 品牌的 Web 端** - 精美的 Markdown 在线排版工具

**MDskill 产品矩阵：**
- 🖥️ [**MDskill (Mac)**](https://github.com/AIPMAndy/MDskill) - Apple Silicon 原生 Markdown 编辑器（开发中）
- 🌐 **MDskill-Web** - 在线排版工具（本项目）

---

## 📸 产品截图

<img width="1462" height="798" alt="截屏2026-04-25 08 44 00" src="https://github.com/user-attachments/assets/abd2d6b0-0964-4680-8176-f07cc005ed9e" />

## ✨ 特性

- 🎨 **13 种主题模板** - 覆盖商务、创意、技术、极简、故事 5 大场景
- 📱 **微信公众号适配** - 完全内联样式，直接复制粘贴到公众号编辑器
- 🚀 **实时预览** - 边写边看，所见即所得
- 💾 **一键导出** - 支持导出为 HTML 和 PNG 图片
- 🔧 **命令行工具** - 支持批量处理和自动化
- 🌐 **OpenClaw 调度** - 可通过 OpenClaw 直接调用

## 🚀 快速开始

### 在线使用

#### 方式一：开发模式（推荐）

```bash
npm install
npm run dev
# 访问 http://localhost:5173
```

#### 方式二：生产构建

```bash
npm install
npm run build
# 使用任意 HTTP 服务器打开 dist/ 目录
```

### 命令行使用

```bash
npm install
node cli.js <markdown-file> [options]
```

## 💻 想要更强大的编辑体验？

**试试 MDskill Mac 版！**

🖥️ [**MDskill (Mac)**](https://github.com/AIPMAndy/MDskill) - Apple Silicon 原生 Markdown 编辑器

**为什么选择 Mac 版：**
- ⚡️ **极致性能** - 原生 Swift 开发，启动 < 1秒，内存 < 100MB
- 🎨 **精美设计** - 专为 macOS 设计的现代界面
- 🇨🇳 **中文优化** - 完美的中英混排、标点挤压、字体回退
- 🔄 **无缝同步** - 与 MDskill-Web 数据互通（开发中）
- 📦 **本地优先** - 数据完全掌控，支持 iCloud 同步

**MDskill-Web vs MDskill Mac：**
| 特性 | MDskill-Web | MDskill Mac |
|------|-------------|-------------|
| 平台 | 浏览器（全平台） | macOS 专属 |
| 性能 | 中等 | 极致 |
| 使用场景 | 快速排版、公众号发布 | 长时间写作、专业编辑 |
| 价格 | 免费 | $19.99 |

---

## 📄 完整文档

详细的模板列表、微信公众号使用指南、命令行工具说明，请查看：
- [CLI 文档](./CLI.md)
- [英文文档](./README_EN.md)

## 🛠️ 技术栈

- React 18 + TypeScript + Vite
- Tailwind CSS
- marked (Markdown 解析)
- html2canvas (导出)

## 📄 许可证

Apache 2.0 + 附加条款

### ✅ 允许
- 个人学习、企业内部使用、开源引用

### ❌ 禁止（除非书面授权）
- 去品牌化、商业 SaaS、转售

**商业授权联系**：微信 AIPMAndy

## 📮 联系方式

- **作者**: Andy | AI酋长
- **微信**: AIPMAndy
- **GitHub**: [@AIPMAndy](https://github.com/AIPMAndy)

---

<div align="center">

**MDskill 品牌产品矩阵**

[🖥️ MDskill Mac](https://github.com/AIPMAndy/MDskill) · [🌐 MDskill-Web](https://github.com/AIPMAndy/MDskill-Web)

Made with ❤️ by Andy

</div>
