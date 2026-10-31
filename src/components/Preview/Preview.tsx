import React, { useLayoutEffect, useRef, useState } from 'react'
import { Eye, Monitor, Smartphone, Tablet } from 'lucide-react'
import type { ViewMode } from '../../utils/openclaw'

interface PreviewProps {
  html: string
  css: string
  templateId: string
  templateName: string
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

const modes: { mode: ViewMode; label: string; icon: typeof Monitor }[] = [
  { mode: 'mobile', label: '手机预览', icon: Smartphone },
  { mode: 'tablet', label: '平板预览', icon: Tablet },
  { mode: 'desktop', label: '桌面预览', icon: Monitor },
]

export default function Preview({ html, css, templateId, templateName, viewMode, onViewModeChange }: PreviewProps) {
  const surfaceRef = useRef<HTMLDivElement>(null)
  const paperRef = useRef<HTMLElement>(null)
  const [availableWidth, setAvailableWidth] = useState(390)
  const [paperHeight, setPaperHeight] = useState(0)

  useLayoutEffect(() => {
    const surface = surfaceRef.current
    const paper = paperRef.current
    if (!surface || !paper) return
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === surface && entry.contentRect.width > 0) setAvailableWidth(entry.contentRect.width)
        if (entry.target === paper) setPaperHeight(entry.borderBoxSize[0]?.blockSize || paper.offsetHeight)
      }
    })
    observer.observe(surface)
    observer.observe(paper)
    return () => observer.disconnect()
  }, [])

  const paperWidth = viewMode === 'mobile' ? 390 : viewMode === 'tablet' ? 820 : Math.min(availableWidth, 900)
  const scale = Math.min(1, availableWidth / paperWidth)

  return (
    <section className="preview-panel" aria-label="文章排版预览">
      <div className="panel-heading preview-heading"><div><Eye size={15} /><h2>实时预览</h2><span className="preview-theme-name">{templateName}</span></div>
        <div className="preview-size-switch" role="group" aria-label="预览尺寸">
          {modes.map(({ mode, label, icon: Icon }) => <button key={mode} className={`size-button ${viewMode === mode ? 'is-active' : ''}`} onClick={() => onViewModeChange(mode)} aria-label={label} aria-pressed={viewMode === mode} title={label}><Icon size={15} /></button>)}
        </div>
      </div>
      <div className="preview-surface" ref={surfaceRef}>
        <div className="paper-caption"><span>文章效果</span><span>{viewMode === 'mobile' ? '手机 · 390 px' : viewMode === 'tablet' ? '平板 · 820 px' : '桌面阅读'}</span></div>
        <div className="preview-stage" style={{ width: paperWidth * scale, height: paperHeight ? paperHeight * scale : undefined }}>
        <article ref={paperRef} className="preview-paper" style={{ width: paperWidth, transform: `scale(${scale})` }} aria-label={`${templateName}排版效果`}>
          <style dangerouslySetInnerHTML={{ __html: css }} />
          {html ? <div className={`article-preview template-${templateId}`} dangerouslySetInnerHTML={{ __html: html }} /> : <div className="preview-empty"><Eye size={26} strokeWidth={1.2} /><h3>好文章，从第一行开始。</h3><p>在编辑区写下文字，这里会实时呈现。</p></div>}
        </article>
        </div>
        <p className="preview-footnote">好内容，值得好排版。</p>
      </div>
    </section>
  )
}
