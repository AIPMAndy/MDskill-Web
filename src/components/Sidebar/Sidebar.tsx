import React from 'react'
import { allTemplates, type Template } from '../../templates'
import {
  Layers,
  ChevronRight,
  FileText,
  Palette,
} from 'lucide-react'

interface SidebarProps {
  currentTemplate: Template
  onSelectTemplate: (template: Template) => void
  isOpen: boolean
  onClose: () => void
}

const categoryLabels: Record<string, string> = {
  minimal: '极简',
  business: '商务',
  creative: '创意',
  tech: '科技',
  story: '叙事',
}

const categoryColors: Record<string, string> = {
  minimal: 'bg-gray-100 text-gray-600',
  business: 'bg-blue-50 text-blue-600',
  creative: 'bg-rose-50 text-rose-600',
  tech: 'bg-cyan-50 text-cyan-600',
  story: 'bg-amber-50 text-amber-700',
}

export default function Sidebar({ currentTemplate, onSelectTemplate, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:relative z-50 lg:z-0
          top-[var(--header-height)] lg:top-0
          left-0 h-[calc(100vh-var(--header-height))]
          w-[var(--sidebar-width)] bg-white border-r border-gray-200
          flex flex-col
          transition-transform duration-200 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Sidebar header */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Palette size={16} />
            模板库
          </div>
        </div>

        {/* Template list */}
        <div className="flex-1 overflow-y-auto py-2">
          {allTemplates.map((template) => {
            const isActive = template.id === currentTemplate.id
            return (
              <button
                key={template.id}
                onClick={() => {
                  onSelectTemplate(template)
                  onClose()
                }}
                className={`
                  w-full text-left px-4 py-3 flex items-start gap-3
                  transition-colors duration-150
                  ${isActive
                    ? 'bg-blue-50 border-r-2 border-blue-500'
                    : 'hover:bg-gray-50'
                  }
                `}
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{template.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${isActive ? 'text-blue-700' : 'text-gray-800'}`}>
                      {template.name}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${categoryColors[template.category]}`}>
                      {categoryLabels[template.category]}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {template.description}
                  </p>
                </div>
                {isActive && (
                  <ChevronRight size={14} className="text-blue-500 mt-1 flex-shrink-0" />
                )}
              </button>
            )
          })}
        </div>

        {/* Footer info */}
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <Layers size={12} />
            {allTemplates.length} 个模板
          </div>
        </div>
      </aside>
    </>
  )
}
