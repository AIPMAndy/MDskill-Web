# PageSkill

一个简洁的 Markdown 实时排版工具，支持多种主题模板和一键导出。

## 📸 产品截图

<img width="1462" height="798" alt="截屏2026-04-25 08 44 00" src="https://github.com/user-attachments/assets/abd2d6b0-0964-4680-8176-f07cc005ed9e" />


## 特性

- 🎨 **13 种主题模板** - 覆盖商务、创意、技术、极简、故事 5 大场景
- 📱 **微信公众号适配** - 完全内联样式，直接复制粘贴到公众号编辑器
- 🚀 **实时预览** - 边写边看，所见即所得
- 💾 **一键导出** - 支持导出为 HTML 和 PNG 图片
- 🔧 **命令行工具** - 支持批量处理和自动化
- 🌐 **OpenClaw 调度** - 可通过 OpenClaw 直接调用

## 在线使用

直接在浏览器中打开 `index.html` 即可使用。

## 命令行使用

### 安装依赖

```bash
npm install
```

### 基本用法

```bash
node cli.js <markdown-file> [options]
```

### 选项

- `--template <name>` - 选择模板（wechat/modern/minimal/tech），默认: modern
- `--output <file>` - 输出文件路径，默认: 输出到标准输出

### 可用模板

#### 商务类（4 套）
| 模板 ID | 名称 | 描述 | 适用场景 |
|---------|------|------|----------|
| `business` | 商务风格 | 专业商务排版，适合企业内容 | 企业报告、商业计划 |
| `financial` | 金融风格 | 金融行业专业排版 | 财报分析、投资报告 |
| `magazine` | 杂志风格 | 杂志式排版，视觉冲击力强 | 品牌故事、深度报道 |
| `nyt` | 纽约时报 | 经典报刊排版 | 新闻报道、时事评论 |

#### 创意类（3 套）
| 模板 ID | 名称 | 描述 | 适用场景 |
|---------|------|------|----------|
| `literary` | 文学风格 | 优雅文学排版 | 散文、诗歌、文学评论 |
| `elegant` | 优雅风格 | 精致优雅排版 | 生活方式、艺术鉴赏 |
| `apple` | Apple 风格 | 简约现代，科技感 | 产品发布、设计分享 |

#### 技术类（2 套）
| 模板 ID | 名称 | 描述 | 适用场景 |
|---------|------|------|----------|
| `tech` | 技术风格 | 深色主题，等宽字体 | 技术文档、代码教程 |
| `anthropic` | Anthropic 风格 | AI 研究风格排版 | AI 论文、技术博客 |

#### 极简类（3 套）
| 模板 ID | 名称 | 描述 | 适用场景 |
|---------|------|------|----------|
| `minimal` | 极简风格 | 纯白背景，衬线字体 | 学术文章、正式文档 |
| `deepread` | 深度阅读 | 专注阅读体验 | 长文阅读、深度思考 |
| `wechat` | 微信公众号 | 完全内联样式，适配微信公众号 | 公众号文章 |

#### 故事类（1 套）
| 模板 ID | 名称 | 描述 | 适用场景 |
|---------|------|------|----------|
| `story` | 故事风格 | 叙事性强，沉浸式阅读 | 小说、故事、游记 |
| `latepoint` | 深夜风格 | 深夜氛围，情感共鸣 | 情感文章、夜读专栏 |

### 示例

#### 生成微信公众号格式

```bash
node cli.js article.md --template wechat --output wechat.html
```

生成的 HTML 可以直接在浏览器中打开，然后复制粘贴到微信公众号编辑器，样式完全保留。

#### 生成现代风格

```bash
node cli.js README.md --template modern --output output.html
```

#### 使用管道输出

```bash
node cli.js tech.md --template tech > result.html
```

#### 批量处理

```bash
for file in *.md; do
  node cli.js "$file" --template wechat --output "${file%.md}.html"
done
```

## 微信公众号使用指南

### 为什么需要专门的微信公众号模板？

微信公众号编辑器有严格的限制：
- ❌ 不支持外部 CSS 样式表（`<style>` 标签会被过滤）
- ❌ 不支持 class 和 id 选择器
- ✅ 只支持内联样式（`style` 属性）
- ✅ 只支持部分 CSS 属性（白名单机制）

### 使用步骤

1. **生成 HTML**
   ```bash
   node cli.js article.md --template wechat --output wechat.html
   ```

2. **在浏览器中打开**
   ```bash
   open wechat.html  # macOS
   # 或直接双击 wechat.html
   ```

3. **全选复制**
   - 按 `Cmd+A`（macOS）或 `Ctrl+A`（Windows）全选
   - 按 `Cmd+C`（macOS）或 `Ctrl+C`（Windows）复制

4. **粘贴到公众号**
   - 打开微信公众号后台
   - 新建图文消息
   - 直接粘贴（`Cmd+V` 或 `Ctrl+V`）
   - ✅ 样式完全保留！

### 支持的样式

微信公众号模板使用的所有 CSS 属性都在白名单内：
- ✅ 字体：`font-family`, `font-size`, `font-weight`, `font-style`
- ✅ 颜色：`color`, `background-color`
- ✅ 间距：`margin`, `padding`, `line-height`
- ✅ 边框：`border`, `border-left`, `border-bottom`
- ✅ 布局：`text-align`, `display`
- ✅ 其他：`border-radius`（部分支持）

### 不支持的样式

以下样式在微信公众号中会被过滤：
- ❌ `box-shadow`（阴影）
- ❌ `gradient`（渐变）
- ❌ `transform`（变换）
- ❌ `animation`（动画）
- ❌ `position: fixed/absolute`（定位）

## OpenClaw 调度

可以通过 OpenClaw 直接调用 PageSkill：

```javascript
// 在 OpenClaw 中调用
window.open('file:///path/to/PageSkill/index.html?markdown=' + encodeURIComponent(markdownText));
```

或使用 postMessage：

```javascript
const iframe = document.querySelector('iframe');
iframe.contentWindow.postMessage({
  type: 'loadMarkdown',
  markdown: markdownText
}, '*');
```

## 技术栈

- **Markdown 解析**: [marked](https://github.com/markedjs/marked)
- **代码高亮**: [highlight.js](https://highlightjs.org/)
- **纯前端**: 无需服务器，直接在浏览器中运行

## 开发

### 项目结构

```
PageSkill/
├── index.html          # 主页面（在线编辑器）
├── cli.js              # 命令行工具
├── package.json        # 依赖配置
├── README.md           # 说明文档
└── CLI.md              # CLI 详细文档
```

### 添加新模板

在 `cli.js` 中的 `templates` 对象添加新模板：

```javascript
const templates = {
  mytemplate: {
    id: 'mytemplate',
    name: '我的模板',
    description: '模板描述',
    css: `
      /* 你的 CSS 样式 */
    `
  }
};
```

对于需要内联样式的模板（如微信公众号），设置 `inline: true` 并实现自定义渲染器。

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

### v1.1.0 (2026-04-21)

**🎯 核心更新：微信公众号完美适配**

#### 新增功能
- ✨ **微信公众号专用模板** - 完全内联样式，解决公众号编辑器样式丢失问题
- ✨ **智能样式转换** - 自动将 CSS 转换为微信白名单内的内联样式
- 🎨 **4 种预设模板** - wechat / modern / minimal / tech
- 📝 **完整使用指南** - 从生成到发布的完整流程说明

#### 技术改进
- 🔧 **自定义渲染器** - 基于 marked.js 的完全可控渲染
- 🎯 **零依赖输出** - 生成的 HTML 完全独立，无外部依赖
- 📦 **批量处理支持** - 支持命令行批量转换
- 🚀 **OpenClaw 集成** - 可通过 OpenClaw 工作流直接调用

#### 问题修复
- 🐛 修复样式复制到公众号后丢失的问题
- 🐛 修复 class/id 选择器在公众号中不生效的问题
- 🐛 修复部分 CSS 属性被过滤的问题

#### 文档更新
- 📝 新增微信公众号使用指南
- 📝 新增 CLI 详细文档
- 📝 新增模板对比表格
- 📝 新增常见问题解答

**使用示例：**
```bash
# 生成微信公众号格式
node cli.js article.md --template wechat --output wechat.html

# 在浏览器打开，全选复制，粘贴到公众号编辑器
# ✅ 样式完全保留！
```

---

### v1.0.0 (2026-04-20)
- 🎉 首次发布
- ✨ 支持 3 种主题模板（modern / minimal / tech）
- ✨ 实时预览功能
- ✨ 命令行工具
- ✨ OpenClaw 调度支持
