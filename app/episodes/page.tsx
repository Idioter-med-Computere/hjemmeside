import Link from 'next/link'
import Parser from 'rss-parser'
import MiniPodcastPlayer from '@/components/MiniPodcastPlayer'
import { getSlug } from '@/lib/podcastutils'

export const dynamic = 'force-dynamic'

function formatDate(dateString: string) {
    const d = new Date(dateString)
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = d.getFullYear()
    return `${dd}.${mm}.${yyyy}`
}

export default async function EpisodesPage() {
    const rssUrl = process.env.NEXT_PUBLIC_PODCAST_RSS_URL
    let items: any[] = []

    if (rssUrl) {
        try {
            const parser = new Parser({ headers: { 'user-agent': 'IdioterMedComputere/1.0' } })
            const feed = await parser.parseURL(rssUrl)
            items = feed.items ?? []
        } catch {
            // feed unavailable
        }
    }

    return (
        <section className="relative w-full overflow-hidden">
            <div className="page relative z-10 space-y-10">
                <h1 className="font-display text-4xl">Episoder</h1>

                {items.length === 0 && (
                    <p className="text-[--text-dim] text-center py-20">
                        Vi kan ikke hente episoderne lige nu — podcasttjenesten svarer ikke. Prøv igen lidt senere.
                    </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {items.map((item: any) => {
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

                                <Link
                                    href={`/episodes/${slug}`}
                                    className="absolute inset-0 z-10"
                                    aria-label={`Åbn episode: ${item.title}`}
                                />

                                <div className="relative z-20 pointer-events-none p-6 space-y-4">
                                    <h3 className="font-display text-2xl text-white">{item.title}</h3>

                                    <p className="text-[#bbbbbb] text-sm">
                                        {item.pubDate ? formatDate(item.pubDate) : ''}
                                    </p>

                                    <p className="text-[#ffffff] leading-relaxed text-sm">
                                        {description}
                                        {description.length === 180 ? '…' : ''}
                                    </p>

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
