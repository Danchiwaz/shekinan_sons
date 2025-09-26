import { useEffect, useState } from 'react'
import { apiFetch } from '../../lib/utils'
import { Card } from '../../components/ui/Card'
import Button from '../../components/ui/Button'

type T = { _id: string; name: string; quote: string; approved: boolean; createdAt: string }

export default function TestimonialsAdminPage(){
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const load = async () => { setLoading(true); setItems(await apiFetch('/testimonials')); setLoading(false) }
  useEffect(()=>{ load() }, [])

  const approve = async (id: string, approved: boolean) => {
    await apiFetch(`/testimonials/${id}`, { method: 'PUT', body: JSON.stringify({ approved }) })
    await load()
  }
  const remove = async (id: string) => {
    if (!confirm('Delete this testimony?')) return
    await apiFetch(`/testimonials/${id}`, { method: 'DELETE' })
    await load()
  }

  return (
    <div>
      <h2 className="heading-font text-2xl font-bold mb-4">Testimonials</h2>
      <Card>
        {loading ? 'Loading…' : (
          <ul className="divide-y">
            {items.map(t => (
              <li key={t._id} className="py-3 flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-gray-500">{new Date(t.createdAt).toLocaleString()}</div>
                  <p className="mt-2 max-w-2xl">{t.quote}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant={t.approved ? 'ghost' : 'primary'} onClick={()=>approve(t._id, !t.approved)}>{t.approved ? 'Unapprove' : 'Approve'}</Button>
                  <button onClick={()=>remove(t._id)} className="text-red-600 hover:underline text-sm">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}


