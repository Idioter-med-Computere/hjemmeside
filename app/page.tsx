import Image from 'next/image'
import Link from 'next/link'
import Parser from 'rss-parser'

function formatDate(dateString: string) {
  const d = new Date(dateString)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${dd}.${mm}.${yyyy}`
}

export default async function HomePage() {
  const rssUrl = process.env.PODCAST_RSS_URL
  const parser = new Parser({ headers: { 'user-agent': 'IdioterMedComputere/1.0' } })
  const feed = rssUrl ? await parser.parseURL(rssUrl) : { items: [] as any[] }
  const latest = (feed.items || []).slice(0, 3)

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-2xl border border-[#2a2a2a]">
        <Image
          src="/images/cover.png?v=2"
          alt="Idioter med computere cover"
          width={2400}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 px-8 py-20 text-center">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight">
            Idioter med computere
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-[#bbbbbb] max-w-2xl mx-auto">
            En tech-podcast om alt det dumme, folk laver med computere.
          </p>
          <div className="mt-10">
            <Link href="/subscribe" className="btn-cta btn-glow">
              Abonnér
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-3xl mx-auto text-center space-y-4">
        <p className="text-[#ffffff]">
          En podcast om digital teknologi – som den bliver brugt, og som den bliver bygget.
          Hvis du gerne vil forstå den teknologi, der former din hverdag – og hvorfor den tit føles mærkelig, besværlig eller uigennemskuelig – så er du kommet det rigtige sted hen.
          Idioter med computere er en podcast fra to mennesker, der bygger teknologi til hverdag. Vi taler om de digitale løsninger, vi alle sammen er omgivet af, og vi går tæt på, hvordan de bliver til i virkeligheden: idéer, misforståelser, beslutninger, kompromiser – og virkelige mennesker, der prøver at få det hele til at hænge sammen.
        </p>
      </section>

      {/* Latest episodes */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Seneste episoder</h2>
          <Link href="/episodes" className="link">Se alle episoder</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.slice(0, 3).map((item: any) => {
            const description = (item.contentSnippet || item.content || '').slice(0, 200)
            return (
              <article key={item.guid || item.link} className="card p-5">
                <h3 className="font-display text-xl mb-1">{item.title}</h3>
                <p className="text-[#bbbbbb] text-sm">{item.pubDate ? formatDate(item.pubDate) : ''}</p>
                <p className="mt-3 text-white">{description}{description.length === 200 ? '…' : ''}</p>
                <div className="mt-4">
                  <a href={item.enclosure?.url || item.link} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-glow">Lyt nu</a>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* Brevkasse teaser */}
      <section className="card p-6 text-center">
        <p className="text-white">
          Har du selv oplevet idiotiske ting med computere? Så skriv til os – måske tager vi dit brev med i podcasten.
        </p>
        <div className="mt-4">
          <Link href="/brevkasse" className="btn btn-dark btn-glow">Skriv til os</Link>
        </div>
      </section>

      {/* Team */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl">Teamet bag</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6 flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center font-display text-lg">M</div>
            <div>
              <h3 className="font-display text-xl">Magnus Høholt Kaspersen</h3>
              <p className="text-[#ffffff] mt-2">
                Partner & CTO i Creative Oak. Ekspert i AI og uddannelse. Adjunkt på Aarhus Tech. Har forsket i, hvordan mennesker lærer teknologi, og hvordan vi kan bruge AI i praksis. Bringer de store linjer og det menneskelige perspektiv ind i samtalerne.
              </p>
            </div>
          </div>
          <div className="card p-6 flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center font-display text-lg">D</div>
            <div>
              <h3 className="font-display text-xl">Daniel Graungaard</h3>
              <p className="text-[#ffffff] mt-2">
                Fullstack-udvikler med speciale i mobil, både cross-platform og native. Tidligere CTO i en scale-up og nu freelancer, hvor han hjælper virksomheder fra idé til færdig app. Vant til at træffe de svære tekniske valg, rydde op i arkitektur og skabe processer, der får teams til at fungere. Når han ikke bygger apps, laver han frivillig ledelse og logistik i FDF.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
