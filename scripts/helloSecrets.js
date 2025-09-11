// @ts-check

// This weird || dance is to make TypeScript happy as there is a bug in the type defs
const createSanityClient =
  require('@sanity/client')?.default || require('@sanity/client')

async function main({ argv }) {
  // @TODO use argv to maybe
  // - run: node scripts/helloSecrets ${{ github.event.inputs.documentId }}
  // just so it's easier to reuse
  // maybe use https://github.com/vercel/arg to parse the args
  const { sanity: sanityConfig } = await import('../web/env.config.mjs')

  const { projectId, dataset, apiVersion, useCdn, token } = sanityConfig

  if (!token) {
    throw new TypeError(`Missing SANITY_API_TOKEN`)
  }

  const client = createSanityClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    token,
  })

  const data = await client.fetch(/* groq */ `*[_id == "private.secrets"][0]{
      _id,
      hello,
    }`)
  console.log(data)

  if (!data?._id) {
    throw new Error('Missing _id!')
  }

  if (data?.hello === 'Edge') {
    console.log(
      'Skipping, as "hello" is already "Edge" in the published document'
    )
    return 0
  }

  const writeToken = process.env.SANITY_API_WRITE_TOKEN
  if (!writeToken) {
    throw new TypeError(`Missing SANITY_API_WRITE_TOKEN`)
  }
  const writeClient = client.withConfig({ token: writeToken })

  console.log(`Patching ${data._id} with "hello": "Edge"`)
  await writeClient.patch(data._id).set({ hello: 'Edge' }).commit()
  console.log('Done!')

  return 0
}

main(process)
  .then(process.exit)
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
