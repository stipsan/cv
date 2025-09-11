import Image from 'next/image'

interface Props {
  className?: string
  eyebrow: string
  name: string
  pronouns: string
  role: string
  headshot?: {
    src: string
    height: number
    width: number
  }
}
export default function SocialMediaCard({
  className = '',
  eyebrow,
  name,
  pronouns,
  role,
  headshot,
}: Props) {
  return (
    <div
      // Should look good at 500px width, scale(0.4)
      className={`${className} flex aspect-[1280/640] flex-shrink-0 items-center justify-center`}
      style={{
        // First bg concept https://www.joshwcomeau.com/gradient-generator?colors=0990a7|63f2e3|000000&angle=135&colorMode=hcl&precision=15&easingCurve=1.1|1|-0.1|0
        // Remade version uses: bg-cyan-600, bg-cyan-100, bg-cyan-300, bg-cyan-900, bg-black
        // https://www.joshwcomeau.com/gradient-generator?colors=0891b2|cffafe|67e8f9|164e63|000000&angle=135&colorMode=hcl&precision=20&easingCurve=1.1|1|-0.1|0
        backgroundImage: `linear-gradient(
          135deg,
          hsl(192deg 91% 36%) 1%,
          hsl(193deg 49% 50%) 31%,
          hsl(192deg 49% 58%) 39%,
          hsl(191deg 51% 66%) 44%,
          hsl(189deg 56% 74%) 47%,
          hsl(187deg 66% 82%) 49%,
          hsl(185deg 96% 90%) 50%,
          hsl(186deg 93% 87%) 51%,
          hsl(186deg 92% 84%) 51%,
          hsl(186deg 91% 81%) 51%,
          hsl(187deg 91% 77%) 51%,
          hsl(187deg 92% 73%) 50%,
          hsl(187deg 92% 69%) 50%,
          hsl(189deg 69% 61%) 50%,
          hsl(191deg 53% 53%) 49%,
          hsl(192deg 49% 46%) 49%,
          hsl(194deg 53% 38%) 49%,
          hsl(195deg 57% 31%) 49%,
          hsl(196deg 64% 24%) 50%,
          hsl(194deg 98% 17%) 51%,
          hsl(196deg 100% 15%) 53%,
          hsl(198deg 100% 12%) 56%,
          hsl(202deg 100% 10%) 61%,
          hsl(205deg 100% 8%) 69%,
          hsl(0deg 0% 0%) 99%
        )`,
      }}
      onClick={(event) => event.stopPropagation()}
    >
      <article
        className="flex items-center space-x-5 rounded-full bg-black/50 p-10 backdrop-blur-xl backdrop-saturate-200"
        style={{ contain: 'layout paint style' }}
      >
        {headshot?.src && (
          <div className="relative mx-auto block h-64 w-64 flex-shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2">
            <Image
              className="rounded-full "
              src={headshot}
              alt=""
              priority
              height={256}
              width={256}
            />
            <span className="absolute bottom-0 left-0 right-0 top-0 block rounded-full bg-cyan-700 opacity-70 mix-blend-screen" />
          </div>
        )}
        <div className="flex flex-col pl-6 pr-12 text-4xl font-medium leading-10 text-cyan-100">
          <div className="bg-gradient-to-r from-sky-100 to-teal-200 bg-clip-text text-transparent">
            {eyebrow}
          </div>
          <div className="bg-gradient-to-r from-sky-100 to-teal-400 bg-clip-text pb-6 pt-3 text-9xl font-bold text-transparent">
            {name}
          </div>
          <div className="bg-gradient-to-r from-sky-100 to-teal-400 bg-clip-text text-transparent">
            {pronouns} • {role}
          </div>
        </div>
      </article>
    </div>
  )
}
