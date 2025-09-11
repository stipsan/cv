'use cache'

import './globals.css'

import SanityLiveClientComponent from '@sanity/next-loader/client-components/live'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { unstable_expireTag as expireTag } from 'next/cache'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'

import { client } from '#sanity/client'
// import { SanityLive } from '#sanity/live'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled: isDraftMode } = await draftMode()
  const { projectId, dataset, apiHost, apiVersion, useProjectHostname } =
    client.config()
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#fff" />
        <meta
          name="theme-color"
          content="#0f172a"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body className="print:[zoom:75%]">
        {children}
        {isDraftMode && (
          <SanityLiveClientComponent
            revalidateSyncTags={async (tags) => {
              'use server'
              if (!(await draftMode()).isEnabled) {
                console.error(
                  '<SanityLive /> Draft mode is not enabled, skipping revalidation',
                  tags
                )
                return
              }
              expireTag(...tags)
              console.log(`<SanityLive /> expired tags: ${tags.join(', ')}`)
            }}
            projectId={projectId}
            dataset={dataset}
            apiHost={apiHost}
            apiVersion={apiVersion}
            useProjectHostname={useProjectHostname}
            requestTag={undefined}
            token={isDraftMode ? process.env.SANITY_API_TOKEN : undefined}
            draftModeEnabled={isDraftMode}
            draftModePerspective="drafts"
          />
        )}
        {isDraftMode && <VisualEditing />}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
