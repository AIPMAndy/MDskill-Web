<div align="center">

# 🚀 PageSkill

### 把普通 Markdown，变成「可直接发布」的爆款排版

**面向公众号 / 博客 / 社媒创作者的实时排版工具：写完即预览，复制即发布。**

[![PageSkill](https://img.shields.io/badge/PageSkill-v1.0.0-6366f1?style=for-the-badge&labelColor=1e1b4b)](https://github.com/AIPMAndy/PageSkill)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&labelColor=%231e1b4b)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript&labelColor=%231e1b4b)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-8b5cf6?style=flat-square&logo=vite&labelColor=%231e1b4b)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Apache--2.0-green?style=flat-square&labelColor=%231e1b4b)](LICENSE)

[English](README_EN.md) | **简体中文**

<img src="assets/demo.gif" width="760" alt="PageSkill 在线排版演示" />

**[⚡ 在线体验](https://pageskill-demo.vercel.app)** · **[📚 Wiki 文档](https://github.com/AIPMAndy/PageSkill/wiki)** · **[🌟 Star 支持项目](https://github.com/AIPMAndy/PageSkill/stargazers)**

</div>

---

## 🔥 为什么创作者会喜欢 PageSkill

- **所见即所得**：左写右看，实时看到最终发布效果。
- **一键复制排版**：支持复制排版内容与 HTML 源码，减少手工调格式。
- **快速出图发平台**：支持导出 PNG，适合小红书、朋友圈、社媒封面。
- **多风格模板**：写技术、写观点、写故事，都有匹配版式。
- **开源可控**：可二开、可定制，不受 SaaS 功能阉割限制。

> 目标很简单：**把你花在“调格式”的时间，换成“写内容”的时间。**

---

## ✨ 核心能力

| 能力 | 说明 |
|---|---|
| 📝 Markdown 实时渲染 | 输入即预览，结构清晰，效率更高 |
| 🎨 主题化排版 | 预设模板快速切换，统一内容风格 |
| 📋 复制排版 / HTML | 可直接粘贴，减少发布前二次处理 |
| 🖼️ 一键导出海报图 | 输出高质量 PNG，适配社媒传播 |
| 📱 多端视图预览 | 桌面 / 平板 / 手机模式快速检查 |
| 🌙 深色模式 | 夜间写作更舒适 |

---

## ⚡ 30 秒本地启动

```bash
git clone https://github.com/AIPMAndy/PageSkill.git
cd PageSkill
npm install
npm run dev
```

访问：`http://localhost:5173`

---

## ✅ 项目可用性自检（2026-04-04）

本地已验证：

- TypeScript 类型检查可通过：`npm run lint`
- 生产构建可通过：`npm run build`
- `lint:eslint` 当前会失败（原因：仓库还未提供 ESLint v9 的 `eslint.config.*`）

> 建议下一步：补齐 ESLint v9 flat config，保证 CI 一次性通过。

---

## 🚀 爆火增长玩法（开源项目实战版）

想让项目“爆火”，核心不是只做功能，而是**降低首次成功成本 + 提高传播素材密度**：

1. **首屏 10 秒打动人**：保留 GIF，但再加 3 张“前后对比图”（原始 Markdown vs 发布效果）。
2. **给出可复制模板**：增加「公众号开场白模板」「技术长文模板」「小红书卡片模板」三个示例。
3. **做分发钩子**：每次导出后提示“本排版由 PageSkill 生成（可关闭）”，形成自然扩散。
4. **做 OpenClaw 场景案例**：放 1 个自动化流程图，告诉用户“输入主题 -> AI 生成 -> PageSkill 排版 -> 导出发布”。
5. **发布节奏固定化**：每周发布 1 个模板 + 1 条使用案例，持续占领搜索。

---

## 🧪 常用命令

```bash
# 启动开发环境
npm run dev

# 类型检查
npm run lint

# 构建产物
npm run build

# 预览构建结果
npm run preview
```

---

## 🎯 适用场景

- 公众号文章排版与发布
- 技术博客、教程、专栏写作
- 课程讲义 / 知识卡片可视化
- 社媒图文内容（X、LinkedIn、小红书等）

---

## 🧰 技术栈

- React 18 + TypeScript
- Vite + Tailwind CSS
- marked + DOMPurify
- html2canvas + lucide-react

---

## 📂 目录结构

```bash
PageSkill/
├── public/
├── src/
│   ├── components/
│   │   ├── Editor/
│   │   ├── Header/
│   │   ├── Poster/
│   │   ├── Preview/
│   │   └── Sidebar/
│   ├── templates/
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---


## 🤖 OpenClaw 直接调度

已支持通过 URL 参数和 `postMessage` 直接调度 PageSkill：

- URL 参数：`?template=tech&view=mobile&dark=1&markdown=%23%20标题`
- 消息协议：

```js
window.postMessage({
  type: 'pageskill.command',
  payload: { action: 'setMarkdown', markdown: '# OpenClaw 调度成功' }
}, '*')
```

可用 action：`setMarkdown` / `setTemplate` / `setViewMode` / `toggleDark` / `copyRich` / `copyHTML` / `exportHTML` / `openPoster`。

OpenClaw 直接调用（宿主页面）示例：

```js
await window.PageSkillOpenClaw.dispatch({
  action: 'setTemplate',
  templateId: 'tech'
})
```

## 🗺️ Roadmap

- [x] Markdown 实时渲染
- [x] 复制排版 / HTML
- [x] 图片导出
- [x] 多模板支持
- [ ] 自定义模板编辑器
- [ ] 更多导出格式（如 PDF）
- [ ] 团队协作与云端同步

---

## 🤝 贡献

欢迎 Issue / PR！

你可以贡献：
- 新主题模板
- 编辑体验优化
- 导出质量与兼容性改进
- 文档与示例完善

---

## 📄 License

Apache-2.0

---

<div align="center">

### 如果这个项目帮你省下了排版时间，给个 ⭐ Star 就是最大的支持

**Made with ❤️ by [Andy | AI酋长](https://github.com/AIPMAndy)**

</div>
