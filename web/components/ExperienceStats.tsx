import { differenceInYears } from 'date-fns'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import JSLogo from 'public/js.svg'
import NodeLogo from 'public/node.svg'
import ReactLogo from 'public/react.svg'
import { memo } from 'react'

const stats = [
  {
    name: 'React',
    // 2015-01-02
    since: new Date(2015, 0, 2),
    logo: ReactLogo,
  },
  {
    name: 'node.js',
    // 2010-05-01
    since: new Date(2010, 4, 1),
    logo: NodeLogo,
  },
  {
    name: 'JavaScript',
    // 2008-02-01
    since: new Date(2008, 1, 1),
    logo: JSLogo,
  },
]

export default memo(function ExperienceStats({ then }: { then: Date }) {
  const t = useTranslations('ExperienceStats')
  return (
    <section className="my-5 break-inside-avoid py-6">
      <h1 className="mb-3 text-lg font-medium leading-6 text-slate-700">
        {t('title')}
      </h1>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 print:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="group relative overflow-hidden rounded-2xl bg-slate-900 px-4 py-5 sm:p-6 print:p-6"
          >
            <dt className="truncate text-sm font-medium text-slate-400">
              {item.name}
            </dt>
            <Since since={item.since} then={then} />
            <span className="absolute right-4 top-1/2 -translate-y-6 transform-gpu opacity-25 mix-blend-screen transition-opacity group-hover:opacity-100">
              <span className="relative inline-block h-12 w-12">
                <Image src={item.logo} alt="" layout="fill" />
              </span>
            </span>
          </div>
        ))}
      </dl>
    </section>
  )
})

function Since({ since, then }: { since: Date; then: Date }) {
  const t = useTranslations('Since')
  const years = differenceInYears(then, since)

  return (
    <dd className="mt-1">
      {t.rich('label', {
        years: years,
        value: (children) => (
          <span className="text-3xl font-semibold text-slate-100">
            {children}
          </span>
        ),
        unit: (children) => (
          <span className="ml-1 inline-block text-3xl text-slate-400">
            {children}
          </span>
        ),
      })}
    </dd>
  )
}
