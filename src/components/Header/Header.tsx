import React, { useEffect, useRef, useState } from 'react'
import type { Template } from '../../templates'
import { extractTitle } from '../../utils/renderer'
import { Check, Code2, Copy, Download, Image, Loader2, Moon, MoreHorizontal, PanelLeft, PenLine, Sun } from 'lucide-react'

type ActionHandler = () => void | Promise<void>
type CopyHandler = () => boolean | Promise<boolean>

interface HeaderProps {
  template: Template
  markdown: string
  onToggleSidebar: () => void
  onCopyRich: CopyHandler
  onCopyHTML: CopyHandler
  onExportHTML: ActionHandler
  onGeneratePoster: ActionHandler
  darkMode: boolean
  onToggleDark: ActionHandler
}

export default function Header({ template, markdown, onToggleSidebar, onCopyRich, onCopyHTML, onExportHTML, onGeneratePoster, darkMode, onToggleDark }: HeaderProps) {
  const [copiedType, setCopiedType] = useState<string | null>(null)
  const [copyingType, setCopyingType] = useState<string | null>(null)
  const copyTimer = useRef<ReturnType<typeof setTimeout>>()
  const mobileMenu = useRef<HTMLDetailsElement>(null)

  useEffect(() => () => clearTimeout(copyTimer.current), [])

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (mobileMenu.current && !mobileMenu.current.contains(event.target as Node)) mobileMenu.current.open = false
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenu.current) mobileMenu.current.open = false
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  const closeMobileMenu = () => { if (mobileMenu.current) mobileMenu.current.open = false }

  const handleCopy = async (type: string, fn: CopyHandler) => {
    setCopyingType(type)
    try {
      if (await fn()) {
        clearTimeout(copyTimer.current)
        setCopiedType(type)
        copyTimer.current = setTimeout(() => setCopiedType(null), 2200)
      } else {
        setCopiedType(null)
      }
    } finally {
      setCopyingType(null)
    }
  }

  return (
    <header className="workspace-header">
      <div className="brand-group">
        <button className="icon-button templates-toggle" onClick={onToggleSidebar} aria-label="打开模板库" title="模板库">
          <PanelLeft size={18} />
        </button>
        <div className="brand-mark" aria-hidden="true"><PenLine size={20} strokeWidth={1.8} /></div>
        <div className="brand-name">MDskill<span>让文字，好看一点。</span></div>
      </div>

      <div className="document-context">
        <span>我的草稿</span><span className="context-slash">/</span>
        <span className="document-name" title={extractTitle(markdown)}>{extractTitle(markdown)}</span>
      </div>

      <nav className="header-actions" aria-label="文章操作">
        <div className="header-secondary-actions">
        <button className="icon-button appearance-button" onClick={() => void onToggleDark()} aria-label={darkMode ? '浅色模式' : '深色模式'} title={darkMode ? '浅色模式' : '深色模式'}>
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <span className="action-divider" />
        <button className="icon-button code-copy-button" onClick={() => void handleCopy('html', onCopyHTML)} disabled={copyingType !== null} aria-label="复制HTML源码" title="复制HTML源码">
          {copyingType === 'html' ? <Loader2 size={17} className="animate-spin" /> : copiedType === 'html' ? <Check size={17} /> : <Code2 size={17} />}
        </button>
        <button className="tool-button" onClick={() => void onExportHTML()} title="导出HTML文件" aria-label="导出HTML文件">
          <Download size={16} /><span>导出</span>
        </button>
        <button className="tool-button poster-button" onClick={() => void onGeneratePoster()} title="生成海报" aria-label="生成海报">
          <Image size={16} /><span>海报</span>
        </button>
        </div>
        <details className="mobile-actions-menu" ref={mobileMenu}>
          <summary aria-label="更多文章操作" title="更多操作"><MoreHorizontal size={20} /></summary>
          <div className="mobile-menu-content">
            <button onClick={() => { closeMobileMenu(); void handleCopy('html', onCopyHTML) }} disabled={copyingType !== null}><Code2 size={16} />复制 HTML 源码</button>
            <button onClick={() => { closeMobileMenu(); void onExportHTML() }}><Download size={16} />导出 HTML 文件</button>
            <button onClick={() => { closeMobileMenu(); void onGeneratePoster() }}><Image size={16} />生成海报</button>
            <button onClick={() => { closeMobileMenu(); void onToggleDark() }}>{darkMode ? <Sun size={16} /> : <Moon size={16} />}{darkMode ? '浅色模式' : '深色模式'}</button>
          </div>
        </details>
        <button className="primary-button copy-button" onClick={() => void handleCopy('rich', onCopyRich)} disabled={copyingType !== null} title={`复制「${template.name}」排版，可粘贴到公众号编辑器`}>
          {copyingType === 'rich' ? <Loader2 size={16} className="animate-spin" /> : copiedType === 'rich' ? <Check size={16} /> : <Copy size={16} />}
          <span>{copiedType === 'rich' ? '已复制' : '复制排版'}</span>
        </button>
      </nav>
    </header>
  )
}
