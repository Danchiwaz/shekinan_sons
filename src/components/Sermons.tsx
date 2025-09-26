import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/utils'

type SermonT = { _id: string; title: string; speaker: string; date: string; durationMinutes?: number; videoUrl?: string; thumbnailUrl?: string }

const Sermons = () => {
  const [items, setItems] = useState<SermonT[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const data = await apiFetch('/sermons')
        const sorted = [...data].sort((a: SermonT, b: SermonT) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setItems(sorted.slice(0, 3))
      } catch {
        setItems([])
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const fallbackImg = 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1469&q=80'
  const [player, setPlayer] = useState<{ open: boolean; id?: string; title?: string }>({ open: false })

  const extractYouTubeId = (url?: string): string | undefined => {
    if (!url) return undefined
    try {
      const u = new URL(url)
      if (u.hostname.includes('youtu.be')) return u.pathname.slice(1) || undefined
      if (u.hostname.includes('youtube.com')) return u.searchParams.get('v') || undefined
      return undefined
    } catch { return undefined }
  }

  return (
    <section id="sermons" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="heading-font text-3xl md:text-4xl font-bold text-gray-900 mb-3">&ldquo;Your faith can move mountains&rdquo;</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">— Matthew 17:20</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 p-6 shadow-sm animate-pulse h-64 bg-gray-100" />
            ))
          ) : items.length === 0 ? (
            <div className="md:col-span-3 text-center text-gray-500">No sermons yet. Check back soon.</div>
          ) : (
            items.map((s, idx) => (
              <div key={s._id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all" data-aos="fade-up" data-aos-delay={idx * 50}>
                <div className="relative overflow-hidden">
                  <img src={s.thumbnailUrl || fallbackImg} alt="Sermon thumbnail" className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90 text-xs">
                    <span className="px-2 py-1 rounded-full bg-white/15 backdrop-blur">{new Date(s.date).toLocaleDateString()}</span>
                    {s.durationMinutes ? (
                      <span className="px-2 py-1 rounded-full bg-white/15 backdrop-blur"><i className="fas fa-clock mr-1"></i>{s.durationMinutes} min</span>
                    ) : <span />}
                  </div>
                  <button onClick={()=>{ const id = extractYouTubeId(s.videoUrl); if (id) setPlayer({ open: true, id, title: s.title }) }} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition" aria-label="Play sermon">
                    <span className="btn-primary-gradient text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg"><i className="fas fa-play text-xl"></i></span>
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="heading-font text-xl font-bold text-gray-900 mb-1">{s.title}</h3>
                  <div className="text-sm text-gray-500 mb-4"><i className="fas fa-user mr-1"></i>{s.speaker}</div>
                  <button onClick={()=>{ const id = extractYouTubeId(s.videoUrl); if (id) setPlayer({ open: true, id, title: s.title }) }} className="text-sm font-semibold brand-text-gradient">Watch Now</button>
                </div>
              </div>
            ))
          )}
        </div>
        {player.open && player.id && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/70" onClick={()=>setPlayer({ open:false })} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-3xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              <button aria-label="Close" onClick={()=>setPlayer({ open:false })} className="absolute -top-12 right-0 bg-white/90 text-gray-900 w-10 h-10 rounded-full shadow flex items-center justify-center hover:bg-white">✕</button>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${player.id}?autoplay=1`}
                title={player.title || 'Sermon Player'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Sermons;
