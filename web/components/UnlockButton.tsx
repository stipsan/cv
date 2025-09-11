import { MailIcon, SparklesIcon } from '@heroicons/react/outline'
import {
  CheckIcon,
  LockClosedIcon,
  LockOpenIcon,
  XCircleIcon,
} from '@heroicons/react/solid'
import cx from 'classnames'
import type { UnlockProps } from 'web/hooks/useUnlocked'
import { useTranslations } from 'next-intl'
import { memo, useRef, useState } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'

import styles from './UnlockButton.module.css'

export default memo(function UnlockButton({
  unlock,
  error,
  setError,
  loading,
  unlocked,
}: Pick<
  UnlockProps,
  'unlock' | 'error' | 'setError' | 'loading' | 'unlocked'
>) {
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState('')
  const focusRef = useRef()
  const t = useTranslations('UnlockButton')

  return (
    <div className="ml-6 w-40 sm:ml-7">
      <div className="group w-0">
        <button
          id="unlock-button"
          type="button"
          className={cx(
            'group relative flex items-center justify-center whitespace-nowrap rounded-lg border border-cyan-200/50 bg-cyan-100 px-4 py-1 text-sm text-cyan-700 shadow shadow-cyan-100/50 focus:outline-none ',
            {
              'transform-gpu transition hover:animate-bounce group-hover:scale-110 group-hover:animate-none':
                !unlocked,
              'hover:border-cyan-300/50 hover:bg-cyan-200 hover:text-cyan-800 hover:shadow-cyan-100/75 focus:scale-110 focus:border-cyan-400/50 focus:text-cyan-900 focus:shadow-cyan-100/0 active:border-cyan-400/50 active:bg-cyan-300 active:text-cyan-900 active:shadow-cyan-100/0':
                !unlocked,
              'cursor-default opacity-60': unlocked,
            }
          )}
          onClick={unlocked ? undefined : () => setOpen(true)}
        >
          {unlocked ? (
            <LockOpenIcon className="-ml-0.5 mr-1.5 h-4" />
          ) : (
            <>
              {!open && (
                <div className="pointer-events-none absolute bottom-0.5 left-3.5 right-3.5 top-0.5 z-[-1] animate-ping rounded-lg bg-cyan-100 transition-colors group-hover:animate-none group-hover:bg-opacity-0 group-focus:animate-none group-focus:bg-opacity-0 group-active:animate-none group-active:bg-opacity-0" />
              )}
              <LockClosedIcon className="-ml-0.5 mr-1.5 h-4" />
            </>
          )}
          {unlocked ? t('unlocked') : t('unlock')}
        </button>
      </div>
      <BottomSheet
        className={styles.custom}
        open={open}
        initialFocusRef={focusRef}
        onDismiss={loading || unlocked ? undefined : () => setOpen(false)}
        onSpringStart={(event) => {
          if (event.type === 'CLOSE') {
            window.scrollTo(0, 0)
          }
        }}
        onSpringEnd={(event) => {
          if (event.type === 'CLOSE') {
            setPassword('')
            setError(null)
          }
        }}
      >
        {unlocked ? (
          <div className="px-4 pb-4 pt-4">
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <SparklesIcon
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    {t('welcome', { user: unlocked.user })}
                  </h3>
                </div>
              </div>
            </div>
            <p className="mt-4 text-slate-800">{t('unlockedHelp')}</p>
            <button
              onClick={() => setOpen(false)}
              type="button"
              className={cx(
                'mt-4 inline-flex w-full items-center justify-center rounded-lg border border-transparent bg-cyan-600 px-5 py-2 text-sm font-medium text-white transition focus:outline-none',
                {
                  'cursor-progress opacity-50': loading,
                  'hover:bg-cyan-700 hover:shadow-sm hover:shadow-cyan-100 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:bg-cyan-800':
                    !loading,
                }
              )}
            >
              <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              {t('ok')}
            </button>
          </div>
        ) : (
          <form
            className="px-4 pb-4 pt-4"
            onSubmit={(event) => {
              event.preventDefault()
              if (!loading) {
                unlock(password)
              }
            }}
          >
            <p className="text-slate-800">{t('help')}</p>
            <p className="mt-4 text-slate-800">
              {t.rich('noPassword', {
                link: (children) => (
                  <a
                    className="hover:underline"
                    href="mailto:stipsan@gmail.com?subject=Requesting%20CV%20Password"
                  >
                    {children}
                    <MailIcon className="-mt-1 ml-0.5 inline h-5 text-inherit" />
                  </a>
                ),
              })}
            </p>

            <input
              required
              ref={focusRef}
              type="password"
              readOnly={loading}
              className={cx(
                'form-input mt-4 block w-full rounded-md border-slate-300 shadow-sm shadow-slate-400/25 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm',
                {
                  'animate-pulse': loading,
                  'animate-[shake_1s_ease-in-out]':
                    !loading &&
                    password &&
                    (error === 'Password is incorrect' ||
                      error === 'Password is required'),
                }
              )}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {error && (
              <div className="mt-4 rounded-md bg-red-100 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-900">
                      {error === 'Password is required'
                        ? t('passwordRequired')
                        : error === 'Password is incorrect'
                        ? t('passwordIncorrect')
                        : error}
                    </h3>
                  </div>
                </div>
              </div>
            )}
            <button
              type="submit"
              className={cx(
                'mt-4 inline-flex w-full items-center justify-center rounded-lg border border-transparent bg-cyan-600 px-5 py-2 text-sm font-medium text-white transition focus:outline-none',
                {
                  'cursor-progress opacity-50': loading,
                  'hover:bg-cyan-700 hover:shadow-sm hover:shadow-cyan-100 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:bg-cyan-800':
                    !loading,
                }
              )}
            >
              {loading ? (
                <svg
                  className="-ml-1 mr-2 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <LockOpenIcon
                  className="-ml-1 mr-2 h-5 w-5"
                  aria-hidden="true"
                />
              )}

              {loading ? t('unlocking') : t('submit')}
            </button>
          </form>
        )}
      </BottomSheet>
    </div>
  )
})

export function RedactedLabel() {
  const t = useTranslations('UnlockButton')

  return (
    <label
      className="cursor-pointer opacity-50 transition-opacity hover:opacity-100"
      htmlFor="unlock-button"
    >
      {t('redacted')}
    </label>
  )
}
