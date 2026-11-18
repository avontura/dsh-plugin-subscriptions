/**
 * Helpers shared by the image_generate and video_generate tool views: the
 * call-card title prompt and the settled result's text body.
 */

import type { ToolCallBlock } from '@deepseek-ai/dsh-client-ui-conversation/client'

/** Flatten a settled result's text blocks (the text-only fallback body and the error line). */
export function resultText(block: ToolCallBlock): string {
  if (!('kind' in block)) return ''
  const parts: string[] = []
  for (const part of block.content) {
    if (part.type === 'text') parts.push(part.text)
  }
  if (parts.length === 0 && block.error !== undefined) parts.push(`${block.error.name}: ${block.error.code}`)
  return parts.join('\n')
}
