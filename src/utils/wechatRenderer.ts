import { marked } from 'marked'
import DOMPurify from 'dompurify'
import type { TemplateStyles } from '../templates'

/**
 * 微信公众号专用渲染器
 * 核心原则：
 * 1. 所有样式完全内联到标签上
 * 2. 关键属性使用 !important 强制覆盖微信默认样式
 * 3. 限制 max-height 防止图片过大
 * 4. 不依赖 class，直接生成 inline style
 */

interface WechatStyleMap {
  container: string
  h1: string
  h2: string
  h3: string
  h4: string
  h5: string
  h6: string
  p: string
  strong: string
  em: string
  a: string
  ul: string
  ol: string
  li: string
  blockquote: string
  code: string
  pre: string
  hr: string
  img: string
  table: string
  thead: string
  tbody: string
  th: string
  td: string
  tr: string
}

/**
 * 移除微信不支持的 CSS 属性，并给关键属性加上 !important
 */
function sanitizeWechatCSS(css: string): string {
  return css
    // 保留 border-radius，微信编辑器支持
    .replace(/box-shadow:\s*[^;]+;?/gi, '')    // 移除 box-shadow
    .replace(/text-shadow:\s*[^;]+;?/gi, '')   // 移除 text-shadow
    .replace(/transform:\s*[^;]+;?/gi, '')     // 移除 transform
    .replace(/transition:\s*[^;]+;?/gi, '')    // 移除 transition
    .replace(/animation:\s*[^;]+;?/gi, '')     // 移除 animation
    // 给关键属性加上 !important（如果还没有），分号可选
    .replace(/background-color:\s*([^;!]+);?/gi, 'background-color: $1 !important;')
    .replace(/padding:\s*([^;!]+);?/gi, 'padding: $1 !important;')
    .replace(/border-left:\s*([^;!]+);?/gi, 'border-left: $1 !important;')
    .replace(/border-bottom:\s*([^;!]+);?/gi, 'border-bottom: $1 !important;')
    .replace(/border-radius:\s*([^;!]+);?/gi, 'border-radius: $1 !important;') // 保留并加 !important
    // 添加 position: relative（参考 huasheng_editor）
    .replace(/$/gi, ' position: relative !important;')
    .trim()
}

/**
 * 将模板样式转换为微信安全的 inline style
 */
function generateWechatStyles(styles: TemplateStyles): WechatStyleMap {
  return {
    container: `
      max-width: ${styles.maxWidth};
      margin: 0 auto !important;
      padding: ${styles.padding};
      font-family: ${styles.bodyFont};
      font-size: ${styles.bodySize};
      color: ${styles.bodyColor} !important;
      line-height: ${styles.bodyLineHeight} !important;
      background-color: ${styles.backgroundColor} !important;
      word-wrap: break-word;
      overflow-wrap: break-word;
    `.trim().replace(/\s+/g, ' '),

    h1: sanitizeWechatCSS(`
      font-family: ${styles.titleFont};
      font-size: ${styles.titleSize};
      font-weight: ${styles.titleWeight};
      color: ${styles.titleColor} !important;
      text-align: ${styles.titleAlign};
      margin: 0 0 ${styles.titleMarginBottom} 0 !important;
      line-height: 1.35 !important;
      ${styles.titleExtra || ''}
    `).trim().replace(/\s+/g, ' '),

    h2: sanitizeWechatCSS(`
      font-family: ${styles.h2Font};
      font-size: ${styles.h2Size};
      font-weight: ${styles.h2Weight};
      color: ${styles.h2Color} !important;
      margin: ${styles.h2MarginTop} 0 ${styles.h2MarginBottom} 0 !important;
      line-height: 1.4 !important;
      ${styles.h2Extra || ''}
    `).trim().replace(/\s+/g, ' '),

    h3: sanitizeWechatCSS(`
      font-size: ${styles.h3Size};
      font-weight: ${styles.h3Weight};
      color: ${styles.h3Color} !important;
      margin: 24px 0 12px 0 !important;
      line-height: 1.4 !important;
      ${styles.h3Extra || ''}
    `).trim().replace(/\s+/g, ' '),

    h4: `
      font-size: 18px;
      font-weight: 600;
      color: ${styles.h3Color} !important;
      margin: 20px 0 10px 0 !important;
      line-height: 1.45 !important;
    `.trim().replace(/\s+/g, ' '),

    h5: `
      font-size: 17px;
      font-weight: 600;
      color: ${styles.bodyColor} !important;
      margin: 18px 0 9px 0 !important;
      line-height: 1.45 !important;
    `.trim().replace(/\s+/g, ' '),

    h6: `
      font-size: 16px;
      font-weight: 600;
      color: ${styles.bodyColor} !important;
      margin: 16px 0 8px 0 !important;
      line-height: 1.45 !important;
    `.trim().replace(/\s+/g, ' '),

    p: `
      margin: ${styles.paragraphSpacing} 0 !important;
      line-height: ${styles.bodyLineHeight} !important;
      color: ${styles.bodyColor} !important;
      text-align: justify;
    `.trim().replace(/\s+/g, ' '),

    strong: `
      font-weight: 600;
      color: ${styles.strongColor} !important;
    `.trim().replace(/\s+/g, ' '),

    em: `
      font-style: italic;
      color: ${styles.emColor} !important;
    `.trim().replace(/\s+/g, ' '),

    a: `
      color: ${styles.linkColor} !important;
      text-decoration: none;
      border-bottom: 1px solid ${styles.linkColor};
    `.trim().replace(/\s+/g, ' '),

    ul: `
      margin: 16px 0 !important;
      padding-left: 24px;
    `.trim().replace(/\s+/g, ' '),

    ol: `
      margin: 16px 0 !important;
      padding-left: 24px;
    `.trim().replace(/\s+/g, ' '),

    li: `
      margin: 8px 0 !important;
      line-height: ${styles.bodyLineHeight} !important;
      color: ${styles.bodyColor} !important;
    `.trim().replace(/\s+/g, ' '),

    blockquote: `
      border-left: 4px solid ${styles.blockquoteBorderColor};
      background-color: ${styles.blockquoteBg === 'transparent' ? '#f5f5f5' : styles.blockquoteBg} !important;
      color: ${styles.blockquoteColor} !important;
      padding: 12px 18px;
      margin: 20px 0 !important;
      line-height: 1.6 !important;
      font-size: 16px;
      ${styles.blockquoteExtra || ''}
    `.trim().replace(/\s+/g, ' '),

    code: `
      font-family: 'Fira Code', 'JetBrains Mono', Consolas, Monaco, monospace;
      font-size: 14px;
      background-color: ${styles.codeBg} !important;
      color: ${styles.codeColor} !important;
      padding: 2px 6px;
      border-radius: 4px;
    `.trim().replace(/\s+/g, ' '),

    pre: `
      background-color: ${styles.codeBlockBg} !important;
      color: ${styles.codeBlockColor} !important;
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 20px 0 !important;
      line-height: 1.6 !important;
    `.trim().replace(/\s+/g, ' '),

    hr: `
      border: none;
      border-top: 1px solid ${styles.dividerColor};
      margin: 32px 0 !important;
    `.trim().replace(/\s+/g, ' '),

    img: `
      max-width: 100% !important;
      max-height: 600px !important;
      height: auto !important;
      display: block !important;
      margin: 20px auto !important;
      border-radius: ${styles.imageRadius};
      box-shadow: ${styles.imageShadow};
    `.trim().replace(/\s+/g, ' '),

    table: `
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0 !important;
      font-size: 14px;
    `.trim().replace(/\s+/g, ' '),

    thead: `
      background-color: ${styles.tableHeaderBg} !important;
    `.trim().replace(/\s+/g, ' '),

    tbody: ``,

    th: `
      color: ${styles.tableHeaderColor} !important;
      font-weight: 600;
      text-align: left;
      padding: 10px 14px;
      border: 1px solid ${styles.tableBorderColor};
      background-color: ${styles.tableHeaderBg} !important;
    `.trim().replace(/\s+/g, ' '),

    td: `
      padding: 10px 14px;
      border: 1px solid ${styles.tableBorderColor};
      color: ${styles.bodyColor} !important;
    `.trim().replace(/\s+/g, ' '),

    tr: `
      border-bottom: 1px solid ${styles.tableBorderColor};
    `.trim().replace(/\s+/g, ' '),
  }
}

/**
 * 自定义 marked renderer，直接生成带 inline style 的 HTML
 */
function createWechatRenderer(styleMap: WechatStyleMap) {
  const renderer = new marked.Renderer()

  renderer.heading = (text, level) => {
    const tag = `h${level}`
    const style = styleMap[tag as keyof WechatStyleMap] || styleMap.h3
    return `<${tag} style="${style}">${text}</${tag}>`
  }

  renderer.paragraph = (text) => {
    return `<p style="${styleMap.p}">${text}</p>`
  }

  renderer.list = (body, ordered) => {
    const tag = ordered ? 'ol' : 'ul'
    const style = styleMap[tag]
    return `<${tag} style="${style}">${body}</${tag}>`
  }

  renderer.listitem = (text) => {
    return `<li style="${styleMap.li}">${text}</li>`
  }

  renderer.strong = (text) => {
    return `<strong style="${styleMap.strong}">${text}</strong>`
  }

  renderer.em = (text) => {
    return `<em style="${styleMap.em}">${text}</em>`
  }

  renderer.blockquote = (quote) => {
    return `<blockquote style="${styleMap.blockquote}">${quote}</blockquote>`
  }

  renderer.codespan = (code) => {
    return `<code style="${styleMap.code}">${code}</code>`
  }

  renderer.code = (code) => {
    return `<pre style="${styleMap.pre}"><code>${code}</code></pre>`
  }

  renderer.hr = () => {
    return `<hr style="${styleMap.hr}">`
  }

  renderer.link = (href, title, text) => {
    const titleAttr = title ? ` title="${title}"` : ''
    return `<a href="${href}" style="${styleMap.a}"${titleAttr}>${text}</a>`
  }

  renderer.image = (href, title, text) => {
    const titleAttr = title ? ` title="${title}"` : ''
    const altAttr = text ? ` alt="${text}"` : ''
    return `<img src="${href}" style="${styleMap.img}"${altAttr}${titleAttr}>`
  }

  renderer.table = (header, body) => {
    return `<table style="${styleMap.table}">
      <thead style="${styleMap.thead}">${header}</thead>
      <tbody style="${styleMap.tbody}">${body}</tbody>
    </table>`
  }

  renderer.tablerow = (content) => {
    return `<tr style="${styleMap.tr}">${content}</tr>`
  }

  renderer.tablecell = (content, flags) => {
    const tag = flags.header ? 'th' : 'td'
    const style = flags.header ? styleMap.th : styleMap.td
    return `<${tag} style="${style}">${content}</${tag}>`
  }

  return renderer
}

/**
 * 渲染 Markdown 为微信公众号专用 HTML
 */
export function renderMarkdownForWechat(markdown: string, styles: TemplateStyles): string {
  const styleMap = generateWechatStyles(styles)
  const renderer = createWechatRenderer(styleMap)

  marked.setOptions({
    renderer,
    gfm: true,
    breaks: true,
  })

  const rawHtml = marked.parse(markdown) as string
  const cleanHtml = DOMPurify.sanitize(rawHtml, {
    ADD_TAGS: ['section'],
    ADD_ATTR: ['style'],
  })

  // 包裹在容器中
  return `<section style="${styleMap.container}">${cleanHtml}</section>`
}

/**
 * 复制微信专用 HTML 到剪贴板
 */
export async function copyWechatHTML(markdown: string, styles: TemplateStyles): Promise<boolean> {
  const html = renderMarkdownForWechat(markdown, styles)
  const plainText = markdown

  try {
    if (navigator.clipboard?.write && typeof ClipboardItem !== 'undefined') {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([plainText], { type: 'text/plain' }),
        }),
      ])
      return true
    }

    // Fallback
    let copied = false
    const handleCopy = (event: ClipboardEvent) => {
      event.preventDefault()
      event.clipboardData?.setData('text/html', html)
      event.clipboardData?.setData('text/plain', plainText)
      copied = true
    }

    document.addEventListener('copy', handleCopy)
    try {
      copied = document.execCommand('copy') || copied
      return copied
    } finally {
      document.removeEventListener('copy', handleCopy)
    }
  } catch {
    return false
  }
}
