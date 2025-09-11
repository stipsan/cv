'use cache'

import Footer from '#components/Footer'

export default async function Index() {
  return (
    <>
      <div className="h-1 bg-gradient-to-r from-teal-400 to-blue-600" />
      <main className="mx-auto max-w-[21cm] px-4 pt-4 font-sans text-slate-600 antialiased sm:px-6 sm:pt-5 lg:px-8 print:px-10 print:pt-5">
        <div className="flex items-center justify-start pb-4 sm:pb-5 print:hidden">
          {/* <LocaleSwitch displayNames={displayNames} />
          <UnlockButton
            error={error}
            setError={setError}
            loading={loading}
            unlock={unlock}
            unlocked={unlocked}
          /> */}
        </div>
        {/* <ProfileCard
          unlocked={unlocked}
          then={then}
          twitter={data?.meta?.twitter || null}
          somecardurl={
            data?.social?.image?.asset?._ref
              ? urlForImage(data.social.image.asset._ref)
                  .height(640)
                  .width(1280)
                  .fit('crop')
                  .url()
              : null
          }
        />
        <ExperienceStats then={then} />
        <ExperienceTimeline experiences={experiences} />
        <OpenSourceStats
          csivWeeklyDownloads={csivWeeklyDownloads}
          imDependants={imDependants}
          rsbsStars={rsbsStars}
          then={then}
        />
        <References unlocked={unlocked} />
        <Education />
         */}
        <Footer />
      </main>
    </>
  )
}
