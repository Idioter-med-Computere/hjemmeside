import Parser from 'rss-parser'
import PodcastPlayer from '@/components/PodcastPlayer'
import parse from 'html-react-parser'

export default async function EpisodePage(props: { params: Promise<{ slug: string }> }) {
    const parser = new Parser()
    const {slug} = await props.params
    const feed = await parser.parseURL(process.env.PODCAST_RSS_URL!)
    const episode = feed.items.find((i: any) => i.link?.endsWith(slug))
    if (!episode) return <p>Episode ikke fundet</p>

    return (
        <article className="relative w-full bg-[#080808] overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[60px] bg-gradient-to-b from-[#101010] to-transparent"/>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60px] bg-gradient-to-t from-[#101010] to-transparent"/>

            <div className="page relative z-10 max-w-3xl mx-auto text-white">
                <h1 className="font-display text-3xl md:text-4xl tracking-wide">{episode.title}</h1>
                <div className="w-24 h-[3px] bg-[--accent] mt-3 mb-8"></div>

                <PodcastPlayer src={episode.enclosure?.url || ''}/>

                <h2 className="font-display text-xl mt-12 mb-4">Shownotes</h2>
                <div className="prose prose-invert">
                    {parse(episode['content:encoded'] || episode.contentSnippet || '')}
                </div>
            </div>
        </article>
    )
}