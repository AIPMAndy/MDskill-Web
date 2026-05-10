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
  titleExtra?: string
  
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

// ============== ORIGINAL TEMPLATES ==============

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

// ============== NEW PREMIUM TEMPLATES ==============

export const latepointTemplate: Template = {
  id: 'latepoint',
  name: '深度报道',
  description: '红色主题，适合深度分析、调查报道',
  category: 'business',
  icon: '🔴',
  styles: {
    ...baseStyles,
    maxWidth: '700px',
    padding: '16px 12px 36px 12px',
    titleSize: '26px',
    titleWeight: '700',
    titleColor: '#1a1a1a',
    titleMarginBottom: '18px',
    titleExtra: 'padding-left: 16px; border-left: 5px solid #d32f2f;',
    h2Size: '20px',
    h2Weight: '600',
    h2Color: '#fff',
    h2MarginTop: '32px',
    h2MarginBottom: '16px',
    h2Extra: 'padding: 12px 20px; background-color: #d32f2f; border-radius: 4px;',
    h3Size: '18px',
    h3Weight: '600',
    h3Color: '#d32f2f',
    h3Extra: 'padding-left: 14px; border-left: 4px solid #d32f2f;',
    bodySize: '17px',
    bodyLineHeight: '1.85',
    strongColor: '#d32f2f',
    linkColor: '#d32f2f',
    blockquoteBorderColor: '#d32f2f',
    blockquoteBg: '#f5f5f5',
    blockquoteColor: '#1a1a1a',
    blockquoteExtra: 'font-size: 16px; border-radius: 4px;',
    codeBg: '#f5f5f5',
    codeColor: '#d32f2f',
    codeBlockBg: '#2a2a2a',
    codeBlockColor: '#f5f5f5',
    listMarkerColor: '#d32f2f',
    imageRadius: '6px',
    imageShadow: '0 4px 12px rgba(211, 47, 47, 0.12)',
  },
}

export const financialTemplate: Template = {
  id: 'financial',
  name: '金融时报',
  description: '经典报纸风格，适合财经、商业分析',
  category: 'business',
  icon: '📊',
  styles: {
    ...baseStyles,
    backgroundColor: '#fff1e5',
    maxWidth: '680px',
    padding: '16px 20px 40px 20px',
    titleFont: 'Georgia, "Times New Roman", Times, serif',
    titleSize: '38px',
    titleWeight: '600',
    titleColor: '#000',
    titleMarginBottom: '24px',
    titleExtra: 'letter-spacing: -0.01em; border-bottom: 4px solid #990f3d; padding-bottom: 16px;',
    h2Font: 'Georgia, "Times New Roman", Times, serif',
    h2Size: '30px',
    h2Weight: '600',
    h2Color: '#990f3d',
    h2MarginTop: '48px',
    h2MarginBottom: '20px',
    h2Extra: 'border-left: 6px solid #990f3d; padding-left: 20px;',
    h3Size: '24px',
    h3Weight: '600',
    h3Color: '#33302e',
    h3Extra: 'border-bottom: 2px solid #cec6b9; padding-bottom: 8px;',
    bodyFont: 'Georgia, "Times New Roman", Times, serif',
    bodySize: '17px',
    bodyColor: '#33302e',
    bodyLineHeight: '1.75',
    strongColor: '#990f3d',
    linkColor: '#0d7680',
    blockquoteBorderColor: '#990f3d',
    blockquoteBg: '#fff1e5',
    blockquoteColor: '#990f3d',
    blockquoteExtra: 'font-style: italic; font-family: Georgia, serif;',
    codeBg: '#fff',
    codeColor: '#990f3d',
    codeBlockBg: '#fff',
    codeBlockColor: '#33302e',
    listMarkerColor: '#990f3d',
    dividerColor: '#990f3d',
    tableBorderColor: '#cec6b9',
    tableHeaderBg: '#990f3d',
    tableHeaderColor: '#fff',
  },
}

export const anthropicTemplate: Template = {
  id: 'anthropic',
  name: 'AI 现代',
  description: '渐变主题，适合 AI、科技内容',
  category: 'tech',
  icon: '🤖',
  styles: {
    ...baseStyles,
    backgroundColor: '#faf9f7',
    maxWidth: '700px',
    padding: '20px 24px 40px 24px',
    titleSize: '32px',
    titleWeight: '600',
    titleColor: '#C15F3C',
    titleMarginBottom: '18px',
    titleExtra: 'letter-spacing: -0.02em;',
    h2Size: '26px',
    h2Weight: '600',
    h2Color: '#C15F3C',
    h2MarginTop: '32px',
    h2MarginBottom: '16px',
    h2Extra: 'letter-spacing: -0.015em;',
    h3Size: '22px',
    h3Weight: '600',
    h3Color: '#2b2b2b',
    h3Extra: 'letter-spacing: -0.01em;',
    bodySize: '17px',
    bodyColor: '#2b2b2b',
    bodyLineHeight: '1.8',
    strongColor: '#C15F3C',
    linkColor: '#C15F3C',
    blockquoteBorderColor: '#C15F3C',
    blockquoteBg: '#f0f9ff',
    blockquoteColor: '#2b2b2b',
    blockquoteExtra: 'font-style: italic; border-radius: 6px;',
    codeBg: '#f5f5f5',
    codeColor: '#C15F3C',
    codeBlockBg: '#2b2b2b',
    codeBlockColor: '#f5f5f5',
    listMarkerColor: '#C15F3C',
    imageRadius: '10px',
    imageShadow: '0 6px 24px rgba(193, 95, 60, 0.1)',
  },
}

export const elegantTemplate: Template = {
  id: 'elegant',
  name: '优雅简约',
  description: '宋体排版，适合文学、散文',
  category: 'creative',
  icon: '🎨',
  styles: {
    ...baseStyles,
    maxWidth: '720px',
    padding: '12px 20px 30px 20px',
    titleFont: '"Songti SC", "SimSun", Georgia, serif',
    titleSize: '26px',
    titleWeight: '400',
    titleColor: '#1a1a1a',
    titleAlign: 'center',
    titleMarginBottom: '18px',
    titleExtra: 'letter-spacing: 2px;',
    h2Font: '"Songti SC", "SimSun", Georgia, serif',
    h2Size: '22px',
    h2Weight: '400',
    h2Color: '#2c2c2c',
    h2MarginTop: '32px',
    h2MarginBottom: '16px',
    h2Extra: 'text-align: center; letter-spacing: 1px;',
    h3Size: '19px',
    h3Weight: '400',
    h3Color: '#3a3a3a',
    h3Extra: 'letter-spacing: 0.5px;',
    bodyFont: '"Songti SC", "SimSun", Georgia, serif',
    bodySize: '17px',
    bodyColor: '#444',
    bodyLineHeight: '1.85',
    paragraphSpacing: '18px',
    strongColor: '#1a1a1a',
    linkColor: '#8b7355',
    blockquoteBorderColor: '#ccc',
    blockquoteBg: 'transparent',
    blockquoteColor: '#666',
    codeBg: '#f5f5f5',
    codeColor: '#8b4513',
    codeBlockBg: '#f9f9f9',
    codeBlockColor: '#333',
    listMarkerColor: '#999',
    dividerColor: '#e0e0e0',
    imageRadius: '8px',
    imageShadow: 'none',
  },
}

export const deepreadTemplate: Template = {
  id: 'deepread',
  name: '深度阅读',
  description: '专注内容，适合长文、深度思考',
  category: 'minimal',
  icon: '📚',
  styles: {
    ...baseStyles,
    maxWidth: '680px',
    padding: '14px 12px 32px 12px',
    titleSize: '26px',
    titleWeight: '700',
    titleColor: '#0a0a0a',
    titleMarginBottom: '18px',
    titleExtra: 'letter-spacing: -0.02em;',
    h2Size: '22px',
    h2Weight: '700',
    h2Color: '#0a0a0a',
    h2MarginTop: '32px',
    h2MarginBottom: '16px',
    h2Extra: 'letter-spacing: -0.01em;',
    h3Size: '19px',
    h3Weight: '600',
    h3Color: '#1a1a1a',
    bodySize: '17px',
    bodyColor: '#1a1a1a',
    bodyLineHeight: '1.8',
    strongColor: '#0a0a0a',
    linkColor: '#0066cc',
    blockquoteBorderColor: '#0a0a0a',
    blockquoteBg: '#f8f9fa',
    blockquoteColor: '#1a1a1a',
    codeBg: '#f5f5f5',
    codeColor: '#d73a49',
    codeBlockBg: '#f6f8fa',
    codeBlockColor: '#24292e',
    listMarkerColor: '#0a0a0a',
    dividerColor: '#e1e4e8',
    imageRadius: '8px',
    imageShadow: 'none',
  },
}

export const nytTemplate: Template = {
  id: 'nyt',
  name: '纽约时报',
  description: '经典新闻风格，适合新闻、评论',
  category: 'business',
  icon: '📰',
  styles: {
    ...baseStyles,
    maxWidth: '680px',
    padding: '20px 12px 48px 12px',
    titleFont: 'Georgia, "Times New Roman", Times, serif',
    titleSize: '42px',
    titleWeight: '700',
    titleColor: '#000',
    titleMarginBottom: '16px',
    titleExtra: 'letter-spacing: -0.02em; border-bottom: 1px solid #000; padding-bottom: 16px;',
    h2Font: 'Georgia, "Times New Roman", Times, serif',
    h2Size: '32px',
    h2Weight: '700',
    h2Color: '#000',
    h2MarginTop: '48px',
    h2MarginBottom: '16px',
    h2Extra: 'letter-spacing: -0.01em;',
    h3Size: '24px',
    h3Weight: '700',
    h3Color: '#121212',
    bodyFont: 'Georgia, "Times New Roman", Times, serif',
    bodySize: '18px',
    bodyColor: '#121212',
    bodyLineHeight: '1.8',
    strongColor: '#000',
    linkColor: '#326891',
    blockquoteBorderColor: '#121212',
    blockquoteBg: '#f7f7f7',
    blockquoteColor: '#121212',
    blockquoteExtra: 'font-style: italic; font-family: Georgia, serif;',
    codeBg: '#f0f0f0',
    codeColor: '#666',
    codeBlockBg: '#f7f7f7',
    codeBlockColor: '#121212',
    listMarkerColor: '#121212',
    dividerColor: '#ddd',
    tableBorderColor: '#ddd',
    tableHeaderBg: '#f7f7f7',
    tableHeaderColor: '#121212',
  },
}

export const appleTemplate: Template = {
  id: 'apple',
  name: 'Apple 极简',
  description: 'Apple 设计语言，适合产品介绍',
  category: 'minimal',
  icon: '🍎',
  styles: {
    ...baseStyles,
    backgroundColor: '#fbfbfd',
    maxWidth: '640px',
    padding: '20px 12px 40px 12px',
    titleSize: '32px',
    titleWeight: '600',
    titleColor: '#1d1d1f',
    titleMarginBottom: '18px',
    titleExtra: 'letter-spacing: -0.015em;',
    h2Size: '26px',
    h2Weight: '600',
    h2Color: '#1d1d1f',
    h2MarginTop: '32px',
    h2MarginBottom: '16px',
    h2Extra: 'letter-spacing: -0.012em;',
    h3Size: '21px',
    h3Weight: '600',
    h3Color: '#1d1d1f',
    h3Extra: 'letter-spacing: -0.009em;',
    bodySize: '17px',
    bodyColor: '#86868b',
    bodyLineHeight: '1.7',
    strongColor: '#1d1d1f',
    linkColor: '#06c',
    blockquoteBorderColor: '#1d1d1f',
    blockquoteBg: 'transparent',
    blockquoteColor: '#1d1d1f',
    blockquoteExtra: 'text-align: center;',
    codeBg: '#f5f5f7',
    codeColor: '#86868b',
    codeBlockBg: '#f5f5f7',
    codeBlockColor: '#1d1d1f',
    listMarkerColor: '#06c',
    dividerColor: '#d2d2d7',
    imageRadius: '10px',
    imageShadow: 'none',
    tableBorderColor: '#d2d2d7',
    tableHeaderBg: '#f5f5f7',
    tableHeaderColor: '#1d1d1f',
  },
}

// 免费版：3 种基础主题
export const freeTemplates: Template[] = [
  minimalTemplate,
  businessTemplate,
  techTemplate,
]

// 高级版：10 种精美主题（需要联系微信 AIPMAndy 获取）
export const premiumTemplates: Template[] = [
  literaryTemplate,
  magazineTemplate,
  storyTemplate,
  latepointTemplate,
  financialTemplate,
  anthropicTemplate,
  elegantTemplate,
  deepreadTemplate,
  nytTemplate,
  appleTemplate,
]

// 所有主题（免费版只显示前 3 个）
export const allTemplates: Template[] = [
  ...freeTemplates,
  // 高级版主题已移除，需要联系微信 AIPMAndy 获取完整版
  // ...premiumTemplates,
]

export function getTemplateById(id: string): Template {
  return allTemplates.find(t => t.id === id) || minimalTemplate
}
