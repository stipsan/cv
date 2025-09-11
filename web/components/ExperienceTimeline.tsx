import { IdentificationIcon } from '@heroicons/react/outline'
import cx from 'classnames'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { memo } from 'react'

import { type Experiences } from './ExperienceTimeline.getStaticProps'
import styles from './ExperienceTimeline.module.css'

export default memo(function ExperienceTimeline({
  experiences,
}: {
  experiences: Experiences
}) {
  const t = useTranslations('ExperienceTimeline')

  return (
    <section className="py-6">
      <h1 className="mb-3 text-lg font-medium leading-6 text-slate-700">
        {t('title')}
      </h1>
      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {experiences.map((experience, experienceIdx) => (
            <li key={experience._id} className="break-inside-avoid">
              <div className="relative pb-8">
                {experienceIdx !== experiences.length - 1 ? (
                  <span
                    className="absolute left-6 top-5 -ml-px h-full w-0.5 bg-slate-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-start space-x-3">
                  {experience.type === 'worked' ? (
                    <>
                      <figure
                        className={cx(
                          styles.dropShadowOutline,
                          'flex h-12 w-12 items-center justify-center'
                        )}
                      >
                        <Image
                          src={experience.logo}
                          alt=""
                          loading="eager"
                          height={96}
                          width={96}
                        />
                      </figure>

                      <div className="min-w-0 flex-1">
                        <div>
                          <h2 className="font-medium text-slate-900">
                            {experience.role}
                          </h2>
                          <div className="text-sm">
                            <a
                              href={experience.href}
                              className="font-medium text-slate-900 hover:underline focus:outline-none focus-visible:underline"
                            >
                              {experience.company}
                            </a>
                          </div>
                          <p className="mt-0.5 text-sm text-slate-500">
                            {
                              <>
                                {experience.range ||
                                  t('range', {
                                    start: experience.joined,
                                    end: t('present'),
                                  })}
                                <span className="mx-1">&bull;</span>
                                {experience.duration &&
                                  t('duration', experience.duration)}
                              </>
                            }
                          </p>
                          <p className="mt-0.5 text-sm text-slate-500">
                            <a
                              className="hover:underline focus:outline-none focus-visible:underline"
                              href={experience.mapUrl}
                            >
                              {experience.location}
                            </a>
                            <span className="ml-1 translate-y-[1px] print:hidden">
                              {experience.flag}
                            </span>
                            {experience.remote && (
                              <span className="ml-2 print:hidden">
                                {t('remote')}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : experience.type === 'changed-name' ? (
                    <>
                      <figure
                        className={cx(
                          styles.dropShadowOutline,
                          'flex h-12 w-12 items-center justify-center'
                        )}
                      >
                        <IdentificationIcon className="m-1 w-full rounded-full bg-slate-100 p-2 text-slate-600" />
                      </figure>

                      <div className="min-w-0 flex-1">
                        <div>
                          <h2 className="font-medium text-slate-900">
                            {t('changedName')}
                          </h2>
                          <div className="text-sm">
                            <a
                              href={t('changedNameLink')}
                              className="group font-medium text-slate-900 hover:underline focus:outline-none focus-visible:underline"
                            >
                              {t.rich('changedNameFromTo', {
                                from: experience.from,
                                to: experience.to,
                                del: (children) => (
                                  <span className="line-through decoration-pink-500/50 decoration-2 group-hover:no-underline">
                                    {children}
                                  </span>
                                ),
                                b: (children) => (
                                  <span className="underline decoration-teal-500/50 decoration-2 group-hover:no-underline">
                                    {children}
                                  </span>
                                ),
                              })}
                            </a>
                          </div>
                          <p className="mt-0.5 text-sm text-slate-500">
                            {experience.date}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
})
