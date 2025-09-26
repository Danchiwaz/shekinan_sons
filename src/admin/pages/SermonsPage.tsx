import { useEffect, useState } from 'react'
import { apiFetch, API_BASE_URL } from '../../lib/utils'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { Card } from '../../components/ui/Card'

type Sermon = { _id?: string; title: string; speaker: string; date: string; durationMinutes?: number; videoUrl?: string; thumbnailUrl?: string }

export default function SermonsPage() {
  const [items, setItems] = useState<Sermon[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [thumbnailUrlInput, setThumbnailUrlInput] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<Sermon>({ title: '', speaker: '', date: new Date().toISOString().slice(0,10) })

  const load = async () => {
    setLoading(true)
    const data = await apiFetch('/sermons')
    setItems(data)
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const upload = async () => {
    if (!file) return undefined
    const fd = new FormData(); fd.append('file', file)
    const res = await fetch(`${API_BASE_URL}/upload`, { method: 'POST', body: fd })
    if (!res.ok) throw new Error('Upload failed')
    const { url } = await res.json()
    return url
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const yt = youtubeUrl.trim()
      const thumbUrl = thumbnailUrlInput.trim() ? thumbnailUrlInput.trim() : await upload() || (yt ? youtubeThumbnail(yt) : undefined)
      const payload = { ...form, videoUrl: yt || form.videoUrl, thumbnailUrl: thumbUrl }
      if (editingId) {
        await apiFetch(`/sermons/${editingId}`, { method: 'PUT', body: JSON.stringify(payload) })
        toast.success('Sermon updated')
      } else {
        await apiFetch('/sermons', { method: 'POST', body: JSON.stringify(payload) })
        toast.success('Sermon created')
      }
      setForm({ title: '', speaker: '', date: new Date().toISOString().slice(0,10) })
      setFile(null)
      setThumbnailUrlInput('')
      setYoutubeUrl('')
      setEditingId(null)
      await load()
    } catch (e:any) {
      toast.error(e.message || 'Failed to create')
    }
  }

  const youtubeThumbnail = (url: string) => {
    try {
      const id = extractYouTubeId(url)
      return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : undefined
    } catch { return undefined }
  }

  const extractYouTubeId = (url: string): string | undefined => {
    try {
      const u = new URL(url)
      if (u.hostname.includes('youtu.be')) return u.pathname.slice(1) || undefined
      if (u.hostname.includes('youtube.com')) return u.searchParams.get('v') || undefined
      return undefined
    } catch { return undefined }
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this sermon?')) return
    await apiFetch(`/sermons/${id}`, { method: 'DELETE' })
    toast.success('Deleted')
    await load()
  }

  const beginEdit = (s: Sermon) => {
    setEditingId(s._id || null)
    setForm({
      title: s.title,
      speaker: s.speaker,
      date: s.date ? new Date(s.date).toISOString().slice(0,10) : new Date().toISOString().slice(0,10),
      durationMinutes: s.durationMinutes,
      videoUrl: s.videoUrl,
      thumbnailUrl: s.thumbnailUrl,
    })
    setYoutubeUrl(s.videoUrl || '')
    setThumbnailUrlInput(s.thumbnailUrl || '')
    setFile(null)
  }

  return (
    <div>
      <h2 className="heading-font text-2xl font-bold mb-4">Sermons</h2>
      <Card className="mb-6 grid md:grid-cols-5 gap-3">
        <Input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
        <Input placeholder="Speaker" value={form.speaker} onChange={e=>setForm({...form,speaker:e.target.value})} required />
        <Input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} required />
        <Input type="number" placeholder="Duration (min)" value={form.durationMinutes||''} onChange={e=>setForm({...form,durationMinutes: Number(e.target.value)})} />
        <Input placeholder="YouTube URL (optional)" value={youtubeUrl} onChange={e=>setYoutubeUrl(e.target.value)} />
        <Input type="file" accept="image/*" onChange={e=>setFile((e.target as HTMLInputElement).files?.[0]||null)} />
        <Input className="md:col-span-2" placeholder="Thumbnail URL (optional, auto from YouTube if blank)" value={thumbnailUrlInput} onChange={e=>setThumbnailUrlInput(e.target.value)} />
        <div className="md:col-span-5 flex items-center gap-3">
          <Button onClick={submit as any}>{editingId ? 'Update Sermon' : 'Create Sermon'}</Button>
          {editingId && (
            <button type="button" onClick={()=>{ setEditingId(null); setForm({ title:'', speaker:'', date:new Date().toISOString().slice(0,10) }); setYoutubeUrl(''); setThumbnailUrlInput(''); setFile(null) }} className="px-4 py-2 rounded-lg text-sm text-gray-700 bg-gray-100 hover:bg-gray-200">Cancel</button>
          )}
        </div>
      </Card>

      <Card>
        {loading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {Array.from({length:4}).map((_,i)=>(
              <div key={i} className="border rounded-lg p-4 animate-pulse h-24 bg-gray-100" />
            ))}
          </div>
        ) : (
          <>
          <div className="mb-3">
            <Input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search title or speaker" className="w-full md:w-80" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {items.filter(s => (s.title+s.speaker).toLowerCase().includes(query.toLowerCase())).map((s)=> (
              <div key={s._id} className="border rounded-lg p-4 flex gap-3 items-center">
                {s.thumbnailUrl && <img src={s.thumbnailUrl} className="w-20 h-20 object-cover rounded"/>}
                <div className="flex-1">
                  <div className="font-semibold">{s.title}</div>
                  <div className="text-sm text-gray-500">{s.speaker} · {new Date(s.date).toLocaleDateString()}</div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={()=>beginEdit(s)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={()=>s._id&&remove(s._id)} className="text-red-600 hover:underline">Delete</button>
                </div>
              </div>
            ))}
          </div>
          </>
        )}
      </Card>
    </div>
  )
}


