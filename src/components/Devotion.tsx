import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { apiFetch } from '../lib/utils'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

type Devotion = { _id: string; title: string; verse: string; content: string; date: string; coverImageUrl?: string }

export default function DevotionSection(){
  const [devotion, setDevotion] = useState<Devotion | null>(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [listLoading, setListLoading] = useState(true)
  const [items, setItems] = useState<Devotion[]>([])
  const [from, setFrom] = useState<string>('')
  const [to, setTo] = useState<string>('')

  const computeThisWeek = () => {
    const now = new Date()
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const day = d.getDay() // 0=Sun ... 6=Sat
    const diffToMonday = (day + 6) % 7
    const start = new Date(d)
    start.setDate(d.getDate() - diffToMonday)
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    return {
      from: start.toISOString().slice(0,10),
      to: end.toISOString().slice(0,10),
    }
  }

  const loadList = async (f: string, t: string) => {
    setListLoading(true)
    try {
      const qs = new URLSearchParams()
      if (f) qs.set('from', f)
      if (t) qs.set('to', t)
      const data: Devotion[] = await apiFetch(`/devotions${qs.toString() ? `?${qs.toString()}` : ''}`)
      const sorted = data.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      setItems(sorted)
      setDevotion(sorted[0] || null)
    } finally {
      setListLoading(false)
    }
  }

  useEffect(()=>{
    const wk = computeThisWeek()
    setFrom(wk.from)
    setTo(wk.to)
    ;(async ()=>{
      try {
        await loadList(wk.from, wk.to)
      } finally { setLoading(false) }
    })()
  },[])
  return (
    <section id="devotion" className="py-16 bg-white angle-top angle-bottom">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="heading-font text-3xl md:text-4xl font-bold text-gray-900">Daily Devotion</h2>
          <p className="text-gray-600">Be encouraged by today’s word</p>
        </div>
        {loading ? (
          <div className="rounded-2xl h-40 bg-gray-100 animate-pulse" />
        ) : devotion ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-0 max-w-3xl mx-auto overflow-hidden text-center cursor-pointer" onClick={()=>setOpen(true)}>
            {devotion.coverImageUrl && (
              <img src={devotion.coverImageUrl} alt="Devotion cover" className="w-full h-56 object-cover" />
            )}
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-1">{new Date(devotion.date).toLocaleDateString()}</div>
              <h3 className="heading-font text-2xl font-bold text-gray-900 mb-1">{devotion.title}</h3>
              <div className="text-amber-600 font-semibold mb-4">{devotion.verse}</div>
              <div className="devotion-content max-w-none max-h-40 overflow-hidden text-left">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{devotion.content}</ReactMarkdown>
              </div>
              <div className="mt-4">
                <button className="btn-primary-gradient text-white font-semibold py-2 px-5 rounded-full" onClick={(e)=>{ e.stopPropagation(); setOpen(true) }}>Read Full Devotion</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">No devotion posted yet.</div>
        )}
      </div>

      {/* Filter and list */}
      <div className="container mx-auto px-4 mt-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">From</label>
              <input type="date" value={from} onChange={e=>setFrom(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[#D4AF37] bg-white text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">To</label>
              <input type="date" value={to} onChange={e=>setTo(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[#D4AF37] bg-white text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
            </div>
            <div className="flex gap-2">
              <button onClick={()=>loadList(from, to)} className="btn-primary-gradient text-white font-semibold px-4 py-2 rounded-lg">Apply</button>
              <button onClick={()=>{ const wk = computeThisWeek(); setFrom(wk.from); setTo(wk.to); loadList(wk.from, wk.to) }} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800">This Week</button>
            </div>
          </div>

          <div className="mt-6">
            {listLoading ? (
              <div className="h-24 bg-gray-100 animate-pulse rounded-xl" />
            ) : items.length === 0 ? (
              <div className="text-gray-500">No devotions found in this range.</div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(it => (
                  <div key={it._id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer" onClick={()=>{ setDevotion(it); setOpen(true) }}>
                    {it.coverImageUrl && (
                      <img src={it.coverImageUrl} alt="Devotion cover" className="w-full h-32 object-cover" />
                    )}
                    <div className="p-4">
                      <div className="text-xs text-gray-500">{new Date(it.date).toLocaleDateString()}</div>
                      <div className="heading-font font-semibold text-gray-900">{it.title}</div>
                      <div className="text-amber-600 text-sm mb-2">{it.verse}</div>
                      <div className="devotion-content text-sm max-h-16 overflow-hidden">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{it.content}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {open && devotion && createPortal(
        <div className="fixed inset-0 z-[9999]">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setOpen(false)} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-2xl max-h-[85vh] overflow-auto bg-white rounded-2xl shadow-2xl">
            <button aria-label="Close" onClick={()=>setOpen(false)} className="absolute top-3 right-3 bg-white/90 text-gray-900 w-10 h-10 rounded-full shadow flex items-center justify-center hover:bg-white">✕</button>
            {devotion.coverImageUrl && (
              <img src={devotion.coverImageUrl} alt="Devotion cover" className="w-full h-56 object-cover rounded-t-2xl" />
            )}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  {(() => {
                    const d = new Date(devotion.date)
                    const ordinal = (n: number) => { const s = ["th","st","nd","rd"], v = n % 100; return n + (s[(v-20)%10] || s[v] || s[0]) }
                    const format = (date: Date) => {
                      const day = ordinal(date.getDate())
                      const month = date.toLocaleString(undefined, { month: 'long' })
                      const year = date.getFullYear()
                      return `${day} ${month} ${year}`
                    }
                    const daysLeft = (() => {
                      const yearEnd = new Date(d.getFullYear(), 11, 31)
                      const ms = yearEnd.getTime() - d.getTime()
                      return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
                    })()
                    return (
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="px-2.5 py-1 rounded-full text-xs text-white" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #ec4899 100%)' }}>{format(d)}</span>
                        <span className="px-2.5 py-1 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-200">{daysLeft} days remaining to end of year {d.getFullYear()}</span>
                      </div>
                    )
                  })()}
                  <h3 className="heading-font text-2xl font-bold text-gray-900">{devotion.title}</h3>
                  <div className="text-amber-600 font-semibold mt-1">{devotion.verse}</div>
                </div>
                <button aria-label="Close" onClick={()=>setOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">✕</button>
              </div>
              <div className="prose prose-gray max-w-none devotion-content">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{devotion.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}


