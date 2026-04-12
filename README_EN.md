<div align="center">

# 🚀 PageSkill

### Turn plain Markdown into publication-ready layouts in seconds

**A creator-first editor for WeChat, blogs, and social media: write, preview, copy, publish.**

[![PageSkill](https://img.shields.io/badge/PageSkill-v1.0.0-6366f1?style=for-the-badge&labelColor=1e1b4b)](https://github.com/AIPMAndy/PageSkill)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&labelColor=%231e1b4b)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript&labelColor=%231e1b4b)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-8b5cf6?style=flat-square&logo=vite&labelColor=%231e1b4b)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Apache--2.0-green?style=flat-square&labelColor=%231e1b4b)](LICENSE)

[简体中文](README.md) | **English**

<img src="assets/demo.gif" width="760" alt="PageSkill demo" />

**[⚡ Live Demo](https://pageskill-demo.vercel.app)** · **[📚 Wiki](https://github.com/AIPMAndy/PageSkill/wiki)** · **[🌟 Star the project](https://github.com/AIPMAndy/PageSkill/stargazers)**

</div>

---

## 🔥 Why creators choose PageSkill

- **WYSIWYG workflow**: write on the left, instantly preview final output on the right.
- **One-click copy**: copy formatted content or raw HTML with less manual cleanup.
- **Social-ready export**: export high-quality PNG for posts, covers, and share cards.
- **Curated templates**: switch visual styles for technical, business, or storytelling content.
- **Open-source and extensible**: self-host, customize, and ship your own workflows.

> Mission: **Spend less time fixing format, and more time creating great content.**

---

## ✨ Core capabilities

| Capability | What you get |
|---|---|
| 📝 Live Markdown rendering | Immediate visual feedback while writing |
| 🎨 Theme-based layout | Consistent style with built-in templates |
| 📋 Copy formatted content / HTML | Faster publishing with fewer extra steps |
| 🖼️ Export poster image | High-quality PNG output for social platforms |
| 📱 Responsive preview modes | Quick checks for desktop / tablet / mobile |
| 🌙 Dark mode | More comfortable writing at night |

---

## ⚡ Quick start (30 seconds)

```bash
git clone https://github.com/AIPMAndy/PageSkill.git
cd PageSkill
npm install
npm run dev
```

Open: `http://localhost:5173`

---

## 🎯 Use cases

- WeChat article layout and publishing
- Technical blogging and long-form writing
- Tutorials, documentation, and learning materials
- Social media visual content (X, LinkedIn, RED, etc.)

---

## 🧰 Tech stack

- React 18 + TypeScript
- Vite + Tailwind CSS
- marked + DOMPurify
- html2canvas + lucide-react

---

## 📂 Project structure

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

## 🗺️ Roadmap

- [x] Live Markdown rendering
- [x] Copy formatted content / HTML
- [x] Image export
- [x] Multi-template support
- [ ] Custom template builder
- [ ] More export formats (e.g., PDF)
- [ ] Team collaboration and cloud sync

---

## 🤝 Contributing

Issues and PRs are welcome.

Good first contributions:
- New templates
- Editor UX improvements
- Export quality and compatibility enhancements
- Documentation and examples

---

## 📄 License

Apache-2.0

---

<div align="center">

### If PageSkill saves you formatting time, please give it a ⭐

**Made with ❤️ by [Andy | AI酋长](https://github.com/AIPMAndy)**

</div>


---

## ✅ Project health check (April 4, 2026)

Validated locally:

- TypeScript check passes: `npm run lint`
- Production build passes: `npm run build`
- `lint:eslint` currently fails because the repo does not include ESLint v9 `eslint.config.*`

> Recommended next step: add ESLint v9 flat config to make CI checks fully green.

---

## 🧪 Common commands

```bash
npm run dev
npm run lint
npm run build
npm run preview
```
