import React, { useState, useRef, useCallback } from 'react'
import html2canvas from 'html2canvas'
import type { Template } from '../../templates'
import { extractTitle } from '../../utils/renderer'
import { X, Download, Loader2, RefreshCw } from 'lucide-react'

interface PosterModalProps {
  isOpen: boolean
  onClose: () => void
  markdown: string
  template: Template
}

interface PosterStyle {
  id: string
  name: string
  bgFrom: string
  bgTo: string
  textColor: string
  accentColor: string
}

const posterStyles: PosterStyle[] = [
  { id: 'ocean', name: '深海蓝', bgFrom: '#0f172a', bgTo: '#1e3a8a', textColor: '#ffffff', accentColor: '#60a5fa' },
  { id: 'sunset', name: '日落橘', bgFrom: '#7c2d12', bgTo: '#ea580c', textColor: '#ffffff', accentColor: '#fed7aa' },
  { id: 'forest', name: '森林绿', bgFrom: '#052e16', bgTo: '#15803d', textColor: '#ffffff', accentColor: '#86efac' },
  { id: 'rose', name: '玫瑰红', bgFrom: '#4c0519', bgTo: '#e11d48', textColor: '#ffffff', accentColor: '#fda4af' },
  { id: 'purple', name: '星空紫', bgFrom: '#2e1065', bgTo: '#7c3aed', textColor: '#ffffff', accentColor: '#c4b5fd' },
  { id: 'dark', name: '极致黑', bgFrom: '#09090b', bgTo: '#27272a', textColor: '#ffffff', accentColor: '#a1a1aa' },
  { id: 'cream', name: '奶油白', bgFrom: '#fefce8', bgTo: '#fef3c7', textColor: '#1c1917', accentColor: '#92400e' },
  { id: 'sky', name: '天空蓝', bgFrom: '#e0f2fe', bgTo: '#7dd3fc', textColor: '#0c4a6e', accentColor: '#0284c7' },
]

export default function PosterModal({ isOpen, onClose, markdown, template }: PosterModalProps) {
  const [selectedStyle, setSelectedStyle] = useState(posterStyles[0])
  const [generating, setGenerating] = useState(false)
  const posterRef = useRef<HTMLDivElement>(null)

  const title = extractTitle(markdown)

  // Extract first blockquote as subtitle
  const quoteMatch = markdown.match(/>\s*(.+)/)
  const subtitle = quoteMatch ? quoteMatch[1].trim() : ''

  // Extract key points (h2 headings)
  const headings = [...markdown.matchAll(/^##\s+(.+)$/gm)].map(m => m[1].trim()).slice(0, 4)

  const handleDownload = useCallback(async () => {
    if (!posterRef.current) return
    setGenerating(true)
    try {
      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      })
      const link = document.createElement('a')
      link.download = `${title}-海报.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Poster generation failed:', err)
    } finally {
      setGenerating(false)
    }
  }, [title])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">🎨 生成封面海报</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Poster preview */}
            <div className="flex justify-center">
              <div
                ref={posterRef}
                className="w-[360px] h-[480px] rounded-2xl overflow-hidden relative flex flex-col justify-between p-8"
                style={{
                  background: `linear-gradient(135deg, ${selectedStyle.bgFrom}, ${selectedStyle.bgTo})`,
                }}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
                  style={{ background: selectedStyle.accentColor, filter: 'blur(40px)', transform: 'translate(20%, -20%)' }}
                />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-10"
                  style={{ background: selectedStyle.accentColor, filter: 'blur(30px)', transform: 'translate(-20%, 20%)' }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className="text-sm font-medium mb-4 opacity-80"
                    style={{ color: selectedStyle.accentColor }}
                  >
                    {template.icon} {template.name}
                  </div>
                  <h1
                    className="text-2xl font-bold leading-tight mb-4"
                    style={{ color: selectedStyle.textColor }}
                  >
                    {title}
                  </h1>
                  {subtitle && (
                    <p
                      className="text-sm leading-relaxed opacity-70"
                      style={{ color: selectedStyle.textColor }}
                    >
                      {subtitle}
                    </p>
                  )}
                </div>

                {/* Key points */}
                {headings.length > 0 && (
                  <div className="relative z-10 space-y-2">
                    {headings.map((heading, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: selectedStyle.textColor, opacity: 0.85 }}
                      >
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{ backgroundColor: selectedStyle.accentColor, color: selectedStyle.bgFrom }}
                        >
                          {i + 1}
                        </span>
                        {heading}
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="relative z-10 flex items-center justify-between pt-4 border-t" style={{ borderColor: `${selectedStyle.textColor}20` }}>
                  <span className="text-xs opacity-50" style={{ color: selectedStyle.textColor }}>
                    ArticleLayout
                  </span>
                  <span className="text-xs opacity-50" style={{ color: selectedStyle.textColor }}>
                    by Andy
                  </span>
                </div>
              </div>
            </div>

            {/* Style selector */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700">选择风格</h3>
              <div className="grid grid-cols-4 gap-2">
                {posterStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style)}
                    className={`
                      aspect-square rounded-xl relative overflow-hidden border-2 transition-all
                      ${selectedStyle.id === style.id ? 'border-blue-500 scale-105 shadow-lg' : 'border-transparent hover:border-gray-300'}
                    `}
                    style={{
                      background: `linear-gradient(135deg, ${style.bgFrom}, ${style.bgTo})`,
                    }}
                  >
                    <span className="absolute bottom-1 left-0 right-0 text-center text-[10px] font-medium" style={{ color: style.textColor }}>
                      {style.name}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">海报信息</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 w-12 flex-shrink-0">标题</span>
                    <span className="font-medium text-gray-800">{title}</span>
                  </div>
                  {subtitle && (
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400 w-12 flex-shrink-0">副标题</span>
                      <span>{subtitle}</span>
                    </div>
                  )}
                  {headings.length > 0 && (
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400 w-12 flex-shrink-0">要点</span>
                      <span>{headings.join('、')}</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xs text-gray-400">
                海报自动从文章中提取标题、引言和章节要点。修改文章内容后重新打开即可更新。
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleDownload}
            disabled={generating}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {generating ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Download size={14} />
                下载海报
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
