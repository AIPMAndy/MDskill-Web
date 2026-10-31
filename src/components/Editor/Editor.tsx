import React, { useRef } from 'react'
import { Bold, Code2, Italic, List, Minus, Quote, Table2, FileText, ShieldCheck } from 'lucide-react'
import { countWords, estimateReadingTime } from '../../utils/renderer'

interface EditorProps {
  value: string
  onChange: (value: string) => void
}

export default function Editor({ value, onChange }: EditorProps) {
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const words = countWords(value)

  const insert = (before: string, after = '', placeholder = '') => {
    const editor = editorRef.current
    if (!editor) return
    const start = editor.selectionStart
    const end = editor.selectionEnd
    const selected = value.slice(start, end) || placeholder
    onChange(value.slice(0, start) + before + selected + after + value.slice(end))
    requestAnimationFrame(() => {
      editor.focus()
      editor.setSelectionRange(start + before.length, start + before.length + selected.length)
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      insert('  ')
    }
    if ((event.metaKey || event.ctrlKey) && ['b', 'i'].includes(event.key.toLowerCase())) {
      event.preventDefault()
      const marker = event.key.toLowerCase() === 'b' ? '**' : '*'
      insert(marker, marker, event.key.toLowerCase() === 'b' ? '粗体文字' : '斜体文字')
    }
  }

  const tools = [
    { label: '粗体', icon: Bold, action: () => insert('**', '**', '粗体文字') },
    { label: '斜体', icon: Italic, action: () => insert('*', '*', '斜体文字') },
    { label: '引用', icon: Quote, action: () => insert('\n> ', '\n', '引用文字') },
    { label: '列表', icon: List, action: () => insert('\n- ', '\n', '列表内容') },
    { label: '代码块', icon: Code2, action: () => insert('\n```\n', '\n```\n', '代码') },
    { label: '分割线', icon: Minus, action: () => insert('\n---\n') },
    { label: '表格', icon: Table2, action: () => insert('\n| 列1 | 列2 | 列3 |\n|-----|-----|-----|\n| 内容 | 内容 | 内容 |\n') },
  ]

  return (
    <section className="editor-area" aria-label="Markdown 编辑器">
      <div className="panel-heading"><div><FileText size={15} /><h2>内容编辑</h2></div><span className="format-label">Markdown</span></div>
      <div className="format-toolbar" role="toolbar" aria-label="文本格式">
        {tools.map(({ label, icon: Icon, action }) => <button key={label} className="format-button" onClick={action} aria-label={label} title={label}><Icon size={16} strokeWidth={1.7} /></button>)}
        <span className="toolbar-hint">写下你的想法</span>
      </div>
      <textarea ref={editorRef} value={value} onChange={e => onChange(e.target.value)} onKeyDown={handleKeyDown} className="markdown-editor" aria-label="Markdown 内容" placeholder={'从一个标题开始。\n\n# 我的新文章\n\n在这里写下你的想法，右侧会实时呈现排版效果。'} spellCheck={false} />
      <footer className="editor-status"><span>{words.toLocaleString()} 字<span className="status-separator">·</span>约 {estimateReadingTime(words)} 分钟阅读</span><span className="save-status"><ShieldCheck size={12} />本地草稿</span></footer>
    </section>
  )
}
