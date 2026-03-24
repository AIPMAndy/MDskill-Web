export interface Template {
  id: string
  name: string
  description: string
  category: 'business' | 'creative' | 'tech' | 'minimal' | 'story'
  icon: string
  styles: TemplateStyles
}

export interface TemplateStyles {
  // Page
  backgroundColor: string
  maxWidth: string
  padding: string
  
  // Title
  titleFont: string
  titleSize: string
  titleWeight: string
  titleColor: string
  titleAlign: string
  titleMarginBottom: string
  titleExtra?: string // extra CSS for title
  
  // Subtitle (h2)
  h2Font: string
  h2Size: string
  h2Weight: string
  h2Color: string
  h2MarginTop: string
  h2MarginBottom: string
  h2Extra?: string
  
  // H3
  h3Size: string
  h3Weight: string
  h3Color: string
  h3Extra?: string
  
  // Body text
  bodyFont: string
  bodySize: string
  bodyColor: string
  bodyLineHeight: string
  paragraphSpacing: string
  
  // Links
  linkColor: string
  
  // Blockquote
  blockquoteBorderColor: string
  blockquoteBg: string
  blockquoteColor: string
  blockquoteExtra?: string
  
  // Code
  codeBg: string
  codeColor: string
  codeBlockBg: string
  codeBlockColor: string
  
  // Image
  imageRadius: string
  imageShadow: string
  
  // Table
  tableBorderColor: string
  tableHeaderBg: string
  tableHeaderColor: string
  tableStripeBg: string
  
  // Divider
  dividerColor: string
  
  // Strong / emphasis
  strongColor: string
  emColor: string
  
  // List
  listMarkerColor: string
}

const baseStyles: TemplateStyles = {
  backgroundColor: '#ffffff',
  maxWidth: '680px',
  padding: '40px 32px',
  
  titleFont: '"Noto Sans SC", sans-serif',
  titleSize: '28px',
  titleWeight: '700',
  titleColor: '#1a1a1a',
  titleAlign: 'left',
  titleMarginBottom: '24px',
  
  h2Font: '"Noto Sans SC", sans-serif',
  h2Size: '22px',
  h2Weight: '600',
  h2Color: '#1a1a1a',
  h2MarginTop: '36px',
  h2MarginBottom: '16px',
  
  h3Size: '18px',
  h3Weight: '600',
  h3Color: '#333333',
  
  bodyFont: '"Noto Sans SC", sans-serif',
  bodySize: '16px',
  bodyColor: '#333333',
  bodyLineHeight: '1.8',
  paragraphSpacing: '16px',
  
  linkColor: '#2563eb',
  
  blockquoteBorderColor: '#2563eb',
  blockquoteBg: '#f0f7ff',
  blockquoteColor: '#4b5563',
  
  codeBg: '#f1f5f9',
  codeColor: '#e11d48',
  codeBlockBg: '#1e1e2e',
  codeBlockColor: '#cdd6f4',
  
  imageRadius: '8px',
  imageShadow: '0 2px 12px rgba(0,0,0,0.08)',
  
  tableBorderColor: '#e2e8f0',
  tableHeaderBg: '#f8fafc',
  tableHeaderColor: '#1a1a1a',
  tableStripeBg: '#fafbfc',
  
  dividerColor: '#e2e8f0',
  
  strongColor: '#1a1a1a',
  emColor: '#6b7280',
  
  listMarkerColor: '#2563eb',
}

// ============== TEMPLATES ==============

export const businessTemplate: Template = {
  id: 'business',
  name: '商务经典',
  description: '深蓝主色，专业严谨，适合商业分析、行业报告',
  category: 'business',
  icon: '💼',
  styles: {
    ...baseStyles,
    titleColor: '#0f172a',
    titleSize: '26px',
    titleAlign: 'left',
    titleExtra: 'border-bottom: 3px solid #1e40af; padding-bottom: 16px;',
    
    h2Color: '#1e3a8a',
    h2Extra: 'padding-left: 12px; border-left: 4px solid #1e40af;',
    
    h3Color: '#1e40af',
    
    linkColor: '#1e40af',
    blockquoteBorderColor: '#1e40af',
    blockquoteBg: '#eff6ff',
    blockquoteColor: '#1e3a8a',
    
    strongColor: '#1e40af',
    listMarkerColor: '#1e40af',
  },
}

export const literaryTemplate: Template = {
  id: 'literary',
  name: '文艺清新',
  description: '大面积留白，优雅字体，适合随笔、游记',
  category: 'creative',
  icon: '🌿',
  styles: {
    ...baseStyles,
    backgroundColor: '#fefdf8',
    padding: '48px 40px',
    
    titleFont: '"Noto Serif SC", serif',
    titleSize: '30px',
    titleColor: '#44403c',
    titleAlign: 'center',
    titleMarginBottom: '32px',
    titleExtra: 'letter-spacing: 2px;',
    
    h2Font: '"Noto Serif SC", serif',
    h2Size: '21px',
    h2Color: '#57534e',
    h2Extra: 'text-align: center; letter-spacing: 1px;',
    h2MarginTop: '48px',
    
    h3Color: '#78716c',
    h3Size: '17px',
    
    bodyFont: '"Noto Serif SC", serif',
    bodySize: '16px',
    bodyColor: '#57534e',
    bodyLineHeight: '2',
    paragraphSpacing: '20px',
    
    linkColor: '#92400e',
    
    blockquoteBorderColor: '#d6d3d1',
    blockquoteBg: 'transparent',
    blockquoteColor: '#78716c',
    blockquoteExtra: 'font-style: italic; border-left-width: 2px;',
    
    strongColor: '#44403c',
    emColor: '#92400e',
    listMarkerColor: '#a8a29e',
    
    dividerColor: '#d6d3d1',
    
    imageRadius: '4px',
    imageShadow: 'none',
  },
}

export const techTemplate: Template = {
  id: 'tech',
  name: '科技极客',
  description: '深色模式，代码高亮，适合技术教程、评测',
  category: 'tech',
  icon: '🖥️',
  styles: {
    ...baseStyles,
    backgroundColor: '#0f172a',
    
    titleColor: '#e2e8f0',
    titleSize: '26px',
    titleExtra: 'border-bottom: 2px solid #38bdf8; padding-bottom: 12px;',
    
    h2Color: '#38bdf8',
    h2Extra: 'font-family: monospace;',
    h2Size: '20px',
    
    h3Color: '#7dd3fc',
    h3Size: '17px',
    h3Extra: 'font-family: monospace;',
    
    bodyColor: '#cbd5e1',
    bodyLineHeight: '1.75',
    
    linkColor: '#38bdf8',
    
    blockquoteBorderColor: '#38bdf8',
    blockquoteBg: '#1e293b',
    blockquoteColor: '#94a3b8',
    
    codeBg: '#1e293b',
    codeColor: '#f472b6',
    codeBlockBg: '#020617',
    codeBlockColor: '#e2e8f0',
    
    strongColor: '#f1f5f9',
    emColor: '#38bdf8',
    listMarkerColor: '#38bdf8',
    
    tableBorderColor: '#334155',
    tableHeaderBg: '#1e293b',
    tableHeaderColor: '#e2e8f0',
    tableStripeBg: '#0f172a',
    
    dividerColor: '#334155',
    
    imageRadius: '6px',
    imageShadow: '0 4px 20px rgba(0,0,0,0.4)',
  },
}

export const minimalTemplate: Template = {
  id: 'minimal',
  name: '简约现代',
  description: '极简设计，专注阅读，适合观点输出',
  category: 'minimal',
  icon: '✨',
  styles: {
    ...baseStyles,
    maxWidth: '640px',
    padding: '48px 24px',
    
    titleSize: '32px',
    titleWeight: '800',
    titleColor: '#111827',
    titleAlign: 'left',
    titleMarginBottom: '20px',
    
    h2Size: '20px',
    h2Weight: '700',
    h2Color: '#111827',
    h2MarginTop: '40px',
    
    h3Size: '17px',
    h3Color: '#374151',
    
    bodyColor: '#374151',
    bodyLineHeight: '1.85',
    
    blockquoteBorderColor: '#111827',
    blockquoteBg: '#f9fafb',
    blockquoteColor: '#6b7280',
    
    strongColor: '#111827',
    listMarkerColor: '#111827',
    
    dividerColor: '#e5e7eb',
  },
}

export const magazineTemplate: Template = {
  id: 'magazine',
  name: '杂志风格',
  description: '图文混排，首字下沉，适合深度报道',
  category: 'creative',
  icon: '📰',
  styles: {
    ...baseStyles,
    maxWidth: '720px',
    padding: '40px 36px',
    
    titleFont: '"Noto Serif SC", serif',
    titleSize: '34px',
    titleWeight: '900',
    titleColor: '#0c0a09',
    titleAlign: 'center',
    titleMarginBottom: '8px',
    titleExtra: 'line-height: 1.3;',
    
    h2Font: '"Noto Serif SC", serif',
    h2Size: '22px',
    h2Weight: '700',
    h2Color: '#0c0a09',
    h2MarginTop: '40px',
    h2Extra: 'border-bottom: 1px solid #0c0a09; padding-bottom: 8px;',
    
    h3Size: '18px',
    h3Color: '#292524',
    
    bodyFont: '"Noto Sans SC", sans-serif',
    bodySize: '15.5px',
    bodyColor: '#292524',
    bodyLineHeight: '1.9',
    
    linkColor: '#dc2626',
    
    blockquoteBorderColor: '#dc2626',
    blockquoteBg: '#fef2f2',
    blockquoteColor: '#44403c',
    
    strongColor: '#0c0a09',
    emColor: '#dc2626',
    listMarkerColor: '#dc2626',
    
    dividerColor: '#d6d3d1',
    
    imageRadius: '0px',
    imageShadow: 'none',
  },
}

export const storyTemplate: Template = {
  id: 'story',
  name: '故事叙述',
  description: '情感化设计，适合专访、品牌故事',
  category: 'story',
  icon: '📖',
  styles: {
    ...baseStyles,
    backgroundColor: '#faf7f2',
    maxWidth: '660px',
    padding: '48px 36px',
    
    titleFont: '"Noto Serif SC", serif',
    titleSize: '28px',
    titleColor: '#3c2415',
    titleAlign: 'center',
    titleMarginBottom: '28px',
    titleExtra: 'letter-spacing: 1px;',
    
    h2Font: '"Noto Serif SC", serif',
    h2Size: '20px',
    h2Color: '#5c3d2e',
    h2MarginTop: '44px',
    h2Extra: 'text-align: center;',
    
    h3Color: '#7c5e4a',
    h3Size: '17px',
    
    bodyFont: '"Noto Serif SC", serif',
    bodySize: '16px',
    bodyColor: '#4a3728',
    bodyLineHeight: '2',
    paragraphSpacing: '18px',
    
    linkColor: '#a16207',
    
    blockquoteBorderColor: '#d4a373',
    blockquoteBg: '#fef3c7',
    blockquoteColor: '#78350f',
    blockquoteExtra: 'font-style: italic;',
    
    strongColor: '#3c2415',
    emColor: '#a16207',
    listMarkerColor: '#d4a373',
    
    dividerColor: '#d4a373',
    
    imageRadius: '12px',
    imageShadow: '0 4px 16px rgba(60,36,21,0.12)',
  },
}

export const allTemplates: Template[] = [
  minimalTemplate,
  businessTemplate,
  literaryTemplate,
  techTemplate,
  magazineTemplate,
  storyTemplate,
]

export function getTemplateById(id: string): Template {
  return allTemplates.find(t => t.id === id) || minimalTemplate
}
