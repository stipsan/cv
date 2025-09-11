// In a separate file for now as the package.json files seems to be bundled if this file exists in Footer.tsx
import fs from 'fs'

export async function getStaticProps() {
  const [
    { version: next },
    { version: react },
    { version: tailwind },
    { version: sanity },
  ] = await Promise.all([
    import('next/package.json'),
    import('react/package.json'),
    import('tailwindcss/package.json'),
    import('../node_modules/sanity/package.json'),
  ])

  return { next, react, tailwind, sanity }
}
