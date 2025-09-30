import { SiSpotify, SiAmazonmusic, SiApplepodcasts, SiCastbox, SiIheartradio, SiOvercast, SiPocketcasts, SiRss } from 'react-icons/si'

const providers = [
  { name: 'Spotify', icon: SiSpotify },
  { name: 'Amazon Music', icon: SiAmazonmusic },
  { name: 'Apple Podcasts', icon: SiApplepodcasts },
  { name: 'Castbox', icon: SiCastbox },
  { name: 'Goodpods', icon: SiRss },
  { name: 'iHeartRadio', icon: SiIheartradio },
  { name: 'Overcast', icon: SiOvercast },
  { name: 'Pocket Casts', icon: SiPocketcasts },
  { name: 'RSS Feed', icon: SiRss },
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
            <a key={p.name} href="#" className="group card px-5 py-4 flex items-center gap-4 hover:scale-101" style={{ boxShadow: 'none' }}>
              <span className="text-white text-2xl"><Icon aria-hidden /></span>
              <span className="text-white font-medium group-hover:underline" style={{ textDecorationColor: '#9b5de5', textUnderlineOffset: 6 }}>{p.name}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
} 