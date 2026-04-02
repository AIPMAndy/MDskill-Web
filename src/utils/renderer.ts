import { marked } from 'marked'
import DOMPurify from 'dompurify'
import type { TemplateStyles } from '../templates'

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: true,
})

function execCopyCommand(): boolean {
  try {
    return document.execCommand('copy')
  } catch {
    return false
  }
}

/**
 * Parse Markdown to raw HTML
 */
export function parseMarkdown(markdown: string): string {
  const rawHtml = marked.parse(markdown) as string
  return DOMPurify.sanitize(rawHtml, {
    ADD_TAGS: ['section', 'figure', 'figcaption'],
    ADD_ATTR: ['target', 'rel'],
  })
}

/**
 * Generate scoped CSS from template styles
 */
export function generateTemplateCSS(styles: TemplateStyles): string {
  return `
    .article-preview {
      background: ${styles.backgroundColor};
      max-width: ${styles.maxWidth};
      margin: 0 auto;
      padding: ${styles.padding};
      font-family: ${styles.bodyFont};
      font-size: ${styles.bodySize};
      color: ${styles.bodyColor};
      line-height: ${styles.bodyLineHeight};
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .article-preview h1 {
      font-family: ${styles.titleFont};
      font-size: ${styles.titleSize};
      font-weight: ${styles.titleWeight};
      color: ${styles.titleColor};
      text-align: ${styles.titleAlign};
      margin-bottom: ${styles.titleMarginBottom};
      margin-top: 0;
      line-height: 1.35;
      ${styles.titleExtra || ''}
    }

    .article-preview h2 {
      font-family: ${styles.h2Font};
      font-size: ${styles.h2Size};
      font-weight: ${styles.h2Weight};
      color: ${styles.h2Color};
      margin-top: ${styles.h2MarginTop};
      margin-bottom: ${styles.h2MarginBottom};
      line-height: 1.4;
      ${styles.h2Extra || ''}
    }

    .article-preview h3 {
      font-size: ${styles.h3Size};
      font-weight: ${styles.h3Weight};
      color: ${styles.h3Color};
      margin-top: 24px;
      margin-bottom: 12px;
      line-height: 1.4;
      ${styles.h3Extra || ''}
    }

    .article-preview p {
      margin-bottom: ${styles.paragraphSpacing};
      text-align: justify;
    }

    .article-preview a {
      color: ${styles.linkColor};
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: border-color 0.2s;
    }
    .article-preview a:hover {
      border-bottom-color: ${styles.linkColor};
    }

    .article-preview strong {
      color: ${styles.strongColor};
      font-weight: 600;
    }

    .article-preview em {
      color: ${styles.emColor};
    }

    .article-preview blockquote {
      border-left: 4px solid ${styles.blockquoteBorderColor};
      background: ${styles.blockquoteBg};
      color: ${styles.blockquoteColor};
      padding: 16px 20px;
      margin: 20px 0;
      border-radius: 0 6px 6px 0;
      ${styles.blockquoteExtra || ''}
    }
    .article-preview blockquote p {
      margin-bottom: 0;
    }
    .article-preview blockquote p + p {
      margin-top: 8px;
    }

    .article-preview code {
      background: ${styles.codeBg};
      color: ${styles.codeColor};
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Fira Code', 'JetBrains Mono', monospace;
      font-size: 0.9em;
    }

    .article-preview pre {
      background: ${styles.codeBlockBg};
      color: ${styles.codeBlockColor};
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 20px 0;
      font-size: 14px;
      line-height: 1.6;
    }
    .article-preview pre code {
      background: transparent;
      color: inherit;
      padding: 0;
      border-radius: 0;
      font-size: inherit;
    }

    .article-preview img {
      max-width: 100%;
      height: auto;
      border-radius: ${styles.imageRadius};
      box-shadow: ${styles.imageShadow};
      display: block;
      margin: 20px auto;
    }

    .article-preview ul, .article-preview ol {
      padding-left: 24px;
      margin-bottom: ${styles.paragraphSpacing};
    }
    .article-preview li {
      margin-bottom: 6px;
    }
    .article-preview ul li::marker {
      color: ${styles.listMarkerColor};
    }
    .article-preview ol li::marker {
      color: ${styles.listMarkerColor};
      font-weight: 600;
    }

    .article-preview table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 14px;
    }
    .article-preview thead {
      background: ${styles.tableHeaderBg};
    }
    .article-preview th {
      color: ${styles.tableHeaderColor};
      font-weight: 600;
      text-align: left;
      padding: 10px 14px;
      border: 1px solid ${styles.tableBorderColor};
    }
    .article-preview td {
      padding: 10px 14px;
      border: 1px solid ${styles.tableBorderColor};
    }
    .article-preview tbody tr:nth-child(even) {
      background: ${styles.tableStripeBg};
    }

    .article-preview hr {
      border: none;
      border-top: 1px solid ${styles.dividerColor};
      margin: 32px 0;
    }

    /* First paragraph special treatment for magazine template */
    .article-preview.template-magazine > p:first-of-type::first-letter {
      float: left;
      font-size: 3.2em;
      font-weight: 700;
      line-height: 1;
      margin-right: 8px;
      margin-top: 4px;
      color: #dc2626;
    }
  `
}

/**
 * Generate full standalone HTML for export
 */
export function generateExportHTML(html: string, styles: TemplateStyles, title: string): string {
  const css = generateTemplateCSS(styles)

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #f5f5f5;
      display: flex;
      justify-content: center;
      padding: 20px;
    }
    ${css}
  </style>
</head>
<body>
  <div class="article-preview">
    ${html}
  </div>
</body>
</html>`
}

/**
 * Extract title from markdown
 */
export function extractTitle(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : '未命名文章'
}

/**
 * Copy rich HTML to clipboard (for pasting into WeChat editor)
 */
export async function copyRichHTML(html: string, css: string): Promise<boolean> {
  if (navigator.clipboard?.write && 'ClipboardItem' in window) {
    try {
      const plainText = new DOMParser().parseFromString(html, 'text/html').body.textContent || ''
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([plainText], { type: 'text/plain' }),
        }),
      ])
      return true
    } catch {
      // fallback below
    }
  }

  let container: HTMLDivElement | null = null
  let styleEl: HTMLStyleElement | null = null
  try {
    container = document.createElement('div')
    container.innerHTML = html
    container.setAttribute('aria-hidden', 'true')
    container.style.position = 'fixed'
    container.style.left = '-9999px'
    container.style.top = '0'

    styleEl = document.createElement('style')
    styleEl.textContent = css

    document.head.appendChild(styleEl)
    document.body.appendChild(container)

    const selection = window.getSelection()
    const previousRanges: Range[] = []
    if (selection) {
      for (let i = 0; i < selection.rangeCount; i++) {
        previousRanges.push(selection.getRangeAt(i).cloneRange())
      }
    }

    const range = document.createRange()
    range.selectNodeContents(container)
    selection?.removeAllRanges()
    selection?.addRange(range)
    const copied = execCopyCommand()

    selection?.removeAllRanges()
    previousRanges.forEach(savedRange => selection?.addRange(savedRange))
    return copied
  } catch {
    return false
  } finally {
    if (container?.parentNode) {
      container.parentNode.removeChild(container)
    }
    if (styleEl?.parentNode) {
      styleEl.parentNode.removeChild(styleEl)
    }
  }
}

/**
 * Copy plain HTML to clipboard
 */
export async function copyHTMLSource(html: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(html)
      return true
    } catch {
      // fallback below
    }
  }

  try {
    const textarea = document.createElement('textarea')
    const activeElement = document.activeElement as HTMLElement | null
    textarea.value = html
    textarea.setAttribute('readonly', 'true')
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    textarea.setSelectionRange(0, textarea.value.length)
    const copied = execCopyCommand()
    document.body.removeChild(textarea)
    activeElement?.focus?.()
    return copied
  } catch {
    return false
  }
}

/**
 * Word count for Chinese text
 */
export function countWords(text: string): number {
  // Remove markdown syntax
  const plain = text
    .replace(/#{1,6}\s/g, '')
    .replace(/[*_`~\[\]()]/g, '')
    .replace(/\n+/g, '')
    .trim()

  // Chinese characters + English words
  const chineseChars = (plain.match(/[\u4e00-\u9fff]/g) || []).length
  const englishWords = (plain.match(/[a-zA-Z]+/g) || []).length
  return chineseChars + englishWords
}

/**
 * Estimate reading time in minutes
 */
export function estimateReadingTime(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 400))
}
