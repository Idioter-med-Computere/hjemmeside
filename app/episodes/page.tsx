import Parser from 'rss-parser'

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
    <div className="space-y-6">
      <h1 className="font-display text-4xl">Episoder</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {feed.items.map((item: any) => {
          const enclosureUrl = item.enclosure?.url as string | undefined
          const description = (item.contentSnippet || item.content || '').slice(0, 200)
          return (
            <article key={item.guid || item.link} className="card p-5">
              <h3 className="font-display text-2xl mb-1">{item.title}</h3>
              <p className="text-[#bbbbbb] text-sm">{item.pubDate ? formatDate(item.pubDate) : ''}</p>
              <p className="mt-3 text-[#ffffff]">{description}{description.length === 200 ? '…' : ''}</p>
              {enclosureUrl && (
                <audio controls className="mt-4 w-full">
                  <source src={enclosureUrl} />
                </audio>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
} 