import nextPackageJson from 'next/package.json'
import reactPackageJson from 'react/package.json'
import sanityPackageJson from 'sanity/package.json'
import tailwindPackageJson from 'tailwindcss/package.json'

import { studioUrl } from '#sanity/client'

const { version: next } = nextPackageJson
const { version: react } = reactPackageJson
const { version: sanity } = sanityPackageJson
const { version: tailwind } = tailwindPackageJson

export default function Footer() {
  // const t = useTranslations('Footer')
  // const intl = useIntl()
  // const { locale, defaultLocale } = useRouter()
  // const buildDate = useMemo(() => new Date(then), [then])
  // const date = useMemo(
  //   () =>
  //     intl.formatDateTime(buildDate, {
  //       dateStyle: 'full',
  //       timeStyle: 'long',
  //     }),
  //   [buildDate, intl]
  // )
  // const generated = useMemo(
  //   () =>
  //     t.rich('generated', {
  //       when: date,
  //       print: (children) => (
  //         <span className="hidden print:inline">{children}</span>
  //       ),
  //       github: (children) => (
  //         <a
  //           className="text-slate-800"
  //           href={new URL(
  //             locale === defaultLocale ? '/' : `/${locale}`,
  //             'https://cv.cocody.dev/'
  //           ).toString()}
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           {children}
  //         </a>
  //       ),
  //       link: (children) => (
  //         <a
  //           className="text-slate-800"
  //           href={new URL(
  //             locale === defaultLocale ? '/' : `/${locale}`,
  //             'https://cv.cocody.dev/'
  //           ).toString()}
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           {children}
  //         </a>
  //       ),
  //       site: 'cv.cocody.dev',
  //     }),
  //   [date, defaultLocale, locale, t]
  // )

  return (
    <footer className="mb-6 mt-5 py-6 text-center text-xs print:mb-0 print:pb-0">
      {/* @TODO Make this appear only when printing, make it work properly */}
      {/* {generated} */}
      <div className="mt-3 grid grid-flow-col justify-center gap-3">
        <Tag name="next" version={next} url="https://nextjs.org/" />
        <Tag name="react" version={react} url="https://reactjs.org/" />
        <Tag name="sanity" version={sanity} url="https://sanity.io/" />
        <Tag
          name="tailwind"
          version={tailwind}
          url="https://tailwindcss.com/"
        />
      </div>
      <a
        className="mt-4 inline-flex items-center justify-center rounded-full border border-transparent bg-blue-600 text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 print:hidden"
        href={studioUrl}
      >
        <svg
          aria-label="Sanity"
          className="inline-block h-8 w-8"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M161.527 136.723C161.527 179.76 187.738 205.443 240.388 219.095L296 232.283C345.687 243.852 376 272.775 376 319.514C376 341.727 369.162 360.931 357.538 375.971C357.538 329.232 333.607 303.78 276.171 288.74L221.47 276.246C177.709 266.065 143.977 242.464 143.977 191.56C143.977 170.505 150.359 151.994 161.527 136.723Z"
            fill="white"
          ></path>
          <path
            opacity="0.5"
            d="M323.35 308.176C347.054 323.679 357.538 345.197 357.538 376.202C337.709 401.654 303.293 416 262.724 416C194.575 416 146.484 381.756 136 322.753H201.641C210.074 350.056 232.41 362.551 262.268 362.551C298.735 362.32 322.895 342.652 323.35 308.176Z"
            fill="white"
          ></path>
          <path
            opacity="0.5"
            d="M195.715 200.816C172.923 186.007 161.527 165.183 161.527 136.954C180.672 111.503 213.493 96 253.835 96C323.35 96 363.692 133.252 373.721 185.776H310.359C303.293 165.183 285.971 148.986 254.291 148.986C220.33 148.986 197.311 169.116 195.715 200.816Z"
            fill="white"
          ></path>
        </svg>
      </a>
    </footer>
  )
}

// const RelativeWhen = ({
//   date,
//   intl,
//   dateJson,
//   dateAbsolute,
// }: {
//   date: Date
//   intl: ReturnType<typeof useIntl>
//   dateJson: string
//   dateAbsolute: string
// }) => {
//   const now = useNow({ updateInterval: 1000 })
//   const relativeWhen = intl.formatRelativeTime(date, now)
//   // Get the string used for "now", as we are skipping it
//   const nowText = useMemo(
//     () => intl.formatRelativeTime(new Date(), new Date()),
//     [intl]
//   )

//   return (
//     <a
//       className="hover:underline focus:underline focus:outline-none print:hidden"
//       href="https://github.com/stipsan/cv.cocody.dev"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       <time dateTime={dateJson} title={dateAbsolute}>
//         {nowText !== relativeWhen ? relativeWhen : dateAbsolute}
//       </time>
//     </a>
//   )
// }

function Tag({
  name,
  version,
  url,
}: {
  name: string
  version: string
  url: string
}) {
  return (
    <a
      className="block overflow-hidden rounded bg-slate-900 text-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-800 focus-visible:ring-offset-2"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="inline-block px-2 py-1">{name}</span>
      <span className="inline-block rounded-r bg-cyan-700 px-2 py-1 text-slate-50">
        v{version.split('.')[0]}
      </span>
    </a>
  )
}
