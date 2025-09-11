import { BadgeCheckIcon, PrinterIcon } from '@heroicons/react/outline'
import { differenceInYears } from 'date-fns'
import type { UnlockProps } from 'web/hooks/useUnlocked'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useIntl, useTranslations } from 'next-intl'
import headshot from 'public/headshot.jpeg'
import { memo } from 'react'

import { RedactedLabel } from './UnlockButton'

const city = 'Oslo'
const email = 'stipsan@gmail.com'
const birthday = new Date('1989-10-07')
const github = 'https://github.com/stipsan'
const linkedin = 'https://linkedin.com/in/stipsan'

export default memo(function ProfileCard({
  unlocked,
  then,
  somecardurl,
  twitter,
}: Pick<UnlockProps, 'unlocked'> & {
  then: Date
  somecardurl: string | null
  twitter: string | null
}) {
  const t = useTranslations('ProfileCard')
  const intl = useIntl()
  const { locale, defaultLocale } = useRouter()

  return (
    <>
      <Head>
        <meta name="description" content={t('metaDescription')} />
        {somecardurl && <meta name="twitter:image:src" content={somecardurl} />}
        <meta name="twitter:image:alt" content={t('twitterImageAlt')} />
        {twitter && <meta name="twitter:site" content={twitter} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('metaTitle')} />
        <meta name="twitter:description" content={t('metaDescription')} />
        <meta property="og:type" content="website" />
        {somecardurl && <meta property="og:image" content={somecardurl} />}
        <meta property="og:title" content={t('metaTitle')} />
        <meta property="og:description" content={t('metaDescription')} />
      </Head>
      <section className="rounded-2xl border border-slate-300 border-opacity-25 bg-slate-50">
        <h1 className="sr-only">{t('title')}</h1>
        <div className="px-6 py-4">
          <div className="sm:flex sm:items-center sm:justify-between print:flex print:items-center print:justify-between">
            <div className="sm:flex sm:space-x-5 print:flex print:space-x-5">
              <div className="flex-shrink-0">
                <a
                  className="relative mx-auto block h-20 w-20 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                  href="/headshot.jpeg"
                  target="_blank"
                >
                  <Image
                    className="rounded-full"
                    src={headshot}
                    alt={t('imageAlt')}
                    priority
                    height={256}
                    width={256}
                    quality={100}
                  />
                  <span className="absolute bottom-0 left-0 right-0 top-0 block rounded-full shadow-[inset_0_0_1px_1px_rgba(30,41,59,0.2)]" />
                </a>
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left print:mt-0 print:pt-1 print:text-left">
                <p className="text-sm font-medium text-slate-600">
                  {t('role')}
                </p>
                <p className="text-xl font-bold text-slate-900 sm:text-2xl print:text-2xl">
                  {t('name')}
                </p>
                <Subheading t={t} then={then} intl={intl} />
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0 print:mt-0">
              <button
                type="button"
                className="inline-flex items-center rounded-lg border border-transparent bg-sky-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-sky-700 hover:shadow-sm hover:shadow-sky-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 active:bg-sky-800 print:hidden"
                onClick={() => window.print()}
              >
                <PrinterIcon
                  className="-ml-1 mr-2 h-5 w-5"
                  aria-hidden="true"
                />
                {t('print')}
              </button>
              <a
                href={new URL(
                  locale === defaultLocale ? '/' : `/${locale}`,
                  'https://cv.creativecody.dev/'
                ).toString()}
                className="hidden items-center rounded-lg border border-transparent bg-slate-100 px-5 py-2 text-sm font-medium text-slate-500 print:inline-flex "
              >
                <BadgeCheckIcon
                  className="-ml-1 mr-2 h-5 w-5"
                  aria-hidden="true"
                />
                {t('latest')}
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 border-opacity-50 px-6 py-4 sm:px-6 print:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-3 print:grid-cols-3">
            <div className="sm:order-0 print:order-0 sm:col-span-1 sm:row-span-2 print:row-span-2">
              <Dt>{t('address')}</Dt>
              <Dd>
                <span className="inline-grid grid-cols-1 gap-1">
                  <span>{unlocked?.data?.street || <RedactedLabel />}</span>
                  <span>
                    {unlocked?.data?.postalCode || <RedactedLabel />} {city}
                  </span>
                  <span>{t('country')}</span>
                </span>
              </Dd>
            </div>
            <div className="sm:order-1 sm:col-span-1 print:order-1 print:col-span-1">
              <Dt>{t('email')}</Dt>
              <Dd>
                <a
                  className="hover:underline focus:underline focus:outline-none"
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
              </Dd>
            </div>
            <div className="sm:order-3 sm:col-span-1 print:order-3 print:col-span-1">
              <Dt>{t('phone')}</Dt>
              <Dd>
                {unlocked?.data?.phone ? (
                  <a
                    className="hover:underline focus:underline focus:outline-none"
                    href={
                      unlocked.data.phoneUrl || `tel:${unlocked.data.phone}`
                    }
                  >
                    {unlocked.data.phone}
                  </a>
                ) : (
                  <RedactedLabel />
                )}
              </Dd>
            </div>
            <div className="sm:order-2 sm:col-span-1 print:order-2 print:col-span-1">
              <Dt>GitHub</Dt>
              <Dd>
                <a
                  className="hover:underline focus:underline focus:outline-none"
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShortUrl url={github} />
                </a>
              </Dd>
            </div>
            <div className="sm:order-4 sm:col-span-1 print:order-4 print:col-span-1">
              <Dt>LinkedIn</Dt>
              <Dd>
                <a
                  className="hover:underline focus:underline focus:outline-none"
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShortUrl url={linkedin} />
                </a>
              </Dd>
            </div>
            <div className="sm:order-5 sm:col-span-3 print:order-5 print:col-span-3">
              <Dt>{t('about')}</Dt>
              <dd
                className="mt-0.5 text-sm text-slate-900"
                dangerouslySetInnerHTML={{ __html: t.raw('profile') }}
              />
            </div>
          </dl>
        </div>
      </section>
    </>
  )
})

const Subheading = memo(function Birthday({
  t,
  intl,
  then,
}: {
  t: ReturnType<typeof useTranslations>
  intl: ReturnType<typeof useIntl>
  then: Date
}) {
  const age = differenceInYears(then, birthday)
  return (
    <p className="text-sm font-medium text-slate-600">
      <span className="block sm:inline print:inline">{t('pronouns')}</span>
      <span className="hidden sm:inline print:inline">{' • '}</span>
      {t.rich('subheading', {
        birthday,
        age,
        b: (children) => <span className="text-slate-900">{children}</span>,
        time: (children) => (
          <time
            dateTime={birthday.toJSON()}
            title={intl.formatDateTime(birthday, { dateStyle: 'full' })}
          >
            {children}
          </time>
        ),
      })}
    </p>
  )
})

function Dt({ children }) {
  return <dt className="text-sm font-medium text-slate-500">{children}</dt>
}

function Dd({ children }) {
  return <dd className="mt-0.5 text-sm text-slate-900">{children}</dd>
}

const ShortUrl = memo(function ShortUrl({ url }: { url: string }) {
  const parsed = new URL(url)

  const parts = parsed.pathname.split('/')
  const handle = parts.pop()

  return (
    <>
      <span className="text-slate-500 transition-colors hover:text-slate-900">{`${
        parsed.hostname
      }${parts.join('/')}/`}</span>
      {handle}
    </>
  )
})
