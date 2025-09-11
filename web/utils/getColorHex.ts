import { mix } from 'polished'
import type { Hue } from 'utils/types'

// https://github.com/sanity-io/design/blob/804bf73dffb1c0ecb1c2e6758135784502768bfe/packages/%40sanity/color/scripts/generate.ts#L18-L58
export function getColorHex(
  hue: Omit<Hue, 'midPoint'> & { title?: string; midPoint: number },
  tint: string
): string {
  const tintNum = Number(tint)
  const midPoint = hue.midPoint || 500
  const darkSize = 1000 - midPoint
  const lightPosition = tintNum / midPoint
  const darkPosition = (tintNum - midPoint) / darkSize

  if (tintNum === midPoint) {
    return hue.mid.toLowerCase()
  }

  // light side of scale: x < midPoint
  if (tintNum < midPoint) {
    return mix(lightPosition, hue.mid, hue.lightest)
  }

  // dark side of scale: x > midPoint
  return mix(darkPosition, hue.darkest, hue.mid)
}
