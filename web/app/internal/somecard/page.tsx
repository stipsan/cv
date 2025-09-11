'use cache'

import SocialMediaCard from '#components/SocialMediaCard'
import { sanityFetch } from '#sanity/live'

import headshot from '../../../public/headshot.jpeg'

// @TODO refactor to output as SVG
export default async function SocialMediaCardPage() {
  const { data } = await sanityFetch({
    query: `*[_id == $id][0]{
      profile { name, role, pronouns }
    }`,
    params: { id: 'settings' },
    // { id: locale === defaultLocale ? 'settings' : `settings__i18n_${locale}` }
  })
  return (
    <div
      className="group flex h-screen w-full cursor-pointer items-center justify-center overflow-auto bg-black"
      // title="Click to switch locale"
      // onClick={() =>
      //   router.push(router.route, router.route, {
      //     locale: router.locale === 'en' ? 'no' : 'en',
      //   })
      // }
    >
      <SocialMediaCard
        className="w-[1280px] transform-gpu transition-transform duration-500 active:scale-50"
        eyebrow={(data as any)?.eyebrow ?? 'Curriculum Vitae'}
        name={(data as any)?.profile?.name}
        headshot={headshot}
        pronouns={(data as any)?.profile?.pronouns}
        role={(data as any)?.profile?.role}
      />
    </div>
  )
}
