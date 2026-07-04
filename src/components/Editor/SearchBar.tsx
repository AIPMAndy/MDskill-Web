import React, { useState, useEffect } from 'react'
import { Search, X, ChevronUp, ChevronDown, Menu } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  currentIndex: number
  totalMatches: number
  onNext: () => void
  onPrev: () => void
  onClose: () => void
  useRegex: boolean
  onToggleRegex: () => void
  caseSensitive: boolean
  onToggleCaseSensitive: () => void
  onToggleOutline: () => void
  outlineOpen: boolean
}

export default function SearchBar({
  value,
  onChange,
  currentIndex,
  totalMatches,
  onNext,
  onPrev,
  onClose,
  useRegex,
  onToggleRegex,
  caseSensitive,
  onToggleCaseSensitive,
  onToggleOutline,
  outlineOpen,
}: SearchBarProps) {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (useRegex && value) {
      try {
        new RegExp(value, caseSensitive ? '' : 'i')
        setError(null)
      } catch (e) {
        setError('无效的正则表达式')
      }
    } else {
      setError(null)
    }
  }, [value, useRegex, caseSensitive])

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[#181825] border-b border-[#313244]">
      <button
        onClick={onToggleOutline}
        className={[
          'p-1.5 rounded transition-colors',
          outlineOpen
            ? 'bg-[#313244] text-[#cdd6f4]'
            : 'text-[#585b70] hover:text-[#cdd6f4] hover:bg-[#313244]',
        ].join(' ')}
        title="切换大纲"
      >
        <Menu size={16} />
      </button>

      <div className="relative flex-1">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#585b70]" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="搜索内容..."
            className={[
              'w-full pl-8 pr-3 py-1.5 text-sm bg-[#11111b] border rounded',
              error ? 'border-red-500' : 'border-[#313244]',
              'text-[#cdd6f4] placeholder-[#585b70]',
              'focus:outline-none focus:border-[#89b4fa]',
            ].join(' ')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.shiftKey ? onPrev() : onNext()
              } else if (e.key === 'Escape') {
                onClose()
              }
            }}
          />
        </div>
        {error && <div className="absolute left-0 top-full mt-1 text-xs text-red-400">{error}</div>}
      </div>

      <div className="flex items-center gap-1 text-xs text-[#a6adc8]">
        {totalMatches > 0 ? `${currentIndex + 1}/${totalMatches}` : '0/0'}
      </div>

      <button
        onClick={onPrev}
        disabled={totalMatches === 0}
        className="p-1.5 rounded text-[#cdd6f4] hover:bg-[#313244] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        title="上一个 (Shift+Enter)"
      >
        <ChevronUp size={16} />
      </button>

      <button
        onClick={onNext}
        disabled={totalMatches === 0}
        className="p-1.5 rounded text-[#cdd6f4] hover:bg-[#313244] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        title="下一个 (Enter)"
      >
        <ChevronDown size={16} />
      </button>

      <button
        onClick={onToggleCaseSensitive}
        className={[
          'px-2 py-1 rounded text-xs font-mono transition-colors',
          caseSensitive
            ? 'bg-[#89b4fa] text-[#11111b] font-bold'
            : 'text-[#a6adc8] hover:bg-[#313244]',
        ].join(' ')}
        title="区分大小写"
      >
        Aa
      </button>

      <button
        onClick={onToggleRegex}
        className={[
          'px-2 py-1 rounded text-xs font-mono transition-colors',
          useRegex
            ? 'bg-[#89b4fa] text-[#11111b] font-bold'
            : 'text-[#a6adc8] hover:bg-[#313244]',
        ].join(' ')}
        title="正则表达式"
      >
        .*
      </button>

      <button
        onClick={onClose}
        className="p-1.5 rounded text-[#585b70] hover:text-[#cdd6f4] hover:bg-[#313244] transition-colors"
        title="关闭 (ESC)"
      >
        <X size={16} />
      </button>
    </div>
  )
}
