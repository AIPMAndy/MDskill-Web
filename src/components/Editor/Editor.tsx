import React from 'react'

interface EditorProps {
  value: string
  onChange: (value: string) => void
}

export default function Editor({ value, onChange }: EditorProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab support
    if (e.key === 'Tab') {
      e.preventDefault()
      const target = e.target as HTMLTextAreaElement
      const start = target.selectionStart
      const end = target.selectionEnd
      const newValue = value.substring(0, start) + '  ' + value.substring(end)
      onChange(newValue)
      // Restore cursor
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 2
      })
    }
  }

  return (
    <div className="editor-area h-full flex flex-col bg-[var(--editor-bg)]">
      {/* Editor toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-[#313244] text-xs">
        <span className="text-[#a6adc8] font-medium">Markdown</span>
        <span className="text-[#585b70] mx-2">|</span>
        <button
          onClick={() => {
            const ta = document.querySelector('.markdown-editor') as HTMLTextAreaElement
            if (ta) {
              const start = ta.selectionStart
              const end = ta.selectionEnd
              const selected = value.substring(start, end)
              const newValue = value.substring(0, start) + `**${selected || '粗体文字'}**` + value.substring(end)
              onChange(newValue)
            }
          }}
          className="px-2 py-1 rounded text-[#cdd6f4] hover:bg-[#313244] transition-colors font-bold"
          title="粗体 (Ctrl+B)"
        >
          B
        </button>
        <button
          onClick={() => {
            const ta = document.querySelector('.markdown-editor') as HTMLTextAreaElement
            if (ta) {
              const start = ta.selectionStart
              const end = ta.selectionEnd
              const selected = value.substring(start, end)
              const newValue = value.substring(0, start) + `*${selected || '斜体文字'}*` + value.substring(end)
              onChange(newValue)
            }
          }}
          className="px-2 py-1 rounded text-[#cdd6f4] hover:bg-[#313244] transition-colors italic"
          title="斜体 (Ctrl+I)"
        >
          I
        </button>
        <button
          onClick={() => {
            const ta = document.querySelector('.markdown-editor') as HTMLTextAreaElement
            if (ta) {
              const start = ta.selectionStart
              const newValue = value.substring(0, start) + '\n> 引用文字\n' + value.substring(start)
              onChange(newValue)
            }
          }}
          className="px-2 py-1 rounded text-[#cdd6f4] hover:bg-[#313244] transition-colors"
          title="引用"
        >
          &ldquo;&rdquo;
        </button>
        <button
          onClick={() => {
            const ta = document.querySelector('.markdown-editor') as HTMLTextAreaElement
            if (ta) {
              const start = ta.selectionStart
              const newValue = value.substring(0, start) + '\n```\n代码\n```\n' + value.substring(start)
              onChange(newValue)
            }
          }}
          className="px-2 py-1 rounded text-[#cdd6f4] hover:bg-[#313244] transition-colors font-mono text-[11px]"
          title="代码块"
        >
          {'</>'}
        </button>
        <button
          onClick={() => {
            const ta = document.querySelector('.markdown-editor') as HTMLTextAreaElement
            if (ta) {
              const start = ta.selectionStart
              const newValue = value.substring(0, start) + '\n---\n' + value.substring(start)
              onChange(newValue)
            }
          }}
          className="px-2 py-1 rounded text-[#cdd6f4] hover:bg-[#313244] transition-colors"
          title="分割线"
        >
          ─
        </button>
        <button
          onClick={() => {
            const ta = document.querySelector('.markdown-editor') as HTMLTextAreaElement
            if (ta) {
              const start = ta.selectionStart
              const newValue = value.substring(0, start) + '\n| 列1 | 列2 | 列3 |\n|-----|-----|-----|\n| 内容 | 内容 | 内容 |\n' + value.substring(start)
              onChange(newValue)
            }
          }}
          className="px-2 py-1 rounded text-[#cdd6f4] hover:bg-[#313244] transition-colors text-[11px]"
          title="表格"
        >
          ⊞
        </button>
      </div>

      {/* Textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="markdown-editor flex-1 w-full p-4 overflow-y-auto"
        placeholder="在这里输入 Markdown 内容...

# 标题
## 二级标题

正文内容，支持 **粗体**、*斜体*、`行内代码`

> 引用内容

- 列表项 1
- 列表项 2

```
代码块
```"
        spellCheck={false}
      />
    </div>
  )
}
