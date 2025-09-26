import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/utils'
import toast from 'react-hot-toast'

type EventT = { _id: string; title: string; location: string; startAt: string; coverImageUrl?: string }

const Events = () => {
    const [items, setItems] = useState<EventT[]>([])
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState<EventT | null>(null)
    const [reg, setReg] = useState<{name: string; phone: string}>({ name: '', phone: '' })
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const data = await apiFetch('/events')
                const upcoming = [...data].sort((a: EventT, b: EventT) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
                setItems(upcoming.slice(0, 4))
            } catch {
                setItems([])
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        <div>
            <>
                <section id="events" className="py-16 bg-gray-50 bg-fixed-youth angle-top angle-bottom">
                    <div className='container mx-auto px-4'>
                        <div className="text-center mb-12">
                            <h2 className='heading-font text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
                                Upcoming Events
                            </h2>
                            <p className='text-gray-600 max-w-2xl mx-auto'>
                                Join us for worship, fellowship, and service opportunities
                            </p>

                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            {loading ? (
                                Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 h-48 animate-pulse" />
                                ))
                            ) : items.length === 0 ? (
                                <div className="lg:col-span-4 text-center text-gray-500">No upcoming events.</div>
                            ) : (
                                items.map((ev, idx) => (
                                    <div key={ev._id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all" data-aos="fade-up" data-aos-delay={idx * 50}>
                                        {ev.coverImageUrl && (
                                            <div className="relative h-36 overflow-hidden">
                                                <img src={ev.coverImageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="event" />
                                                <div className="absolute top-3 left-3 bg-white/80 text-gray-800 text-xs px-2 py-1 rounded">{new Date(ev.startAt).toLocaleDateString()}</div>
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <div className="flex items-center mb-4">
                                                <div className="bg-blue-100 text-blue-800 rounded-lg p-3 text-center mr-4">
                                                    <div className="text-xl font-bold">{new Date(ev.startAt).getDate()}</div>
                                                    <div className="text-sm uppercase">{new Date(ev.startAt).toLocaleString(undefined, { month: 'short' })}</div>
                                                </div>
                                                <div>
                                                    <h3 className="heading-font text-xl font-bold text-gray-900">{ev.title}</h3>
                                                    <p className="text-gray-600"><i className="fas fa-clock mr-1"></i>{new Date(ev.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500"><i className="fas fa-map-marker-alt mr-1"></i>{ev.location}</span>
                                                <button onClick={()=>{ setSelected(ev); setReg({ name: '', email: '', attendees: 1 }) }} className="text-sm btn-primary-gradient text-white py-2 px-4 rounded-full transition duration-300">
                                                    Register
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}

                        </div>
                    </div>
                </section>
            </>
            {selected && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={()=>!submitting && setSelected(null)}></div>
                    <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
                        <button aria-label="Close" onClick={()=>!submitting && setSelected(null)} className="absolute top-3 right-3 bg-white/90 text-gray-900 w-10 h-10 rounded-full shadow flex items-center justify-center hover:bg-white">✕</button>
                        <div className="mb-4">
                            <h3 className="heading-font text-xl font-bold text-gray-900">Register for {selected.title}</h3>
                            <p className="text-sm text-gray-500">{new Date(selected.startAt).toLocaleString()} · {selected.location}</p>
                        </div>
                        <form onSubmit={async (e)=>{
                            e.preventDefault();
                            setSubmitting(true)
                            try {
                                await apiFetch('/registrations', { method: 'POST', body: JSON.stringify({
                                    eventId: (selected as any)._id,
                                    name: reg.name,
                                    phone: reg.phone,
                                })})
                                toast.success('Registration received!')
                                setSelected(null)
                            } catch (err:any) {
                                toast.error(err.message || 'Failed to register')
                            } finally { setSubmitting(false) }
                        }} className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                                <input required value={reg.name} onChange={e=>setReg({...reg, name: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-[#D4AF37] bg-white text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Kenya)</label>
                                <input pattern="^(\+254|0)7\d{8}$" title="Use +2547XXXXXXXX or 07XXXXXXXX" required value={reg.phone} onChange={e=>setReg({...reg, phone: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-[#D4AF37] bg-white text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent" />
                            </div>
                            <div className="flex items-center justify-end gap-2 pt-2">
                                <button type="button" onClick={()=>!submitting && setSelected(null)} className="px-4 py-2 rounded-lg text-sm text-gray-700 bg-gray-100 hover:bg-gray-200">Cancel</button>
                                <button type="submit" disabled={submitting} className="px-4 py-2 rounded-lg text-sm text-white btn-primary-gradient disabled:opacity-60">{submitting ? 'Submitting…' : 'Submit'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Events