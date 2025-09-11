import Cryptr from 'cryptr'
import type { Unlocked } from 'web/hooks/useUnlocked'
import { sanityClient } from 'lib/sanity.server'
import parsePhoneNumber from 'libphonenumber-js'
import type { NextApiRequest, NextApiResponse } from 'next'

import encrypted from '../../../encrypted.json'

type Data = Unlocked | { error: string }

const logosQuery = /* groq */ `*[_type == 'company' && slug.current in $companies]{"slug": slug.current, ...logo.asset->{
  "src": url,
  "height": metadata.dimensions.height,
  "width": metadata.dimensions.width
}}`

/*
export const config = {
  runtime: 'experimental-edge',
}
// */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== 'POST') {
      return res.status(404).json({ error: 'Method not allowed' })
    }
    const { password } = req.body
    if (!password.trim()) {
      return res.status(400).json({ error: 'Password is required' })
    }
    if (!process.env.CRYPTR) {
      console.error('CRYPTR environment variable is not set')
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    try {
      const cryptr = new Cryptr(process.env.CRYPTR)
      try {
        const users = JSON.parse(cryptr.decrypt(encrypted.users))
        if (!(password in users)) {
          return res.status(401).json({ error: 'Password is incorrect' })
        }
        const user = users[password]
        try {
          const data = JSON.parse(cryptr.decrypt(encrypted.data))
          if (data.phone) {
            const phoneNumber = parsePhoneNumber(data.phone)
            data.phoneUrl = phoneNumber.getURI()
            data.phone = phoneNumber.formatInternational()
          }
          if (data.references) {
            const companies = data.references.reduce(
              (companies, reference) => companies.concat(reference.company),
              []
            )
            const logos =
              (await sanityClient.fetch(logosQuery, { companies })) || []
            const logosMap = logos.reduce(
              (acc, { slug, ...logo }) => Object.assign(acc, { [slug]: logo }),
              {}
            )
            data.references.forEach((reference) => {
              if (reference.phone) {
                const phoneNumber = parsePhoneNumber(reference.phone)
                reference.phoneUrl = phoneNumber.getURI()
                reference.phone = phoneNumber.formatInternational()
              }
              if (reference.company in logosMap) {
                reference.logo = logosMap[reference.company]
              }
            })
          }

          return res.status(200).json({ user, data })
        } catch (err) {
          console.error('Failed to decrypt data json', err)
          return res.status(500).json({ error: 'Internal Server Error' })
        }
      } catch (err) {
        console.error('Failed to decrypt users json', err)
        return res.status(500).json({ error: 'Internal Server Error' })
      }
    } catch (err) {
      console.error('Failed to init Cryptr', err)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  } catch (err) {
    console.error('Fatal error in handler', err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
