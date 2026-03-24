# ArticleLayout

> 文章排版神器 — 一键生成精美排版，支持海报导出

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646cff)](https://vitejs.dev)

---

## 🎯 项目简介

**ArticleLayout** 是一个面向公众号作者、博客写手的文章排版工具。输入 Markdown，实时预览精美排版，一键复制到微信公众号编辑器。

**核心亮点：**

- 🎨 **6 套精美模板** — 商务 / 文艺 / 科技 / 简约 / 杂志 / 故事
- 🖼️ **海报生成** — 8 种配色风格，自动提取标题和要点
- 📱 **多设备预览** — 手机 / 平板 / 桌面三种视图
- ⚡ **一键复制** — 排版结果直接粘贴到公众号编辑器
- 📊 **实时统计** — 字数、预计阅读时间
- 💾 **自动保存** — 内容和模板选择自动存储到本地

---

## 🚀 快速开始

### 在线使用

> 🚧 在线版本部署中，敬请期待

### 本地运行

```bash
# 克隆仓库
git clone https://github.com/AIPMAndy/ArticleLayout.git
cd ArticleLayout

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 浏览器打开 http://localhost:3000
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

**部署到 Vercel（推荐）：**

```bash
npx vercel
```

---

## 📖 使用指南

### 1. 选择模板

左侧模板栏提供 6 种风格：

| 模板 | 适用场景 | 设计特点 |
|------|---------|---------|
| ✨ 简约现代 | 观点输出、知识分享 | 极简设计、专注阅读 |
| 💼 商务经典 | 商业分析、行业报告 | 深蓝主色、专业严谨 |
| 🌿 文艺清新 | 个人随笔、旅行游记 | 大面积留白、优雅字体 |
| 🖥️ 科技极客 | 技术教程、产品评测 | 深色模式、代码高亮 |
| 📰 杂志风格 | 深度报道、专题策划 | 首字下沉、图文混排 |
| 📖 故事叙述 | 人物专访、品牌故事 | 情感化设计、温暖配色 |

### 2. 编写内容

左侧编辑器支持标准 Markdown 语法，工具栏提供快捷操作：
- 粗体、斜体、引用、代码块、分割线、表格

### 3. 预览 & 导出

- **复制排版** — 富文本直接粘贴到公众号
- **复制 HTML** — 获取 HTML 源码
- **导出文件** — 下载为独立 HTML 文件
- **生成海报** — 选择配色，下载 PNG 封面海报

---

## 🔧 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript |
| 构建 | Vite 5 |
| 样式 | Tailwind CSS 3 |
| Markdown | marked + DOMPurify |
| 海报 | html2canvas |
| 图标 | lucide-react |

### 项目结构

```
ArticleLayout/
├── src/
│   ├── components/
│   │   ├── Editor/        # Markdown 编辑器
│   │   ├── Preview/       # 实时预览
│   │   ├── Header/        # 顶部工具栏
│   │   ├── Sidebar/       # 模板选择栏
│   │   └── Poster/        # 海报生成弹窗
│   ├── templates/         # 模板定义（样式配置）
│   ├── utils/             # 渲染引擎、工具函数
│   ├── App.tsx            # 主应用
│   └── main.tsx           # 入口
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 🗺️ 路线图

### V1.0 ✅ 当前版本
- [x] 6 套内置模板
- [x] 实时 Markdown 编辑 + 预览
- [x] 一键复制排版 / HTML
- [x] 封面海报生成（8 种配色）
- [x] 多设备预览
- [x] 自动保存

### V1.1 🚧 进行中
- [ ] 更多模板（学术、时间轴、对话式）
- [ ] 金句卡片海报
- [ ] 夜间模式优化
- [ ] 自定义样式面板

### V2.0 📋 规划中
- [ ] AI 智能推荐模板
- [ ] 自定义模板编辑器
- [ ] 数据海报（图表可视化）
- [ ] CLI 命令行工具
- [ ] npm 包发布

---

## 🤝 参与贡献

欢迎提交 PR！

1. Fork 本仓库
2. 创建分支 `git checkout -b feature/xxx`
3. 提交代码 `git commit -m 'feat: xxx'`
4. 推送分支 `git push origin feature/xxx`
5. 创建 Pull Request

**贡献方向：**
- 🎨 新增模板
- 🐛 Bug 修复
- 📚 文档完善
- ✨ 新功能

---

## 📄 许可证

[Apache-2.0 License](./LICENSE)

---

**让排版变得简单，让创作回归本质。**

*Made with ❤️ by [Andy | AI酋长](https://github.com/AIPMAndy)*
