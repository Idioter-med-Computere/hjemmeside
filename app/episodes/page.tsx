import Link from 'next/link'
import Parser from 'rss-parser'
import MiniPodcastPlayer from '@/components/MiniPodcastPlayer'
import { getSlug } from '@/lib/podcastutils'

function formatDate(dateString: string) {
    const d = new Date(dateString)
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = d.getFullYear()
    return `${dd}.${mm}.${yyyy}`
}

export default async function EpisodesPage() {
    const rssUrl = process.env.PODCAST_RSS_URL
    const parser = new Parser({ headers: { 'user-agent': 'IdioterMedComputere/1.0' } })
    const feed = rssUrl ? await parser.parseURL(rssUrl) : { items: [] as any[] }

    return (
        <section className="relative w-full py-20 overflow-hidden">
            {/* gradient transitions */}

            <div className="page relative z-10 space-y-10">
                <h1 className="font-display text-4xl">Episoder</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {feed.items.map((item: any) => {
                        const slug = getSlug(item.link ?? '')
                        const description = (item.contentSnippet || item.content || '').slice(0, 180)
                        const audio = item.enclosure?.url as string | undefined

                        return (
                            <article
                                key={item.guid || item.link}
                                className="group relative overflow-hidden rounded-xl bg-[#1a1a1a] border border-white/10 hover:border-[--accent] hover:shadow-[0_0_25px_rgba(155,93,229,0.25)] transition"
                            >
                                {/* accent line */}
                                <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[--accent] to-transparent opacity-70" />

                                {/* gør hele kortet klikbart */}
                                <Link
                                    href={`/episodes/${slug}`}
                                    className="absolute inset-0 z-10"
                                    aria-label={`Åbn episode: ${item.title}`}
                                />

                                {/* alt indhold skal ikke blokere link-klikket, bortset fra player */}
                                <div className="relative z-20 pointer-events-none p-6 space-y-4">
                                    <h3 className="font-display text-2xl text-white">{item.title}</h3>

                                    <p className="text-[#bbbbbb] text-sm">
                                        {item.pubDate ? formatDate(item.pubDate) : ''}
                                    </p>

                                    <p className="text-[#ffffff] leading-relaxed text-sm">
                                        {description}
                                        {description.length === 180 ? '…' : ''}
                                    </p>

                                    {/* mini player — aktiver klik kun her */}
                                    {audio && (
                                        <div className="pointer-events-auto">
                                            <MiniPodcastPlayer src={audio} title={item.title} />
                                        </div>
                                    )}
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}