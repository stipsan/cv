import { type ColorTints, COLOR_TINTS } from '@sanity/color'
import { getColorHex } from 'utils/getColorHex'
import type { Hue, Hues } from 'utils/types'

// https://github.com/sanity-io/design/blob/804bf73dffb1c0ecb1c2e6758135784502768bfe/packages/%40sanity/color/scripts/generate.ts#L42-L58
function createTintsFromHue(hue: Hue, title: string): ColorTints {
  const initial = {} as ColorTints
  const tints = COLOR_TINTS.reduce((acc, tint) => {
    acc[tint] = {
      title: `${title} ${tint}`,
      hex: getColorHex(hue, tint),
    }

    return acc
  }, initial)

  return tints
}

export function createTonesFromHues(hues: Hues): {
  default: ColorTints
  primary: ColorTints
  transparent: ColorTints
  positive: ColorTints
  caution: ColorTints
  critical: ColorTints
} {
  return {
    default: createTintsFromHue(hues.default, 'Default'),
    primary: createTintsFromHue(hues.primary, 'Primary'),
    transparent: createTintsFromHue(hues.transparent, 'Transparent'),
    positive: createTintsFromHue(hues.positive, 'Positive'),
    caution: createTintsFromHue(hues.caution, 'Caution'),
    critical: createTintsFromHue(hues.critical, 'Critical'),
  }
}
