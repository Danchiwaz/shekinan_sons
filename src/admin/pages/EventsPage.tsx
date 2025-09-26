import { useEffect, useState } from 'react'
import { apiFetch } from '../../lib/utils'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { Card } from '../../components/ui/Card'

type EventT = { _id?: string; title: string; location: string; startAt: string; coverImageUrl?: string }

export default function EventsPage() {
  const [items, setItems] = useState<EventT[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [form, setForm] = useState<EventT>({ title: '', location: '', startAt: new Date().toISOString().slice(0,16), coverImageUrl: '' })

  const load = async () => {
    setLoading(true)
    const data = await apiFetch('/events')
    setItems(data)
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await apiFetch('/events', { method: 'POST', body: JSON.stringify(form) })
      toast.success('Event created')
      setForm({ title: '', location: '', startAt: new Date().toISOString().slice(0,16), coverImageUrl: '' })
      await load()
    } catch (e:any) { toast.error(e.message || 'Failed to create') }
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this event?')) return
    await apiFetch(`/events/${id}`, { method: 'DELETE' })
    toast.success('Deleted')
    await load()
  }

  return (
    <div>
      <h2 className="heading-font text-2xl font-bold mb-4">Events</h2>
      <Card className="mb-6 grid md:grid-cols-5 gap-3">
        <Input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
        <Input placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} required />
        <Input type="datetime-local" value={form.startAt} onChange={e=>setForm({...form,startAt:e.target.value})} required />
        <Input className="md:col-span-2" placeholder="Cover Image URL (optional)" value={form.coverImageUrl} onChange={e=>setForm({...form,coverImageUrl:e.target.value})} />
        <div><Button onClick={submit as any}>Create Event</Button></div>
      </Card>
      <Card>
        {loading ? (
          <ul className="divide-y">
            {Array.from({length:4}).map((_,i)=>(
              <li key={i} className="py-3 animate-pulse h-14 bg-gray-100 rounded" />
            ))}
          </ul>
        ) : (
          <>
          <div className="mb-3">
            <Input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search title or location" className="w-full md:w-80" />
          </div>
          <ul className="divide-y">
            {items.filter(ev => (ev.title+ev.location).toLowerCase().includes(query.toLowerCase())).map((ev)=> (
              <li key={ev._id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {ev.coverImageUrl && <img src={ev.coverImageUrl} className="w-16 h-16 object-cover rounded"/>}
                  <div>
                    <div className="font-semibold">{ev.title}</div>
                    <div className="text-sm text-gray-500">{ev.location} · {new Date(ev.startAt).toLocaleString()}</div>
                  </div>
                </div>
                <button onClick={()=>ev._id&&remove(ev._id)} className="text-red-600 hover:underline">Delete</button>
              </li>
            ))}
          </ul>
          </>
        )}
      </Card>
    </div>
  )
}


