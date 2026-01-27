'use client'

import Link from 'next/link'
import MiniPodcastPlayer from '@/components/MiniPodcastPlayer'
import { getSlug } from '@/lib/podcastutils'
import { useEpisodes } from '@/lib/useEpisodes'

function formatDate(dateString: string) {
    const d = new Date(dateString)
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = d.getFullYear()
    return `${dd}.${mm}.${yyyy}`
}

export default function EpisodesPage() {
    const { episodes, loading, error } = useEpisodes()

    return (
        <section className="relative w-full overflow-hidden">
            <div className="page relative z-10 space-y-10">
                <h1 className="font-display text-4xl">Episoder</h1>

                {loading && (
                    <div className="flex justify-center py-20">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[--accent]" />
                    </div>
                )}

                {error && (
                    <p className="text-[--text-dim] text-center py-20">
                        Vi kan ikke hente episoderne lige nu — podcasttjenesten svarer ikke. Prøv igen lidt senere.
                    </p>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {episodes.map((item) => {
                            const slug = getSlug(item.link)
                            const description = item.contentSnippet

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

                                        {item.audioUrl && (
                                            <div className="pointer-events-auto">
                                                <MiniPodcastPlayer src={item.audioUrl} title={item.title} />
                                            </div>
                                        )}
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    )
}
