import { withRelatedProject } from '@vercel/related-projects'
import { createClient } from 'next-sanity'

export const studioUrl = withRelatedProject({
  projectName: 'cv-studio',
  defaultHost: 'http://localhost:3333',
})

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-09-11',
  useCdn: true,
  stega: { studioUrl },
})
