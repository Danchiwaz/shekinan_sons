import { useState } from 'react'
import { API_BASE_URL } from '../../lib/utils'
import toast from 'react-hot-toast'

export default function AdminsPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'owner'|'editor'|'viewer'>('editor')
  const [secret, setSecret] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_BASE_URL}/admins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': secret },
        body: JSON.stringify({ name, email, role })
      })
      if (!res.ok) throw new Error(await res.text())
      toast.success('Admin created')
      setName(''); setEmail(''); setRole('editor'); setSecret('')
    } catch (err:any) {
      toast.error(err.message || 'Failed to create admin')
    }
  }

  return (
    <div>
      <h2 className="heading-font text-2xl font-bold mb-4">Create Admin</h2>
      <form onSubmit={submit} className="bg-white border rounded-xl p-4 grid md:grid-cols-2 gap-3 w-full max-w-2xl">
        <input className="border rounded-lg px-3 py-2" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required />
        <input className="border rounded-lg px-3 py-2" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <select className="border rounded-lg px-3 py-2" value={role} onChange={e=>setRole(e.target.value as any)}>
          <option value="owner">Owner</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
        <input className="border rounded-lg px-3 py-2" type="password" placeholder="Admin create secret" value={secret} onChange={e=>setSecret(e.target.value)} required />
        <button className="md:col-span-2 btn-primary-gradient text-white rounded-lg py-2">Create Admin</button>
      </form>
      <p className="text-sm text-gray-500 mt-3">Ask the owner for the secret (server env ADMIN_CREATE_SECRET).</p>
    </div>
  )
}


