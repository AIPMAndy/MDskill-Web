import React, { useState, useCallback, useEffect, useMemo } from 'react'
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
  copyHTMLSource,
} from './utils/renderer'
import { copyWechatHTML } from './utils/wechatRenderer'
import {
  parseOpenClawURLParams,
  resolveTemplateById,
  isOpenClawMessage,
  postOpenClawAck,
  type OpenClawCommand,
  type ViewMode,
} from './utils/openclaw'

type ToastType = 'success' | 'error'

declare global {
  interface Window {
    PageSkillOpenClaw?: {
      dispatch: (command: OpenClawCommand) => Promise<boolean>
      getState: () => {
        markdown: string
        templateId: string
        viewMode: ViewMode
        darkMode: boolean
      }
    }
  }
}

function Toast({
  message,
  type,
  onClose,
}: {
  message: string
  type: ToastType
  onClose: () => void
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-20 right-4 z-[300] toast-enter">
      <div className="bg-gray-800 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm flex items-center gap-2">
        <span className={type === 'success' ? 'text-green-400' : 'text-red-400'}>
          {type === 'success' ? '✓' : '✕'}
        </span>
        {message}
      </div>
    </div>
  )
}

export default function App() {
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
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)

  const previewHTML = useMemo(() => parseMarkdown(markdown), [markdown])
  const previewCSS = useMemo(() => generateTemplateCSS(template.styles), [template.styles])

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('articlelayout_content', markdown)
    }, 500)
    return () => clearTimeout(timer)
  }, [markdown])

  useEffect(() => {
    localStorage.setItem('articlelayout_template', template.id)
  }, [template])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    setToast({ message, type })
  }, [])

  const handleCopyRich = useCallback(async () => {
    const copied = await copyWechatHTML(markdown, template.styles)

    if (copied) {
      showToast('排版已复制，可直接粘贴到公众号编辑器', 'success')
      return true
    }

    showToast('复制失败，请检查浏览器剪贴板权限后重试', 'error')
    return false
  }, [markdown, template.styles, showToast])

  const handleCopyHTML = useCallback(async () => {
    const fullHTML = generateExportHTML(previewHTML, template.styles, extractTitle(markdown))
    const copied = await copyHTMLSource(fullHTML)

    if (copied) {
      showToast('HTML 源码已复制到剪贴板', 'success')
      return true
    }

    showToast('HTML 复制失败，请检查浏览器剪贴板权限后重试', 'error')
    return false
  }, [markdown, previewHTML, template.styles, showToast])

  const handleExportHTML = useCallback(() => {
    const fullHTML = generateExportHTML(previewHTML, template.styles, extractTitle(markdown))
    const blob = new Blob([fullHTML], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${extractTitle(markdown)}.html`
    a.click()
    URL.revokeObjectURL(url)
    showToast('HTML 文件已下载', 'success')
  }, [markdown, previewHTML, template.styles, showToast])

  const dispatchOpenClawCommand = useCallback(async (command: OpenClawCommand): Promise<boolean> => {
    switch (command.action) {
      case 'setMarkdown':
        if (typeof command.markdown === 'string') {
          setMarkdown(command.markdown)
          showToast('已接收 OpenClaw 内容调度', 'success')
          return true
        }
        return false
      case 'setTemplate': {
        const resolved = resolveTemplateById(allTemplates, command.templateId)
        if (resolved) {
          setTemplate(resolved)
          return true
        }
        return false
      }
      case 'setViewMode':
        if (command.viewMode) {
          setViewMode(command.viewMode)
          return true
        }
        return false
      case 'toggleDark':
        if (typeof command.darkMode === 'boolean') {
          setDarkMode(command.darkMode)
        } else {
          setDarkMode((prev) => !prev)
        }
        return true
      case 'copyRich':
        return handleCopyRich()
      case 'copyHTML':
        return handleCopyHTML()
      case 'exportHTML':
        handleExportHTML()
        return true
      case 'openPoster':
        setPosterOpen(true)
        return true
      default:
        return false
    }
  }, [handleCopyHTML, handleCopyRich, handleExportHTML, showToast])

  useEffect(() => {
    const { templateId, markdown: markdownByURL, viewMode: viewModeByURL, darkMode: darkModeByURL } =
      parseOpenClawURLParams(window.location.href)

    if (templateId) {
      const resolved = resolveTemplateById(allTemplates, templateId)
      if (resolved) {
        setTemplate(resolved)
      }
    }

    if (markdownByURL) {
      setMarkdown(markdownByURL)
      showToast('已从 OpenClaw URL 参数导入内容', 'success')
    }

    if (viewModeByURL && ['mobile', 'tablet', 'desktop'].includes(viewModeByURL)) {
      setViewMode(viewModeByURL)
    }

    if (typeof darkModeByURL === 'boolean') {
      setDarkMode(darkModeByURL)
    }
  }, [showToast])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!isOpenClawMessage(event.data)) {
        return
      }

      const command = event.data.payload
      if (!command) {
        postOpenClawAck({ ok: false, action: 'setMarkdown', message: 'missing payload' })
        return
      }

      void dispatchOpenClawCommand(command).then((ok) => {
        postOpenClawAck({ ok, action: command.action, message: ok ? 'ok' : 'invalid command' })
      })
    }

    window.addEventListener('message', onMessage)

    window.PageSkillOpenClaw = {
      dispatch: dispatchOpenClawCommand,
      getState: () => ({
        markdown,
        templateId: template.id,
        viewMode,
        darkMode,
      }),
    }

    return () => {
      window.removeEventListener('message', onMessage)
      delete window.PageSkillOpenClaw
    }
  }, [darkMode, dispatchOpenClawCommand, markdown, template.id, viewMode])

  return (
    <div className="h-screen flex flex-col overflow-hidden app-shell">
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

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          currentTemplate={template}
          onSelectTemplate={setTemplate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/2 min-w-0 border-r border-gray-200">
            <Editor value={markdown} onChange={setMarkdown} />
          </div>

          <div className="w-1/2 min-w-0">
            <Preview
              html={previewHTML}
              css={previewCSS}
              templateId={template.id}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>

      <PosterModal
        isOpen={posterOpen}
        onClose={() => setPosterOpen(false)}
        markdown={markdown}
        template={template}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
