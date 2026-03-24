# PageSkill

> Transform Markdown into beautifully typeset articles — ready for WeChat, blogs, or anywhere else.

<div align="center">

![PageSkill](https://img.shields.io/badge/PageSkill-v1.0.0-6366f1?style=for-the-badge&labelColor=1e1b4b)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&labelColor=%231e1b4b)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript&labelColor=%231e1b4b)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38b2ac?style=flat-square&logo=tailwindcss&labelColor=%231e1b4b)
![License](https://img.shields.io/badge/License-Apache--2.0-green?style=flat-square&labelColor=%231e1b4b)

</div>

---

## ✦ What It Does

Write in Markdown. Get a polished, publication-ready article.

PageSkill renders Markdown with handcrafted typography — decorative pull quotes, highlighted code blocks, elegant callouts, and clean headings — then lets you export the result as a styled image or copy the HTML directly.

**Perfect for:**
- 📝 WeChat public account articles
- ✍️ Long-form blog posts
- 📄 Documentation & tutorials
- 🎨 Content that needs to look *published*, not just functional

---

## ✦ Features

| Feature | Description |
|---------|-------------|
| **Markdown Live Preview** | Type on the left, see the result on the right in real time |
| **One-Click Copy** | Copy the rendered HTML with a single click |
| **Image Export** | Export your article as a high-quality PNG |
| **Preset Themes** | Multiple curated theme styles |
| **Rich Typography** | Pull quotes, callouts, code highlighting, heading hierarchy |
| **Responsive** | Works beautifully on desktop and tablet |

---

## ✦ Quick Start

```bash
# clone the repo
git clone https://github.com/AIPMAndy/PageSkill.git
cd PageSkill

# install dependencies
npm install

# start dev server
npm run dev
```

Open `http://localhost:5173` and start writing.

---

## ✦ Tech Stack

- **React 18** + **TypeScript**
- **Vite** — fast dev server & build tool
- **Tailwind CSS** — utility-first styling
- **Marked** — Markdown parsing
- **DOMPurify** — safe HTML sanitization
- **html2canvas** — PNG export
- **Lucide React** — clean icon set

---

## ✦ Project Structure

```
pageskill/
├── public/              # Static assets
├── src/
│   ├── components/     # UI components
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Helpers (markdown, export, themes)
│   ├── App.tsx           # Main app layout
│   └── main.tsx         # Entry point
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## ✦ Usage

1. Write or paste Markdown in the **left panel**
2. Preview the rendered article in the **right panel**
3. Click **Copy HTML** to get the styled HTML
4. Or click **Export Image** to download as PNG

---

## ✦ License

Apache 2.0 — free to use, modify, and distribute.

---

<div align="center">

**Built by <a href="https://github.com/AIPMAndy">Andy | AI酋长</a>**

</div>
