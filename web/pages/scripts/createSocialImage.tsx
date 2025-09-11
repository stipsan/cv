// Debug the React component that Puppeteer is rendering in scripts/createSocualImage.ts

import createSanityClient from '@sanity/client'
import SocialMediaCard from 'components/SocialMediaCard'
import { sanity as sanityConfig } from 'env.config.mjs'
import { urlForImage } from 'lib/image'

// @TODO refactor to output as SVG
export default function CreateSocialImagePage({ data }) {
  return (
    <SocialMediaCard
      className="w-full"
      eyebrow={data?.eyebrow}
      name={data?.name}
      headshot={data?.headshot}
      pronouns={data?.pronouns}
      role={data?.role}
    />
  )
}

export async function getServerSideProps({ req, locale, defaultLocale }) {
  const { searchParams } = new URL(req.url, 'https://example.com')
  const secret = searchParams.get('secret')
  if (secret !== process.env.WORKFLOW_DISPATCH_SECRET) {
    throw new Error('Invalid secret')
  }

  const client = createSanityClient(sanityConfig)
  const data = await client.fetch(
    /* groq */ `
      *[_id == $id][0]{
        social {
          "headshot": headshot.asset->{
            "src": url,
            "height": metadata.dimensions.height,
            "width": metadata.dimensions.width
          },
          eyebrow,
          name,
          role,
          pronouns,
        }
      }
    `,
    { id: locale === defaultLocale ? 'settings' : `settings__i18n_${locale}` }
  )
  if (data?.social?.headshot?.src) {
    data.social.headshot.src = urlForImage(data.social.headshot.src)
      .height(256)
      .width(256)
      .fit('crop')
      .url()
  }

  return {
    props: {
      data: {
        eyebrow: data?.social?.eyebrow || 'settings.social.eyebrow',
        name: data?.social?.name || 'settings.social.name',
        pronouns: data?.social?.pronouns || 'settings.social.pronouns',
        role: data?.social?.role || 'settings.social.role',
        headshot: data?.social?.headshot || {
          src: 'https://source.unsplash.com/256x256/?face',
          width: 256,
          height: 256,
        },
      },
    },
  }
}
