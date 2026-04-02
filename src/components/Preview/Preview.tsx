import React from 'react'

interface PreviewProps {
  html: string
  css: string
  templateId: string
  viewMode: 'mobile' | 'tablet' | 'desktop'
}

const viewModeWidths = {
  mobile: '375px',
  tablet: '768px',
  desktop: '100%',
}

export default function Preview({ html, css, templateId, viewMode }: PreviewProps) {
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
        {isMobileOrTablet && (
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-center">
            <div className="w-20 h-1 bg-gray-600 rounded-full" />
          </div>
        )}

        <style dangerouslySetInnerHTML={{ __html: css }} />
        <div
          className={`article-preview template-${templateId} animate-fade-in`}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {isMobileOrTablet && (
          <div className="bg-gray-800 px-4 py-3 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-gray-600" />
          </div>
        )}
      </div>
    </div>
  )
}
