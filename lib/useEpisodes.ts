'use client'

import { useEffect, useState } from 'react'

export type Episode = {
    title: string
    link: string
    guid: string
    pubDate: string | null
    contentSnippet: string
    audioUrl: string | null
}

function parseRss(xml: string): Episode[] {
    const doc = new DOMParser().parseFromString(xml, 'text/xml')
    const items = doc.querySelectorAll('item')
    const episodes: Episode[] = []

    items.forEach((item) => {
        const text = (tag: string) => item.querySelector(tag)?.textContent ?? ''
        const enclosure = item.querySelector('enclosure')

        // Strip HTML tags for snippet
        const raw = text('description').replace(/<[^>]+>/g, '').trim()

        episodes.push({
            title: text('title') || 'Uden titel',
            link: text('link'),
            guid: text('guid') || text('link'),
            pubDate: text('pubDate') || null,
            contentSnippet: raw.slice(0, 180),
            audioUrl: enclosure?.getAttribute('url') ?? null,
        })
    })

    return episodes
}

export function useEpisodes() {
    const [episodes, setEpisodes] = useState<Episode[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_PODCAST_RSS_URL
        if (!url) {
            setError(true)
            setLoading(false)
            return
        }

        fetch(url)
            .then((r) => {
                if (!r.ok) throw new Error()
                return r.text()
            })
            .then((xml) => setEpisodes(parseRss(xml)))
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [])

    return { episodes, loading, error }
}
