import cx from 'classnames'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo } from 'react'

export default memo(function LocaleSwitch({
  displayNames,
}: {
  displayNames: { [key: string]: string[] }
}) {
  const { locale: currentLocale, locales, route, defaultLocale } = useRouter()
  const currentIdx = locales.indexOf(currentLocale)

  return (
    <>
      <Head>
        {locales.map((locale) => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={new URL(
              locale === defaultLocale ? '/' : `/${locale}`,
              'https://cv.creativecody.dev/'
            ).toString()}
          />
        ))}
        <link
          rel="canonical"
          href={new URL(
            currentLocale === defaultLocale ? '/' : `/${currentLocale}`,
            'https://cv.creativecody.dev/'
          ).toString()}
        />
        <meta
          property="og:url"
          content={new URL(
            currentLocale === defaultLocale ? '/' : `/${currentLocale}`,
            'https://cv.creativecody.dev/'
          ).toString()}
        />
      </Head>
      <nav className="inline-flex space-x-1 justify-self-center rounded-lg bg-slate-100 p-0.5 shadow-inner shadow-slate-400/25 transition">
        {locales.map((locale) => (
          <Link
            key={locale}
            className={cx(
              'transform-cpu rounded-[0.4rem] px-3 py-1.5 text-sm font-medium leading-4 ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-400 transition focus:outline-none focus-visible:ring-2 active:scale-95',
              {
                'pointer-events-none bg-white text-slate-600 shadow shadow-slate-500/25':
                  locale === currentLocale,
                'text-slate-500 hover:text-slate-800 active:text-slate-900':
                  locale !== currentLocale,
              }
            )}
            href={route}
            locale={locale}
            prefetch={false}
          >
            {displayNames[locale].map((part, idx) => (
              <span
                key={part}
                className={cx('block text-xs capitalize transition-opacity', {
                  'opacity-60': currentIdx !== idx,
                })}
              >
                {part}
              </span>
            ))}
          </Link>
        ))}
      </nav>
    </>
  )
})
