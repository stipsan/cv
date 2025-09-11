import type { PartialDeep } from 'type-fest'
import { darkest, lightest } from 'utils/colors'
import type { Hues } from 'utils/types'

export function applyHues(hues: PartialDeep<Hues>): Hues {
  return {
    default: {
      lightest,
      darkest,
      mid: '#8690A0',
      midPoint: 500,
      ...hues.default,
    },
    primary: {
      lightest,
      darkest,
      mid: '#2276FC',
      midPoint: 500,
      ...hues.primary,
    },
    transparent: {
      lightest,
      darkest,
      mid: '#8690A0',
      midPoint: 500,
      ...hues.transparent,
    },
    positive: {
      lightest,
      darkest,
      mid: '#43D675',
      midPoint: 400,
      ...hues.positive,
    },
    caution: {
      lightest,
      darkest,
      mid: '#FBD024',
      midPoint: 300,
      ...hues.caution,
    },
    critical: {
      lightest,
      darkest,
      mid: '#F03E2F',
      midPoint: 500,
      ...hues.critical,
    },
  }
}
