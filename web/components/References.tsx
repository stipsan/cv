import type { UnlockProps } from 'web/hooks/useUnlocked'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { memo } from 'react'

export default memo(function References({
  unlocked,
}: Pick<UnlockProps, 'unlocked'>) {
  const t = useTranslations('References')
  return (
    <section className="relative my-5 py-6 print:hidden">
      <h1 className="mb-3 text-lg font-medium leading-6 text-slate-700">
        {t('title')}
      </h1>
      {unlocked?.data?.references ? (
        <ul
          role="list"
          className="mt-5 grid grid-cols-1 gap-2 rounded-3xl bg-slate-100 p-2 sm:grid-cols-2 md:grid-cols-3"
        >
          {unlocked.data.references.map((reference) => (
            <li
              key={reference.company}
              className="flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-white px-4 py-5 transition sm:p-6"
            >
              <figure
                className={
                  reference.company === 'proxy'
                    ? 'mb-4 h-20 w-20 pt-2'
                    : 'h-24 w-24 pt-4'
                }
              >
                <Image src={reference.logo} alt="" height={96} width={96} />
              </figure>
              <h2 className="mt-5 text-lg font-medium text-slate-800">
                {reference.name}
              </h2>
              <p className="mb-1 text-sm font-medium text-slate-700">
                {reference.role}
              </p>
              <a
                className="text-sm text-slate-600 hover:underline focus:underline focus:outline-none"
                href={reference.phoneUrl || `tel:${reference.phone}`}
              >
                {reference.phone}
              </a>
              <a
                className="block w-full truncate text-center text-sm text-slate-600 hover:underline focus:underline focus:outline-none"
                href={`mailto:${reference.email}`}
              >
                {reference.email}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-3xl bg-slate-100 p-2">
          <RedactedLabel />
        </div>
      )}
    </section>
  )
})

function RedactedLabel() {
  const t = useTranslations('UnlockButton')

  return (
    <label
      className="block h-10 cursor-pointer rounded-2xl bg-white px-4 py-2 text-opacity-50 transition-opacity hover:opacity-100"
      htmlFor="unlock-button"
    >
      {t('redacted')}
    </label>
  )
}
