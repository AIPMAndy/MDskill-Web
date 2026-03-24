import React, { useMemo } from 'react'
import type { Template } from '../../templates'
import { parseMarkdown, generateTemplateCSS } from '../../utils/renderer'

interface PreviewProps {
  markdown: string
  template: Template
  viewMode: 'mobile' | 'tablet' | 'desktop'
}

const viewModeWidths = {
  mobile: '375px',
  tablet: '768px',
  desktop: '100%',
}

export default function Preview({ markdown, template, viewMode }: PreviewProps) {
  const html = useMemo(() => parseMarkdown(markdown), [markdown])
  const css = useMemo(() => generateTemplateCSS(template.styles), [template])

  const previewWidth = viewModeWidths[viewMode]
  const isMobileOrTablet = viewMode !== 'desktop'

  return (
    <div className="h-full bg-gray-100 overflow-y-auto flex justify-center">
      <div
        className={`
          transition-all duration-300 ease-out
          ${isMobileOrTablet ? 'my-6 shadow-2xl rounded-2xl overflow-hidden border border-gray-200' : 'w-full'}
        `}
        style={{
          width: isMobileOrTablet ? previewWidth : '100%',
          maxWidth: isMobileOrTablet ? previewWidth : '100%',
          minHeight: isMobileOrTablet ? '600px' : 'auto',
        }}
      >
        {/* Mobile frame header */}
        {isMobileOrTablet && (
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-center">
            <div className="w-20 h-1 bg-gray-600 rounded-full" />
          </div>
        )}

        {/* Article content */}
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <div
          className={`article-preview template-${template.id} animate-fade-in`}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Mobile frame footer */}
        {isMobileOrTablet && (
          <div className="bg-gray-800 px-4 py-3 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-gray-600" />
          </div>
        )}
      </div>
    </div>
  )
}
