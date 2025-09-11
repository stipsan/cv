import type { NextRequest } from 'next/server'

import { github } from '../../../env.config.mjs'

export const config = {
  runtime: 'experimental-edge',
}

const handler = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  if (secret !== process.env.WORKFLOW_DISPATCH_SECRET) {
    return new Response('', {
      status: 403,
    })
  }

  const start = new Date()
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
        inputs: { documentId: searchParams.get('documentId') },
      }),
    }
  )

  if (res.status !== 204) {
    console.log(
      `https://api.github.com/repos/${github.repository}/actions/workflows/manual.yml/dispatches`
    )
    throw new Error(
      `Failed to trigger manual workflow: ${res.status} ${
        res.statusText
      } ${await res.text()}`
    )
  }

  return new Response(
    JSON.stringify({
      message: 'Fired GitHub manual workflow from the Edge! 🎉',
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'server-timing': `fetch;desc="GitHub API Fetch";dur=${
          new Date().getTime() - start.getTime()
        }`,
      },
    }
  )
}

// @TODO @sanity/webhook isn't ready for the edge yet
// @TODO make a is-sanity-webhook-valid package that is edge ready
async function readBody(readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}

export default handler
