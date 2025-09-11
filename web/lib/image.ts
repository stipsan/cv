import createImageUrlBuilder from '@sanity/image-url'

import { sanity as sanityConfig } from '../env.config.mjs'

const { projectId, dataset } = sanityConfig
const imageBuilder = createImageUrlBuilder({ projectId, dataset })
export const urlForImage = (source: Parameters<typeof imageBuilder.image>[0]) =>
  imageBuilder.image(source).auto('format').fit('max')
