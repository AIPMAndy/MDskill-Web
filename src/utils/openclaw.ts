import type { Template } from '../templates'

export type ViewMode = 'mobile' | 'tablet' | 'desktop'

export type OpenClawAction =
  | 'setMarkdown'
  | 'setTemplate'
  | 'setViewMode'
  | 'toggleDark'
  | 'copyRich'
  | 'copyHTML'
  | 'exportHTML'
  | 'openPoster'

export interface OpenClawCommand {
  action: OpenClawAction
  markdown?: string
  templateId?: string
  viewMode?: ViewMode
  darkMode?: boolean
}

export interface OpenClawAck {
  ok: boolean
  action: OpenClawAction
  message?: string
}

const OPENCLAW_MESSAGE_TYPE = 'pageskill.command'
const OPENCLAW_ACK_TYPE = 'pageskill.ack'

function decodeMarkdown(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

export function parseOpenClawURLParams(url: string) {
  const parsed = new URL(url)
  const params = parsed.searchParams

  const templateId = params.get('template') || undefined
  const viewMode = (params.get('view') || undefined) as ViewMode | undefined
  const markdownParam = params.get('markdown') || undefined
  const darkParam = params.get('dark')

  return {
    templateId,
    viewMode,
    markdown: markdownParam ? decodeMarkdown(markdownParam) : undefined,
    darkMode: darkParam === null ? undefined : darkParam === '1' || darkParam === 'true',
  }
}

export function resolveTemplateById(templates: Template[], templateId?: string): Template | null {
  if (!templateId) return null
  return templates.find((item) => item.id === templateId) || null
}

export function isOpenClawMessage(data: unknown): data is { type: string; payload?: OpenClawCommand } {
  if (!data || typeof data !== 'object') return false
  const message = data as { type?: unknown }
  return message.type === OPENCLAW_MESSAGE_TYPE
}

export function postOpenClawAck(ack: OpenClawAck) {
  const payload = {
    type: OPENCLAW_ACK_TYPE,
    payload: ack,
  }

  window.parent?.postMessage(payload, '*')
  window.postMessage(payload, '*')
}
