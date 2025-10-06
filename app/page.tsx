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
              <p className="mt-3 text-[--text-dim] text-lg md:text-xl">En tech-podcast om alt det dumme, folk laver med computere.</p>
              <a href="/subscribe" className="mt-8 inline-flex items-center justify-center bg-[--accent] text-white font-display font-bold uppercase rounded-2xl px-10 py-5 text-2xl shadow-[0_0_40px_rgba(155,93,229,0.4)] hover:ring-2 hover:ring-[--accent]" aria-label="Abonnér på Idioter med computere">Abonnér</a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="card p-6 md:p-8 text-center md:text-lg leading-relaxed text-[--text]">
          <p>En podcast om digital teknologi – som den bliver brugt, og som den bliver bygget. Hvis du gerne vil forstå den teknologi, der former din hverdag – og hvorfor den tit føles mærkelig, besværlig eller uigennemskuelig – så er du kommet det rigtige sted hen.</p>
          <p className="mt-4 text-[--text-dim]">Idioter med computere er en podcast fra to mennesker, der bygger teknologi til hverdag. Vi taler om de digitale løsninger, vi alle sammen er omgivet af, og vi går tæt på, hvordan de bliver til i virkeligheden: idéer, misforståelser, beslutninger, kompromiser – og virkelige mennesker, der prøver at få det hele til at hænge sammen.</p>
        </div>
      </section>

      {/* Latest Episodes */}
      <section className="section space-y-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-xl tracking-wide">SENESTE EPISODER</h2>
          <a href="/episodes" className="text-[--text-dim] hover:text-white">Se alle episoder</a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {latest.map((ep) => (
            <article key={ep.link} className="card p-6 hover:ring-[--accent] transition">
              <h3 className="text-white font-semibold">{ep.title}</h3>
              <p className="text-[--text-dim] text-sm mt-1">{ep.date ? new Date(ep.date).toLocaleDateString('da-DK') : ''}</p>
              <p className="mt-3 text-[--text] line-clamp-3">{ep.snippet}{ep.snippet.length === 180 ? '…' : ''}</p>
              <div className="mt-4">
                <a href={ep.audio || ep.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Lyt nu</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Brevkasse Callout */}
      <section className="section">
        <div className="card bg-[--panel-2] p-6 md:p-8 text-center">
          <p className="text-[--text]">Har du selv oplevet idiotiske ting med computere? Så skriv til os – måske tager vi dit brev med i podcasten.</p>
          <a href="/brevkasse" className="btn btn-outline mt-4">Skriv til os</a>
        </div>
      </section>

      {/* Teamet bag */}
      <section className="section">
        <h2 className="font-display text-xl tracking-wide mb-6">TEAMET BAG</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6 md:p-8 flex gap-4 items-start">
            <Avatar src="/team/magnus.jpg" alt="Magnus Høholt Kaspersen" initials="M" className="size-28" />
            <div>
              <h3 className="font-display">Magnus Høholt Kaspersen</h3>
              <p className="text-[--text-dim]">Partner & CTO i Creative Oak. Ekspert i AI og uddannelse. Adjunkt på Aarhus Tech.</p>
              <p className="mt-2 text-[--text-dim]">Bringer de store linjer og det menneskelige perspektiv ind i samtalerne.</p>
            </div>
          </div>
          <div className="card p-6 md:p-8 flex gap-4 items-start">
            <Avatar src="/team/daniel.jpg" alt="Daniel Graungaard" initials="D" className="size-28" />
            <div>
              <h3 className="font-display">Daniel Graungaard</h3>
              <p className="text-[--text-dim]">Fullstack-udvikler med speciale i mobil. Tidligere CTO i en scale-up og nu freelancer.</p>
              <p className="mt-2 text-[--text-dim]">Skaber processer, rydder op i arkitektur, og får teams til at fungere.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
