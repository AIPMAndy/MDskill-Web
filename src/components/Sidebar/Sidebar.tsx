import React, { useEffect, useState } from 'react'
import { allTemplates, type Template } from '../../templates'
import { Check, ChevronDown, Layers2, X } from 'lucide-react'

interface SidebarProps {
  currentTemplate: Template
  onSelectTemplate: (template: Template) => void
  isOpen: boolean
  onClose: () => void
}

const categories = [
  { id: 'all', label: '全部风格' },
  { id: 'minimal', label: '极简' },
  { id: 'business', label: '商务' },
  { id: 'creative', label: '创意' },
  { id: 'tech', label: '科技' },
  { id: 'story', label: '叙事' },
]

const featuredIds = ['apple-light', 'wechat-elegant', 'minimal-pro', 'github-light', 'medium']
const orderedTemplates = [...allTemplates].sort((a, b) => {
  const rank = (id: string) => featuredIds.includes(id) ? featuredIds.indexOf(id) : featuredIds.length
  return rank(a.id) - rank(b.id)
})

export default function Sidebar({ currentTemplate, onSelectTemplate, isOpen, onClose }: SidebarProps) {
  const [category, setCategory] = useState('all')
  const templates = orderedTemplates.filter(t => category === 'all' || t.category === category)

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <>
      {isOpen && <button className="sidebar-overlay" onClick={onClose} aria-label="关闭模板库" />}
      <aside className={`template-sidebar ${isOpen ? 'is-open' : ''}`} aria-label="排版模板库">
        <div className="sidebar-heading">
          <div><span className="section-kicker">为文字选择一种气质</span><h2>排版模板<span>{allTemplates.length}</span></h2></div>
          <button className="icon-button sidebar-close" onClick={onClose} aria-label="关闭模板库"><X size={18} /></button>
        </div>
        <div className="template-filter">
          <Layers2 size={15} aria-hidden="true" />
          <select aria-label="筛选模板风格" value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
          <ChevronDown size={14} aria-hidden="true" />
        </div>
        <div className="template-list">
          {templates.map(template => {
            const active = template.id === currentTemplate.id
            const styles = template.styles
            return (
              <button key={template.id} className={`template-option ${active ? 'is-selected' : ''}`} aria-pressed={active} title={template.description} onClick={() => { onSelectTemplate(template); onClose() }}>
                <span className="template-swatch" aria-hidden="true" style={{ background: styles.backgroundColor, color: styles.titleColor, fontFamily: styles.titleFont }}>
                  <span>Aa</span><i style={{ background: styles.h2Color }} /><i style={{ background: styles.bodyColor }} />
                </span>
                <span className="template-description"><strong>{template.name}</strong><span>{template.description}</span></span>
                {active && <span className="template-check"><Check size={12} strokeWidth={2.5} /></span>}
              </button>
            )
          })}
        </div>
        <div className="sidebar-note"><span className="note-line" /><p>专注写作，排版交给 MDskill。</p><span>选一个喜欢的风格，即刻预览。</span></div>
      </aside>
    </>
  )
}
