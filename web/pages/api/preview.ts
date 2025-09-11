import { createClient } from '@sanity/client'
import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { sanity as sanityConfig } from 'env.config.mjs'
import type { NextApiRequest, NextApiResponse } from 'next'

const client = createClient(sanityConfig)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | void>
) {
  if (!req.url) {
    throw new Error('Missing url')
  }
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    client,
    req.url
  )
  if (!isValid) {
    return res.status(401).send('Invalid secret')
  }
  // Enable Draft Mode by setting the cookies
  res.setPreviewData({})
  res.writeHead(307, { Location: redirectTo })
  res.end()
}
