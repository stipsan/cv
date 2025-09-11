import * as snippet from '@segment/snippet'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect, useMemo } from 'react'

export default function SegmentSnippet() {
  const router = useRouter()

  const script = useMemo(() => {
    const opts = {
      apiKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY,
      // note: the page option only covers SSR tracking.
      // Page.js is used to track other events using `window.analytics.page()`
      page: true,
    }

    if (process.env.NODE_ENV === 'development') {
      return snippet.max(opts)
    }

    return snippet.min(opts)
  }, [])

  useEffect(() => {
    const handleRouteChange = (url) => {
      // @ts-expect-error window.analytics not defined
      window.analytics.page(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <Script id="segment-script" dangerouslySetInnerHTML={{ __html: script }} />
  )
}
