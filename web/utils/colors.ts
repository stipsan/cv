import { black, hues, white } from '@sanity/color'
import {
  multiply as _multiply,
  parseColor,
  rgbToHex,
  screen as _screen,
} from '@sanity/ui'

export const lightest = white.hex
export const darkest = black.hex

export const NEUTRAL_TONES = ['default', 'transparent']

export const { blue, cyan, gray, green, magenta, orange, purple, red, yellow } =
  hues
