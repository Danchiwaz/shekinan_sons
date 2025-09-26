import { useEffect, useState } from 'react'
import { apiFetch } from '../../lib/utils'

type Newsletter = { _id: string; email: string; createdAt: string }

export default function NewsletterPage() {
  const [items, setItems] = useState<Newsletter[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { (async ()=>{ setLoading(true); setItems(await apiFetch('/newsletter')); setLoading(false) })() }, [])

  return (
    <div>
      <h2 className="heading-font text-2xl font-bold mb-4">Subscriptions</h2>
      <div className="bg-white border rounded-xl p-4">
        {loading ? 'Loading…' : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2">Email</th>
                <th className="py-2">Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {items.map(n => (
                <tr key={n._id} className="border-t">
                  <td className="py-2">{n.email}</td>
                  <td className="py-2">{new Date(n.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}


