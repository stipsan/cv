import { github } from '../web/env.config.mjs'

const res = await fetch(
  `https://api.github.com/repos/${github.repository}/actions/workflows/manual.yml/dispatches`,
  {
    method: 'POST',
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `token ${github.token}`,
    },
    body: JSON.stringify({
      ref: github.ref,
      inputs: { name: 'Script' },
    }),
  }
)

if (res.status !== 204) {
  throw new Error(
    `Failed to trigger manual workflow: ${res.status} ${
      res.statusText
    } ${await res.text()}`
  )
}
