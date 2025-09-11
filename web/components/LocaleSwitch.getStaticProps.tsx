// Done in a separate file until nextjs gets better at stripping SSR code from the bundle

export async function getStaticProps({ locales }: { locales: string[] }) {
  const displayNames = locales.reduce((acc, locale) => {
    return {
      ...acc,
      [locale]: locales.reduce((names, language) => {
        const displayName = new Intl.DisplayNames([language], {
          type: 'language',
        })
        return names.concat(displayName.of(locale))
      }, []),
    }
  }, {})

  return { displayNames }
}
