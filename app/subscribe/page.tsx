import { SiSpotify, SiAmazonmusic, SiApplepodcasts, SiCastbox, SiIheartradio, SiOvercast, SiPocketcasts, SiRss } from 'react-icons/si'

const links = {
  spotify: process.env.NEXT_PUBLIC_LINK_SPOTIFY || 'https://open.spotify.com/show/3CZGNGwmcXo80sy8Mhhl1u',
  amazon: process.env.NEXT_PUBLIC_LINK_AMAZON_MUSIC || '#',
  apple: process.env.NEXT_PUBLIC_LINK_APPLE_PODCASTS || '#',
  castbox: process.env.NEXT_PUBLIC_LINK_CASTBOX || '#',
  goodpods: process.env.NEXT_PUBLIC_LINK_GOODPODS || '#',
  iheartradio: process.env.NEXT_PUBLIC_LINK_IHEARTRADIO || '#',
  overcast: process.env.NEXT_PUBLIC_LINK_OVERCAST || '#',
  pocketcasts: process.env.NEXT_PUBLIC_LINK_POCKETCASTS || 'https://pca.st/k18pijwu',
  rss: process.env.NEXT_PUBLIC_LINK_RSS || 'https://anchor.fm/s/109da48b4/podcast/rss',
}

const providers = [
  { name: 'Spotify', icon: SiSpotify, href: links.spotify },
  { name: 'Amazon Music', icon: SiAmazonmusic, href: links.amazon },
  { name: 'Apple Podcasts', icon: SiApplepodcasts, href: links.apple },
  { name: 'Castbox', icon: SiCastbox, href: links.castbox },
  { name: 'Goodpods', icon: SiRss, href: links.goodpods },
  { name: 'iHeartRadio', icon: SiIheartradio, href: links.iheartradio },
  { name: 'Overcast', icon: SiOvercast, href: links.overcast },
  { name: 'Pocket Casts', icon: SiPocketcasts, href: links.pocketcasts },
  { name: 'RSS Feed', icon: SiRss, href: links.rss },
]

export default function SubscribePage() {
  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl sm:text-4xl font-bold">Abonnér på Idioter med computere</h1>
      <p className="text-[#bbbbbb]">Find os der, hvor du hører podcasts.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {providers.map((p) => {
          const Icon = p.icon
          return (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="group card px-5 py-4 flex items-center gap-4 hover:scale-101" style={{ boxShadow: 'none' }}>
              <span className="text-white text-2xl"><Icon aria-hidden /></span>
              <span className="text-white font-medium group-hover:underline" style={{ textDecorationColor: '#9b5de5', textUnderlineOffset: 6 }}>{p.name}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
} 