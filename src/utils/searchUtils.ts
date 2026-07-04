import type { HeadingItem } from '../components/Editor/OutlinePanel'

export interface SearchMatch {
  index: number
  length: number
  line: number
}

/**
 * Extract headings from markdown text
 */
export function extractHeadings(markdown: string): HeadingItem[] {
  const lines = markdown.split('\n')
  const headings: HeadingItem[] = []
  let charIndex = 0

  lines.forEach((line, lineIndex) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/)
    if (match) {
      headings.push({
        level: match[1].length,
        text: match[2].trim(),
        line: lineIndex,
        index: charIndex,
      })
    }
    charIndex += line.length + 1 // +1 for newline
  })

  return headings
}

/**
 * Find all matches in text
 */
export function findMatches(
  text: string,
  query: string,
  useRegex: boolean,
  caseSensitive: boolean
): SearchMatch[] {
  if (!query) return []

  const matches: SearchMatch[] = []
  const lines = text.split('\n')
  let charIndex = 0

  try {
    if (useRegex) {
      const regex = new RegExp(query, caseSensitive ? 'g' : 'gi')
      lines.forEach((line, lineIndex) => {
        let match
        const lineRegex = new RegExp(query, caseSensitive ? 'g' : 'gi')
        while ((match = lineRegex.exec(line)) !== null) {
          matches.push({
            index: charIndex + match.index,
            length: match[0].length,
            line: lineIndex,
          })
        }
        charIndex += line.length + 1
      })
    } else {
      const searchText = caseSensitive ? text : text.toLowerCase()
      const searchQuery = caseSensitive ? query : query.toLowerCase()
      let index = 0

      while ((index = searchText.indexOf(searchQuery, index)) !== -1) {
        const line = text.substring(0, index).split('\n').length - 1
        matches.push({
          index,
          length: query.length,
          line,
        })
        index += query.length
      }
    }
  } catch (e) {
    // Invalid regex
    return []
  }

  return matches
}

/**
 * Get line number from character index
 */
export function getLineFromIndex(text: string, index: number): number {
  return text.substring(0, index).split('\n').length - 1
}

/**
 * Get character index from line number
 */
export function getIndexFromLine(text: string, line: number): number {
  const lines = text.split('\n')
  let index = 0
  for (let i = 0; i < line && i < lines.length; i++) {
    index += lines[i].length + 1
  }
  return index
}

/**
 * Count matches in a text range
 */
export function countMatchesInRange(
  matches: SearchMatch[],
  startIndex: number,
  endIndex: number
): number {
  return matches.filter((m) => m.index >= startIndex && m.index < endIndex).length
}

/**
 * Add match counts to headings
 */
export function addMatchCountsToHeadings(
  headings: HeadingItem[],
  matches: SearchMatch[],
  textLength: number
): HeadingItem[] {
  return headings.map((heading, idx) => {
    const nextHeading = headings[idx + 1]
    const startIndex = heading.index
    const endIndex = nextHeading ? nextHeading.index : textLength

    return {
      ...heading,
      matches: countMatchesInRange(matches, startIndex, endIndex),
    }
  })
}

/**
 * Highlight matches in HTML
 */
export function highlightMatchesInHTML(html: string, query: string, useRegex: boolean, caseSensitive: boolean): string {
  if (!query) return html

  try {
    // Create a temporary div to parse HTML
    const div = document.createElement('div')
    div.innerHTML = html

    // Skip script and style tags
    const walk = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || ''
        if (!text.trim()) return

        const parent = node.parentElement
        if (parent && ['SCRIPT', 'STYLE', 'CODE', 'PRE'].includes(parent.tagName)) {
          return
        }

        let highlightedHTML = text
        if (useRegex) {
          try {
            const regex = new RegExp(`(${query})`, caseSensitive ? 'g' : 'gi')
            highlightedHTML = text.replace(regex, '<mark class="search-highlight">$1</mark>')
          } catch {
            return
          }
        } else {
          const regex = new RegExp(
            query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
            caseSensitive ? 'g' : 'gi'
          )
          highlightedHTML = text.replace(regex, '<mark class="search-highlight">$&</mark>')
        }

        if (highlightedHTML !== text) {
          const span = document.createElement('span')
          span.innerHTML = highlightedHTML
          node.parentNode?.replaceChild(span, node)
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach(walk)
      }
    }

    walk(div)
    return div.innerHTML
  } catch (e) {
    return html
  }
}
