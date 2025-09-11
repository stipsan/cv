import 'tailwindcss/tailwind.css'
import 'react-spring-bottom-sheet/dist/style.css'
import '../style.css'

import { VisualEditing } from '@sanity/visual-editing/next-pages-router'
// import { SpeedInsights } from '@vercel/speed-insights/next'
import CounterSnippet from 'components/CounterSnippet'
import { NextIntlProvider } from 'next-intl'
import { Toaster } from 'react-hot-toast'

function App({ Component, pageProps }) {
  return (
    <NextIntlProvider
      messages={pageProps.messages}
      now={new Date(pageProps.now)}
      timeZone="Europe/Oslo"
    >
      <Toaster containerClassName="print:hidden" />
      {process.env.NEXT_PUBLIC_COUNTER_DEV && <CounterSnippet />}
      <Component {...pageProps} />
      {pageProps.preview && <VisualEditing />}
      {/* <SpeedInsights /> */}
    </NextIntlProvider>
  )
}

export default App
