import { useEffect, useState } from 'react'
import { apiFetch } from '../../lib/utils'
import { Card } from '../../components/ui/Card'

type Reg = { _id: string; eventId: string; name: string; phone: string; createdAt: string }

export default function RegistrationsPage(){
  const [items, setItems] = useState<Reg[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(()=>{ (async()=>{ setLoading(true); setItems(await apiFetch('/registrations')); setLoading(false) })() }, [])
  return (
    <div>
      <h2 className="heading-font text-2xl font-bold mb-4">Event Registrations</h2>
      <Card>
        {loading ? 'Loading…' : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2">Name</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Event Id</th>
                <th className="py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {items.map(r=> (
                <tr key={r._id} className="border-t">
                  <td className="py-2">{r.name}</td>
                  <td className="py-2">{r.phone}</td>
                  <td className="py-2">{r.eventId}</td>
                  <td className="py-2">{new Date(r.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}




