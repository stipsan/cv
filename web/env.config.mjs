// @ts-check
// Determine useful env vars, fallback to defaults if none are defined

export const github = {
  // @TODO detect the ref
  ref: 'main',
  repository:
    process.env.GITHUB_REPOSITORY ||
    (process.env.VERCEL_GIT_REPO_OWNER &&
      process.env.VERCEL_GIT_REPO_SLUG &&
      `${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}`) ||
    null,
  token:
    process.env.GITHUB_TOKEN || process.env.WORKFLOW_DISPATCH_TOKEN || null,
}

export const sanity = {
  projectId: 'sh40okwp',
  dataset: 'production',
  // Only use the API CDN when in the browser and in production mode
  useCdn:
    typeof document !== 'undefined' && process.env.NODE_ENV === 'production',
  apiVersion: 'v2022-03-13',
  token: process.env.SANITY_API_TOKEN || null,
}
