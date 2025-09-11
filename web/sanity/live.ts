import { defineLive } from 'next-sanity/live'

import { client } from './client'

const token = process.env.SANITY_API_TOKEN

export const { SanityLive, sanityFetch: sanityLiveFetch } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
})
