import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-[#2a2a2a]">
        <Image
          src="/images/cover.png"
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
          <div className="mt-8">
            <Link href="/subscribe" className="btn btn-white">
              Abonnér
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/subscribe" className="card p-6 block">
          <h3 className="font-display text-2xl mb-2">Abonnér</h3>
          <p className="text-[#bbbbbb]">Find os der, hvor du hører podcasts.</p>
        </Link>
        <Link href="/episodes" className="card p-6 block">
          <h3 className="font-display text-2xl mb-2">Episoder</h3>
          <p className="text-[#bbbbbb]">Gennemse de nyeste episoder og lyt direkte.</p>
        </Link>
        <Link href="/brevkasse" className="card p-6 block">
          <h3 className="font-display text-2xl mb-2">Brevkasse</h3>
          <p className="text-[#bbbbbb]">Send os dit helt eget idiotiske spørgsmål.</p>
        </Link>
      </section>
    </div>
  )
}
