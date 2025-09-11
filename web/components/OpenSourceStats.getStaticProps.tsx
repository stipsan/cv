// This is in a separate file because next seems to be unable to ensure jsdom isn't loaded unless getStaticProps is called

export async function getStaticProps() {
  const { JSDOM } = await import('jsdom')
  // Numbers fetched Jan 18th
  const defaultCsivWeeklyDownloads = 11558766
  const defaultRsbsStars = 282
  const defaultImDependants = 1621
  const [csivWeeklyDownloads, rsbsStars, imDependants] = await Promise.all([
    fetch(
      'https://api.npmjs.org/downloads/point/last-month/compute-scroll-into-view'
    )
      .then((res) => res.json())
      .then((data) => data.downloads || defaultCsivWeeklyDownloads)
      .catch((err) => {
        console.error(
          'Error while fetching download stats for compute-scroll-into-view',
          err
        )
        // number fetched 14th january 2022
        return defaultCsivWeeklyDownloads
      }),
    fetch('https://api.github.com/repos/stipsan/react-spring-bottom-sheet')
      .then((res) => res.json())
      .then((data) => data.stargazers_count || defaultRsbsStars)
      .catch((err) => {
        console.error(
          'Error while fetching stargazers for react-spring-bottom-sheet',
          err
        )
        return defaultRsbsStars
      }),
    Promise.race([
      fetch('https://github.com/stipsan/ioredis-mock/network/dependents')
        .then((data) => {
          if (!data.ok) {
            throw new Error(`${data.status}: ${data.statusText}`)
          }
          return data.text()
        })
        .then((text) => {
          const dom = new JSDOM(text)
          const dependents = dom.window.document.querySelectorAll(
            `#dependents > div.Box > div.Box-header.clearfix > div > div > a.btn-link.selected`
          )

          return Array.from(dependents).reduce(
            (prev: number, curr: HTMLElement) => {
              const extracted = curr.textContent
                ? parseInt(
                    curr.textContent.trim().split(' ')[0].replace(',', ''),
                    10
                  )
                : 0
              if (extracted > prev) {
                return extracted
              }
              return prev
            },
            0
          )
        })
        .catch((err) => {
          console.error(
            'Error while fetching stargazers for react-spring-bottom-sheet',
            err
          )
          return defaultImDependants
        }),
      new Promise((resolve) =>
        setTimeout(() => resolve(defaultImDependants), 10000)
      ),
    ]),
  ])

  return { csivWeeklyDownloads, rsbsStars, imDependants }
}
