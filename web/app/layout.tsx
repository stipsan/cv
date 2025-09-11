'use cache'

import './globals.css'

import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'

import { SanityLive } from '#sanity/live'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled: isDraftMode } = await draftMode()
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
        {isDraftMode && <SanityLive />}
        {isDraftMode && <VisualEditing />}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
