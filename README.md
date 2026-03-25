<div align="center">

# ✦ PageSkill

**Markdown 转精美排版文章 —— 专为微信公众号、博客和社交媒体优化**

**[English](README_EN.md)** | 简体中文

[![PageSkill](https://img.shields.io/badge/PageSkill-v1.0.0-6366f1?style=for-the-badge&labelColor=1e1b4b)](https://github.com/AIPMAndy/PageSkill)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&labelColor=%231e1b4b)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript&labelColor=%231e1b4b)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38b2ac?style=flat-square&logo=tailwindcss&labelColor=%231e1b4b)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Apache--2.0-green?style=flat-square&labelColor=%231e1b4b)](LICENSE)

<img src="assets/demo.gif" width="700" alt="PageSkill 演示">

**[🚀 在线演示](https://pageskill-demo.vercel.app)** | **[📖 文档](https://github.com/AIPMAndy/PageSkill/wiki)**

</div>

---

## 🆚 为什么选 PageSkill？

| 功能 | Typora | mdnice | 墨滴 | **PageSkill** |
|------|:------:|:------:|:----:|:-------------:|
| 实时预览 | ✅ | ✅ | ✅ | ✅ |
| 导出 HTML | ✅ | ✅ | ✅ | ✅ |
| 导出 PNG 图片 | ❌ | ⚠️ 有限 | ❌ | ✅ **完整支持** |
| 微信公众号优化 | ⚠️ 需手动 | ✅ | ✅ | ✅ **自动优化** |
| 自定义主题 | ✅ | ✅ | ❌ | ✅ **多种预设** |
| 开源免费 | ❌ | ❌ | ❌ | ✅ **完全开源** |
| **永久免费** | ⚠️ 付费 | ⚠️ 部分付费 | ✅ | ✅ **100% 免费** |

**PageSkill** 是唯一专为微信公众号、博客和社交媒体内容创作者设计的开源 Markdown 编辑器 —— 一键导出精美图片，完美保留排版效果。

---

## 🚀 快速开始（30 秒）

```bash
# 克隆仓库
git clone https://github.com/AIPMAndy/PageSkill.git
cd PageSkill

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 `http://localhost:5173` 开始写作。就这么简单。

---

## ✨ 核心功能

| 功能 | 描述 |
|------|------|
| **📝 Markdown 实时预览** | 左边输入，右边实时渲染 |
| **📋 一键复制** | 一键复制渲染后的 HTML |
| **🖼️ 图片导出** | 导出高质量 PNG，适合社交媒体 |
| **🎨 预设主题** | 多种精美主题（微信风、极简、深色） |
| **✨ 丰富排版** | 引用块、标注、代码高亮、层级标题 |
| **📱 响应式** | 桌面端和移动端完美适配 |

---

## 💡 适用场景

- 📝 **微信公众号文章** —— 针对微信排版限制优化
- ✍️ **长文博客** —— Medium、Dev.to、个人博客的专业排版
- 📄 **文档教程** —— 技术文档也能美观专业
- 🎨 **社交媒体内容** —— 导出图片用于 Twitter/X、LinkedIn、小红书

---

## 🛠️ 技术栈

- **React 18** + **TypeScript** —— 现代、类型安全的 UI
- **Vite** —— 快速开发服务器和优化构建
- **Tailwind CSS** —— 原子化 CSS
- **Marked** —— Markdown 解析
- **DOMPurify** —— 安全 HTML 过滤
- **html2canvas** —— 高质量 PNG 导出
- **Lucide React** —— 简洁图标集

---

## 📁 项目结构

```
pageskill/
├── public/              # 静态资源
├── src/
│   ├── components/      # UI 组件
│   ├── hooks/           # 自定义 React Hooks
│   ├── types/           # TypeScript 类型定义
│   ├── utils/           # 工具函数（Markdown、导出、主题）
│   ├── App.tsx          # 主应用布局
│   └── main.tsx         # 入口文件
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 🎯 使用方法

1. 在**左侧面板**输入或粘贴 Markdown
2. 在**右侧面板**预览渲染效果
3. 点击**"复制 HTML"**获取样式化 HTML
4. 或点击**"导出图片"**下载 PNG

---

## 🗺️ 路线图

- [x] 核心 Markdown 渲染
- [x] HTML 复制功能
- [x] PNG 图片导出
- [x] 多主题预设
- [ ] 自定义主题编辑器
- [ ] 插件系统
- [ ] 协作编辑
- [ ] 云端同步

---

## 🤝 参与贡献

欢迎贡献代码！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解贡献指南。

---

## 📄 许可证

Apache 2.0 —— 可自由使用、修改和分发。

---

<div align="center">

**由 [Andy | AI酋长](https://github.com/AIPMAndy) 精心打造**

如果 PageSkill 对你有帮助，请给我们一个 ⭐ **Star**！

[![Twitter](https://img.shields.io/badge/Twitter-@AIPMAndy-1DA1F2?style=flat-square&logo=twitter)](https://twitter.com/AIPMAndy)
[![微信](https://img.shields.io/badge/微信-AIPMAndy-07C160?style=flat-square&logo=wechat)](https://github.com/AIPMAndy)

</div>
