import { differenceInYears } from 'date-fns'
import { useIntl, useTranslations } from 'next-intl'
import { memo, useMemo } from 'react'

// 2010-02-18
const firstLibDate = new Date(2010, 1, 18)

type OpenSourceStatsProps = {
  csivWeeklyDownloads: number
  imDependants: number
  rsbsStars: number
  then: Date
}
export default memo(function OpenSourceStats({
  csivWeeklyDownloads,
  imDependants,
  rsbsStars,
  then,
}: OpenSourceStatsProps) {
  const t = useTranslations('OpenSourceStats')
  const intl = useIntl()
  const stats = useMemo(
    () =>
      [
        {
          name: 'im',
          stat: intl.formatNumber(imDependants),
          unit: t('repos'),
          url: 'https://github.com/stipsan/ioredis-mock/network/dependents',
        },
        {
          name: 'csiv',
          stat: intl.formatNumber(csivWeeklyDownloads),
          unit: t('monthly'),
          url: 'https://www.npmjs.com/package/compute-scroll-into-view',
        },
        {
          name: 'first',
          stat: t.rich('firstStat', {
            years: differenceInYears(then, firstLibDate),
            unit: (children) => (
              <span className="ml-0.5 inline-block text-3xl font-normal text-slate-300">
                {children}
              </span>
            ),
          }),
          unit: t('yearsAgo'),
          url: 'https://mootools.net/forge/p/string_inflector',
        },
        {
          name: 'last',
          stat: t.rich('lastStat', {
            stars: rsbsStars,
            unit: (children) => (
              <span className="ml-0.5 inline-block text-3xl font-normal text-slate-300">
                {children}
              </span>
            ),
          }),
          unit: t('lastSubtext'),
          url: 'https://github.com/stipsan/react-spring-bottom-sheet/stargazers',
        },
      ] as const,
    [csivWeeklyDownloads, imDependants, intl, rsbsStars, t, then]
  )
  return (
    <section className="relative my-5 break-inside-avoid py-6">
      <h1 className="mb-3 text-lg font-medium leading-6 text-slate-700">
        {t('title')}
      </h1>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 print:grid-cols-2">
        {stats.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="overflow-hidden rounded-2xl bg-slate-900 px-4 py-5 transition hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800 focus-visible:ring-offset-2 active:scale-95 active:bg-slate-900 active:shadow-slate-500/75 sm:p-6 print:p-6"
          >
            <dt className="truncate text-sm font-medium text-slate-400">
              {t(item.name)}
            </dt>
            <dd className="mt-1">
              <span className="text-3xl font-semibold text-slate-100">
                {item.stat}
              </span>
              <span className="block text-sm text-slate-400">{item.unit}</span>
            </dd>
          </a>
        ))}
      </dl>
    </section>
  )
})
