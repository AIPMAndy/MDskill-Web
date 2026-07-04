import React from 'react'
import { Hash } from 'lucide-react'

export interface HeadingItem {
  level: number
  text: string
  line: number
  index: number
  matches?: number
}

interface OutlinePanelProps {
  headings: HeadingItem[]
  onSelectHeading: (line: number) => void
  searchQuery: string
  currentLine: number
}

export default function OutlinePanel({
  headings,
  onSelectHeading,
  searchQuery,
  currentLine,
}: OutlinePanelProps) {
  if (headings.length === 0) {
    return (
      <div className="p-4 text-center text-[#585b70] text-sm">
        <Hash size={20} className="mx-auto mb-2 opacity-50" />
        <p>文档中没有标题</p>
      </div>
    )
  }

  return (
    <div className="overflow-y-auto h-full">
      <div className="p-2 space-y-0.5">
        {headings.map((heading, idx) => {
          const isActive = heading.line === currentLine
          const paddingLeft = `${(heading.level - 1) * 12 + 8}px`

          return (
            <button
              key={idx}
              onClick={() => onSelectHeading(heading.line)}
              className={[
                'w-full text-left px-2 py-1.5 rounded text-sm transition-colors group',
                isActive
                  ? 'bg-[#89b4fa] text-[#11111b]'
                  : 'text-[#cdd6f4] hover:bg-[#313244]',
              ].join(' ')}
              style={{ paddingLeft }}
            >
              <div className="flex items-center gap-2">
                <span
                  className={[
                    'text-xs font-mono flex-shrink-0',
                    isActive ? 'text-[#11111b] opacity-70' : 'text-[#585b70]',
                  ].join(' ')}
                >
                  {'#'.repeat(heading.level)}
                </span>
                <span className="flex-1 truncate">{heading.text}</span>
                {searchQuery && heading.matches && heading.matches > 0 && (
                  <span
                    className={[
                      'text-xs px-1.5 py-0.5 rounded font-mono',
                      isActive
                        ? 'bg-[#11111b] text-[#89b4fa]'
                        : 'bg-[#313244] text-[#a6adc8]',
                    ].join(' ')}
                  >
                    {heading.matches}
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
