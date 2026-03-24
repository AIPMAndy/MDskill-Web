import React, { useState } from 'react'
import type { Template } from '../../templates'
import { countWords, estimateReadingTime } from '../../utils/renderer'
import {
  Menu,
  Smartphone,
  Tablet,
  Monitor,
  Copy,
  Code,
  Download,
  Check,
  Image,
  Sun,
  Moon,
  FileText,
  Clock,
  Type,
} from 'lucide-react'

type ViewMode = 'mobile' | 'tablet' | 'desktop'

interface HeaderProps {
  template: Template
  markdown: string
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  onToggleSidebar: () => void
  onCopyRich: () => void
  onCopyHTML: () => void
  onExportHTML: () => void
  onGeneratePoster: () => void
  darkMode: boolean
  onToggleDark: () => void
}

export default function Header({
  template,
  markdown,
  viewMode,
  onViewModeChange,
  onToggleSidebar,
  onCopyRich,
  onCopyHTML,
  onExportHTML,
  onGeneratePoster,
  darkMode,
  onToggleDark,
}: HeaderProps) {
  const [copiedType, setCopiedType] = useState<string | null>(null)
  const wordCount = countWords(markdown)
  const readTime = estimateReadingTime(wordCount)

  const handleCopy = (type: string, fn: () => void) => {
    fn()
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 2000)
  }

  return (
    <header
      className="h-[var(--header-height)] bg-white border-b border-gray-200 flex items-center justify-between px-4 flex-shrink-0"
      style={{ zIndex: 100 }}
    >
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={18} />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <FileText size={14} className="text-white" />
          </div>
          <span className="font-semibold text-gray-800 text-sm hidden sm:inline">ArticleLayout</span>
        </div>

        <div className="hidden md:flex items-center gap-1 ml-3 px-2 py-1 bg-gray-50 rounded-md">
          <span className="text-xl">{template.icon}</span>
          <span className="text-xs text-gray-600 font-medium">{template.name}</span>
        </div>

        {/* Stats */}
        <div className="hidden lg:flex items-center gap-3 ml-2 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Type size={12} />
            {wordCount.toLocaleString()} 字
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            约 {readTime} 分钟
          </span>
        </div>
      </div>

      {/* Center - View mode toggle */}
      <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
        {([
          { mode: 'mobile' as ViewMode, icon: Smartphone, label: '手机' },
          { mode: 'tablet' as ViewMode, icon: Tablet, label: '平板' },
          { mode: 'desktop' as ViewMode, icon: Monitor, label: '桌面' },
        ]).map(({ mode, icon: Icon, label }) => (
          <button
            key={mode}
            onClick={() => onViewModeChange(mode)}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === mode
                ? 'bg-white shadow-sm text-blue-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
            title={label}
          >
            <Icon size={15} />
          </button>
        ))}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-1">
        {/* Copy rich text */}
        <button
          onClick={() => handleCopy('rich', onCopyRich)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            copiedType === 'rich'
              ? 'bg-green-50 text-green-600'
              : 'hover:bg-gray-100 text-gray-600'
          }`}
          title="复制富文本（可直接粘贴到公众号编辑器）"
        >
          {copiedType === 'rich' ? <Check size={14} /> : <Copy size={14} />}
          <span className="hidden sm:inline">{copiedType === 'rich' ? '已复制' : '复制排版'}</span>
        </button>

        {/* Copy HTML source */}
        <button
          onClick={() => handleCopy('html', onCopyHTML)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            copiedType === 'html'
              ? 'bg-green-50 text-green-600'
              : 'hover:bg-gray-100 text-gray-600'
          }`}
          title="复制HTML源码"
        >
          {copiedType === 'html' ? <Check size={14} /> : <Code size={14} />}
          <span className="hidden md:inline">{copiedType === 'html' ? '已复制' : 'HTML'}</span>
        </button>

        {/* Export HTML file */}
        <button
          onClick={onExportHTML}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-100 text-gray-600 transition-all"
          title="导出HTML文件"
        >
          <Download size={14} />
          <span className="hidden md:inline">导出</span>
        </button>

        {/* Generate poster */}
        <button
          onClick={onGeneratePoster}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
          title="生成海报"
        >
          <Image size={14} />
          <span className="hidden sm:inline">海报</span>
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-200 mx-1" />

        {/* Dark mode toggle */}
        <button
          onClick={onToggleDark}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
          title={darkMode ? '浅色模式' : '深色模式'}
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  )
}
