import { defineCliConfig } from '@sanity/cli'

console.log(
  'build time',
  process.env.VERCEL_RELATED_PROJECTS,
  process.env.SANITY_STUDIO_VERCEL_RELATED_PROJECTS
)

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  reactStrictMode: true,
  autoUpdates: true,
})
