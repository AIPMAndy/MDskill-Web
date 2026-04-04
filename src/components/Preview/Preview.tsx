import React from 'react'
import { Smartphone, Tablet, Monitor } from 'lucide-react'

interface PreviewProps {
  html: string
  css: string
  templateId: string
  viewMode: 'mobile' | 'tablet' | 'desktop'
}

const viewModeWidths = {
  mobile: '390px',
  tablet: '820px',
  desktop: '100%',
}

const viewModeMeta = {
  mobile: { label: '移动端', icon: Smartphone },
  tablet: { label: '平板端', icon: Tablet },
  desktop: { label: '桌面端', icon: Monitor },
}

export default function Preview({ html, css, templateId, viewMode }: PreviewProps) {
  const previewWidth = viewModeWidths[viewMode]
  const isMobileOrTablet = viewMode !== 'desktop'
  const { label, icon: Icon } = viewModeMeta[viewMode]

  return (
    <div className="h-full preview-surface overflow-y-auto flex justify-center">
      <div className="pt-4 pb-8 px-4 w-full">
        <div className="mb-3 text-xs text-gray-500 flex items-center gap-2">
          <Icon size={14} />
          <span>{label}预览</span>
          <span className="text-gray-300">•</span>
          <span className="uppercase tracking-wide">template {templateId}</span>
        </div>

        <div
          className={[
            'transition-all duration-300 ease-out',
            isMobileOrTablet
              ? 'mx-auto shadow-2xl rounded-2xl overflow-hidden border border-gray-200 bg-white'
              : 'w-full rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm',
          ].join(' ')}
          style={{
            width: isMobileOrTablet ? previewWidth : '100%',
            maxWidth: isMobileOrTablet ? previewWidth : '100%',
            minHeight: isMobileOrTablet ? '640px' : 'auto',
          }}
        >
          {isMobileOrTablet && (
            <div className="bg-gray-900/95 px-4 py-2 flex items-center justify-center">
              <div className="w-24 h-1 bg-gray-600 rounded-full" />
            </div>
          )}

          <style dangerouslySetInnerHTML={{ __html: css }} />
          <div
            className={`article-preview template-${templateId} animate-fade-in`}
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {isMobileOrTablet && (
            <div className="bg-gray-900/95 px-4 py-3 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-gray-600" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
