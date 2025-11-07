import Image from 'next/image'
import Parser from 'rss-parser'
import Avatar from '@/components/Avatar'

type Episode = {
  title: string
  date: string | null
  snippet: string
  audio: string | null
  link: string
}

async function getLatest(): Promise<Episode[]> {
  const url = process.env.PODCAST_RSS_URL!
  const parser = new Parser({ headers: { 'user-agent': 'IdioterMedComputere/1.0' } })
  const feed = await parser.parseURL(url)
  return (feed.items ?? []).slice(0, 3).map((it: any) => ({
    title: it.title ?? 'Uden titel',
    date: it.isoDate ?? it.pubDate ?? null,
    snippet: String((it.contentSnippet ?? it.content ?? '').replace(/<[^>]+>/g, '')).slice(0, 180),
    audio: it.enclosure?.url ?? null,
    link: it.link ?? '#',
  }))
}

export default async function HomePage() {
  const latest = await getLatest()

  return (
    <div className="bg-[--bg] text-[--text]">
      {/* Hero */}
      <section className="relative w-full">
        <div className="relative w-full min-h-[42svh] md:min-h-[49svh] overflow-hidden">
          <Image src="/images/cover.png" alt="Idioter med computere cover" fill priority sizes="100vw" className="object-cover" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6 max-w-4xl">
              <h1 className="font-display tracking-wide text-4xl md:text-6xl uppercase">Idioter med computere</h1>
              <p className="text-white mt-3 text-[--text-dim] text-lg md:text-xl">En brevkassepodcast om alt det der går galt mellem mennesker og maskiner</p>
              <a href="/subscribe" className="mt-8 inline-flex items-center justify-center bg-[--accent] text-white font-display font-bold uppercase rounded-2xl px-10 py-5 text-2xl shadow-[0_0_40px_rgba(155,93,229,0.4)] hover:ring-2 hover:ring-[--accent]" aria-label="Abonnér på Idioter med computere">Abonnér</a>
            </div>
          </div>
        </div>
      </section>

        {/* Intro - quote section */}
        <section className="relative w-full bg-gradient-to-b from-[#101010] to-[#080808] border-t-[3px] border-[--accent] py-28 overflow-hidden">
            {/* top & bottom gradient overlays */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[60px] bg-gradient-to-b from-[#101010] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60px] bg-gradient-to-t from-[#101010] to-transparent" />

            <div className="page max-w-4xl mx-auto text-left text-white leading-relaxed relative z-10">
                <h2 className="font-display text-2xl md:text-3xl tracking-wide">
                    En podcast om teknologi i virkeligheden: om hvordan den bliver til, hvordan den bliver brugt og hvordan den indimellem går i ged.
                </h2>
                <div className="w-24 h-[3px] bg-[--accent] mt-3 mb-8"></div>
                <p className="text-[--text-dim] text-lg md:text-xl font-medium">
                    Vi tager dig med i maskinrummet og taler om teknologi som håndværk, om hvad der egentlig sker, når digital teknologi bygges, og hvorfor den nogle gange fejler, selv når intentionerne er gode.
                </p>
                <p className="mt-8 text-[--text-dim] text-base md:text-lg font-semibold tracking-wide">
                    Idioter med computere er en podcast fra to mennesker, der bygger teknologi professionelt og taler ærligt om, hvordan det ser ud indefra.
                </p>
            </div>
        </section>

        {/* Latest Episodes */}
        <section className="relative w-full bg-[#080808] py-16 mt-8 overflow-hidden">
            {/* top & bottom gradient overlays */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[60px] bg-gradient-to-b from-[#101010] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60px] bg-gradient-to-t from-[#101010] to-transparent" />

            <div className="page space-y-10 relative z-10">
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="font-display text-xl tracking-wide">SENESTE EPISODER</h2>
                        <div className="w-24 h-[3px] bg-[--accent] mt-2"></div>
                    </div>
                    <a href="/episodes" className="text-[--text-dim] hover:text-white transition-colors">
                        Se alle episoder
                    </a>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {latest.map((ep) => (
                        <article
                            key={ep.link}
                            className="group relative overflow-hidden rounded-xl bg-[#1a1a1a] border border-white/10 hover:border-[--accent]/50 transition"
                        >
                            <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[--accent] to-transparent opacity-70" />
                            <div className="p-6">
                                <h3 className="font-display text-lg text-white leading-tight">
                                    {ep.title}
                                </h3>
                                <p className="text-[--text-dim] text-xs mt-1 uppercase tracking-wide">
                                    {ep.date ? new Date(ep.date).toLocaleDateString('da-DK') : ''}
                                </p>
                                <p className="mt-4 text-[--text] text-sm leading-relaxed line-clamp-3">
                                    {ep.snippet}
                                    {ep.snippet && ep.snippet.length === 180 ? '…' : ''}
                                </p>
                                <div className="mt-5">
                                    <a
                                        href={ep.audio || ep.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-sm hover:border-[--accent] hover:text-[--accent] transition"
                                    >
                                        Lyt nu
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>

        {/* Brevkasse Callout */}
        <section className="relative w-full bg-[#080808] py-16 mt-8 overflow-hidden">
            {/* top & bottom gradient overlays */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[60px] bg-gradient-to-b from-[#101010] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60px] bg-gradient-to-t from-[#101010] to-transparent" />

            <div className="page relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <div className="w-24 h-[3px] bg-[--accent] mx-auto mb-6 opacity-80"></div>
                    <p className="text-[--text] text-lg md:text-xl leading-relaxed">
                        Har du selv oplevet idiotiske ting med computere?
                        Skriv til os – måske tager vi dit brev med i podcasten.
                    </p>
                    <a
                        href="/brevkasse"
                        className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-base font-semibold hover:border-[--accent] hover:text-[--accent] hover:shadow-[0_0_25px_rgba(155,93,229,0.25)] transition"
                    >
                        Skriv til os
                    </a>
                </div>
            </div>
        </section>


        {/* Teamet bag */}
        <section className="relative w-full bg-[#080808] py-20 mt-8 overflow-hidden">
            {/* top & bottom gradient overlays */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[60px] bg-gradient-to-b from-[#101010] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60px] bg-gradient-to-t from-[#101010] to-transparent" />

            <div className="page relative z-10">
                {/* Sektionstitel */}
                <div className="mb-10">
                    <h2 className="font-display text-xl tracking-wide">TEAMET BAG</h2>
                    <div className="w-24 h-[3px] bg-[--accent] mt-2"></div>
                </div>

                {/* Grid med medlemmer */}
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Magnus */}
                    <div className="group relative overflow-hidden rounded-xl bg-[#1a1a1a] border border-white/10 hover:border-[--accent]/40 transition">
                        {/* top accent-glød */}
                        <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[--accent] to-transparent opacity-70" />
                        <div className="p-6 md:p-8 flex gap-4 items-start">
                            <Avatar
                                src="/team/magnus.jpg"
                                alt="Magnus Høholt Kaspersen"
                                initials="M"
                                className="size-28 flex-shrink-0"
                            />
                            <div>
                                <h3 className="font-display text-white text-lg leading-tight">
                                    Magnus Høholt Kaspersen
                                </h3>
                                <p className="text-[--text-dim] mt-1">
                                    Partner & CTO i Creative Oak. Ekspert i AI og uddannelse. Adjunkt på Aarhus Tech.
                                </p>
                                <p className="mt-2 text-[--text-dim]">
                                    Bringer de store linjer og det menneskelige perspektiv ind i samtalerne.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Daniel */}
                    <div className="group relative overflow-hidden rounded-xl bg-[#1a1a1a] border border-white/10 hover:border-[--accent]/40 transition">
                        <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[--accent] to-transparent opacity-70" />
                        <div className="p-6 md:p-8 flex gap-4 items-start">
                            <Avatar
                                src="/team/daniel.jpg"
                                alt="Daniel Graungaard"
                                initials="D"
                                className="size-28 flex-shrink-0"
                            />
                            <div>
                                <h3 className="font-display text-white text-lg leading-tight">
                                    Daniel Graungaard
                                </h3>
                                <p className="text-[--text-dim] mt-1">
                                    Fullstack-udvikler med speciale i mobil. Tidligere CTO i en scale-up og nu freelancer.
                                </p>
                                <p className="mt-2 text-[--text-dim]">
                                    Skaber processer, rydder op i arkitektur og får teams til at fungere.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
  )
}
