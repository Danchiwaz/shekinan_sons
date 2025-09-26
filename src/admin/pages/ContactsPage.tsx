import { useEffect, useState } from 'react'
import { apiFetch } from '../../lib/utils'
import toast from 'react-hot-toast'

type Contact = { _id: string; name: string; email: string; subject?: string; message: string; handled: boolean; createdAt: string }

export default function ContactsPage() {
  const [items, setItems] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const load = async () => { setLoading(true); setItems(await apiFetch('/contacts')); setLoading(false) }
  useEffect(() => { load() }, [])

  const markHandled = async (id: string) => {
    await apiFetch(`/contacts/${id}`, { method: 'PUT', body: JSON.stringify({ handled: true }) })
    toast.success('Marked as handled')
    await load()
  }

  return (
    <div>
      <h2 className="heading-font text-2xl font-bold mb-4">Contacts</h2>
      <div className="bg-white border rounded-xl p-4">
        {loading ? 'Loading…' : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2">From</th>
                <th className="py-2">Subject</th>
                <th className="py-2">Message</th>
                <th className="py-2">Status</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {items.map(c => (
                <tr key={c._id} className="border-t align-top">
                  <td className="py-2">
                    <div className="font-medium">{c.name}</div>
                    <div className="text-gray-500">{c.email}</div>
                    <div className="text-gray-400 text-xs">{new Date(c.createdAt).toLocaleString()}</div>
                  </td>
                  <td className="py-2">{c.subject || '-'}</td>
                  <td className="py-2 max-w-md">{c.message}</td>
                  <td className="py-2">{c.handled ? 'Handled' : 'New'}</td>
                  <td className="py-2 text-right">
                    {!c.handled && (
                      <button onClick={()=>markHandled(c._id)} className="text-sm text-green-600 hover:underline">Mark handled</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}


