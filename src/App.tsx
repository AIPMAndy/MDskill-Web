import React, { useState, useCallback, useEffect } from 'react'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Editor from './components/Editor/Editor'
import Preview from './components/Preview/Preview'
import PosterModal from './components/Poster/PosterModal'
import { allTemplates, type Template } from './templates'
import { defaultMarkdown } from './utils/defaultContent'
import {
  parseMarkdown,
  generateTemplateCSS,
  generateExportHTML,
  extractTitle,
  copyRichHTML,
  copyHTMLSource,
} from './utils/renderer'

type ViewMode = 'mobile' | 'tablet' | 'desktop'

// Toast notification
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-20 right-4 z-[300] toast-enter">
      <div className="bg-gray-800 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm flex items-center gap-2">
        <span className="text-green-400">✓</span>
        {message}
      </div>
    </div>
  )
}

export default function App() {
  // State
  const [markdown, setMarkdown] = useState(() => {
    const saved = localStorage.getItem('articlelayout_content')
    return saved || defaultMarkdown
  })
  const [template, setTemplate] = useState<Template>(() => {
    const savedId = localStorage.getItem('articlelayout_template')
    return allTemplates.find(t => t.id === savedId) || allTemplates[0]
  })
  const [viewMode, setViewMode] = useState<ViewMode>('desktop')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [posterOpen, setPosterOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('articlelayout_content', markdown)
    }, 500)
    return () => clearTimeout(timer)
  }, [markdown])

  useEffect(() => {
    localStorage.setItem('articlelayout_template', template.id)
  }, [template])

  // Dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const showToast = useCallback((msg: string) => {
    setToast(msg)
  }, [])

  // Copy rich text (for WeChat)
  const handleCopyRich = useCallback(() => {
    const html = parseMarkdown(markdown)
    const css = generateTemplateCSS(template.styles)
    copyRichHTML(
      `<div class="article-preview template-${template.id}">${html}</div>`,
      css
    )
    showToast('排版已复制，可直接粘贴到公众号编辑器')
  }, [markdown, template, showToast])

  // Copy HTML source
  const handleCopyHTML = useCallback(() => {
    const html = parseMarkdown(markdown)
    const fullHTML = generateExportHTML(html, template.styles, extractTitle(markdown))
    copyHTMLSource(fullHTML)
    showToast('HTML 源码已复制到剪贴板')
  }, [markdown, template, showToast])

  // Export HTML file
  const handleExportHTML = useCallback(() => {
    const html = parseMarkdown(markdown)
    const fullHTML = generateExportHTML(html, template.styles, extractTitle(markdown))
    const blob = new Blob([fullHTML], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${extractTitle(markdown)}.html`
    a.click()
    URL.revokeObjectURL(url)
    showToast('HTML 文件已下载')
  }, [markdown, template, showToast])

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <Header
        template={template}
        markdown={markdown}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onCopyRich={handleCopyRich}
        onCopyHTML={handleCopyHTML}
        onExportHTML={handleExportHTML}
        onGeneratePoster={() => setPosterOpen(true)}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(!darkMode)}
      />

      {/* Main layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          currentTemplate={template}
          onSelectTemplate={setTemplate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Editor + Preview split */}
        <div className="flex-1 flex overflow-hidden">
          {/* Editor pane */}
          <div className="w-1/2 min-w-0 border-r border-gray-200">
            <Editor value={markdown} onChange={setMarkdown} />
          </div>

          {/* Preview pane */}
          <div className="w-1/2 min-w-0">
            <Preview
              markdown={markdown}
              template={template}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>

      {/* Poster modal */}
      <PosterModal
        isOpen={posterOpen}
        onClose={() => setPosterOpen(false)}
        markdown={markdown}
        template={template}
      />

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
