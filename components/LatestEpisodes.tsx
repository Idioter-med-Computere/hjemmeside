'use client'

import { useEpisodes } from '@/lib/useEpisodes'
import { getSlug } from '@/lib/podcastutils'

export default function LatestEpisodes() {
    const { episodes, loading, error } = useEpisodes()
    const latest = episodes.slice(0, 3)

    if (loading) {
        return (
            <div className="flex justify-center py-16">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[--accent]" />
            </div>
        )
    }

    if (error) {
        return (
            <p className="text-[--text-dim] text-center py-16">
                Vi kan ikke hente episoderne lige nu — podcasttjenesten svarer ikke. Prøv igen lidt senere.
            </p>
        )
    }

    return (
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
                            {ep.pubDate ? new Date(ep.pubDate).toLocaleDateString('da-DK') : ''}
                        </p>
                        <p className="mt-4 text-[--text] text-sm leading-relaxed line-clamp-3">
                            {ep.contentSnippet}
                            {ep.contentSnippet && ep.contentSnippet.length === 180 ? '…' : ''}
                        </p>
                        <div className="mt-5">
                            <a
                                href={`/episodes/${getSlug(ep.link)}`}
                                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-sm hover:border-[--accent] hover:text-[--accent] transition"
                            >
                                Lyt nu
                            </a>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    )
}
