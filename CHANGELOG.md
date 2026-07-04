# MDskill-Web 更新日志

## 版本 1.2.0 (2026-07-04)

### ✨ 重大更新：主题系统升级

**同步 MDSKILL 桌面端 v1.7.3 的最新功能**

#### 🎨 主题数量大幅增加
- **从 13 个增加到 33 个主题** - 提升 154%
- 新增 20 个高品质主题，包括备受欢迎的 Apple 风格系列

#### 🌟 新增主题列表

**创意类 (Creative) - 新增 4 个**
- 🌈 **多彩活力** (playful) - 高级多彩设计感，融合当代审美
- 🎨 **艺术创意** (artistic) - 装饰性创意元素，适合设计展示
- ✨ **公众号·优雅** (wechat-elegant) - 经典公众号风格
- ✏️ **Hische·编辑部** (hische-editorial) - 手写风格，个性十足

**技术类 (Tech) - 新增 6 个**
- 🌙 **GitHub Dark** (default) - 经典暗色主题
- ⚡ **Wired 连线** (wired) - 科技媒体风格，色彩鲜明
- 💻 **开发者** (code) - 代码风格，程序员最爱
- 🖥️ **终端控制台** (terminal) - 终端风格，极客范
- 🌃 **赛博朋克** (cyberpunk) - 未来科技感
- 🏢 **Silicon Valley** (silicon) - 硅谷创业风格

**极简类 (Minimal) - 新增 6 个**
- ☀️ **GitHub Light** (github-light) - 清爽亮色主题
- 🧘 **禅意留白** (zen) - 极致简约，留白美学 ⭐
- 🍎 **Apple Light** (apple-light) - Apple 官方亮色风格 ⭐
- 🌑 **Apple Dark** (apple-dark) - Apple 官方暗色风格 ⭐
- ⚪ **Apple Gray** (apple-gray) - Apple 中性灰色风格 ⭐
- ✨ **Minimal Pro** (minimal-pro) - 专业极简版
- 📄 **纸质纹理** (paper) - 自然纸感

**商务类 (Business) - 新增 3 个**
- 📰 **纽约时报** (nytimes) - 经典报业风格，严谨优雅
- 🗞️ **Guardian 卫报** (guardian) - 英伦新闻风格
- 📋 **焦橙文档** (warm-docs) - 温暖商务风格

**故事类 (Story) - 新增 2 个**
- 📖 **小说阅读** (novel) - 适合长篇小说
- 📔 **个人日记** (journal) - 手写日记风格

#### 📦 微信公众号专用主题 - 新增 6 个
- 📱 **公众号·纽约时报** (wechat-nyt)
- 📝 **公众号·Medium** (wechat-medium)
- 📚 **深度阅读** (wechat-deepread)
- 🤖 **Claude AI** (wechat-claude)
- 💻 **技术风格** (wechat-tech)
- 🍏 **Apple 极简** (wechat-apple)
- ✨ **优雅简约** (wechat-elegant-minimal)

#### 🔧 技术改进

**接口优化**
- ✅ 统一 TemplateStyles 接口，兼容桌面端和 Web 端
- ✅ 新增 `isPro` 字段，区分免费/专业版主题
- ✅ 新增样式字段：`linkHoverColor`, `h2BorderColor`, `codeBlockBorder`, `hrColor`
- ✅ 保留 Web 端特有字段：`titleAlign`, `imageRadius`, `imageShadow`

**代码质量**
- ✅ TypeScript 类型检查通过
- ✅ 构建优化，打包体积控制在 138KB (gzip)
- ✅ 所有主题经过测试验证

#### 📊 主题分类统计

| 分类 | 数量 | 免费主题 | Pro主题 |
|------|------|----------|---------|
| **Creative** | 7 | 1 | 6 |
| **Tech** | 9 | 1 | 8 |
| **Minimal** | 9 | 3 | 6 |
| **Business** | 6 | 1 | 5 |
| **Story** | 2 | 0 | 2 |
| **合计** | **33** | **9** | **24** |

---

## 版本 1.1.0 (2026-06-02)

### ✨ 新功能
- ✅ 添加搜索功能（SearchBar + OutlinePanel）
- ✅ 添加大纲导航
- ✅ 添加正则表达式搜索
- ✅ 添加搜索结果高亮

### 🔧 改进
- ✅ 优化编辑器工具栏
- ✅ 改进预览区样式
- ✅ 添加搜索匹配计数

---

## 版本 1.0.0 (2026-05-10)

### 🎉 首次发布

**核心功能**
- ✅ Markdown 实时编辑预览
- ✅ 13 个精美主题模板
- ✅ 微信公众号富文本复制
- ✅ HTML 导出
- ✅ 海报生成
- ✅ 响应式视图（mobile/tablet/desktop）
- ✅ 暗色模式切换
- ✅ OpenClaw 调度集成

**技术栈**
- React 18
- TypeScript 5
- Vite 5
- Tailwind CSS
- Marked (Markdown 解析)
- DOMPurify (HTML 清理)

---

## 路线图

### 版本 1.3.0（计划中）
- [ ] PDF 导出功能
- [ ] 国际化支持（中英文）
- [ ] 自定义主题编辑器
- [ ] 主题收藏功能

### 版本 2.0.0（计划中）
- [ ] 云端同步
- [ ] 协作编辑
- [ ] 插件系统
- [ ] 移动端适配

---

**开发者**: AI酋长Andy  
**GitHub**: https://github.com/AIPMAndy  
**微信**: AIPMAndy  
**许可证**: Apache-2.0
