import createSanityClient from '@sanity/client'
import SocialMediaCard from 'components/SocialMediaCard'
import { sanity as sanityConfig } from 'env.config.mjs'
import { useRouter } from 'next/router'
import headshot from 'public/headshot.jpeg'

// @TODO refactor to output as SVG
export default function SocialMediaCardPage({ data }) {
  const router = useRouter()

  return (
    <div
      className="group flex h-screen w-full cursor-pointer items-center justify-center overflow-auto bg-black"
      title="Click to switch locale"
      onClick={() =>
        router.push(router.route, router.route, {
          locale: router.locale === 'en' ? 'no' : 'en',
        })
      }
    >
      <SocialMediaCard
        className="w-[1280px] transform-gpu transition-transform duration-500 active:scale-50"
        eyebrow={data?.eyebrow}
        name={data?.name}
        headshot={headshot}
        pronouns={data?.pronouns}
        role={data?.role}
      />
    </div>
  )
}

export async function getStaticProps({ locale, defaultLocale }) {
  const client = createSanityClient(sanityConfig)
  const data = await client.fetch(
    /* groq */ `
      *[_id == $id][0]{
        profile { name, role, pronouns }
      }
    `,
    { id: locale === defaultLocale ? 'settings' : `settings__i18n_${locale}` }
  )

  return {
    props: {
      data: {
        eyebrow: 'Curriculum Vitae',
        name: data?.profile?.name,
        pronouns: data?.profile?.pronouns,
        role: data?.profile?.role,
      },
    },
  }
}
