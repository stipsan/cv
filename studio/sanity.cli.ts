import { defineCliConfig } from '@sanity/cli'
import { withRelatedProject } from '@vercel/related-projects'

const webUrl = withRelatedProject({
  projectName: 'cv-web',
  defaultHost: 'http://localhost:3000',
})

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  autoUpdates: true,
  reactStrictMode: true,
  reactCompiler: { target: '19' },
  vite: {
    define: {
      __WEB_URL__: JSON.stringify(webUrl),
    },
  },
})
