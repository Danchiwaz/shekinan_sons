import { useEffect, useState } from 'react'
import { apiFetch } from '../../lib/utils'

export default function AdminStatsHeader() {
  const [stats, setStats] = useState<{sermons:number;events:number;newsletter:number;contacts:number} | null>(null)
  useEffect(() => { (async ()=>{ try { const s = await apiFetch('/stats'); setStats(s) } catch { /* ignore */ } })() }, [])
  const card = 'bg-white border rounded-2xl p-4 shadow-sm'
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className={card}><div className="text-xs text-gray-500">Sermons</div><div className="text-2xl font-semibold">{stats?stats.sermons:'—'}</div></div>
      <div className={card}><div className="text-xs text-gray-500">Events</div><div className="text-2xl font-semibold">{stats?stats.events:'—'}</div></div>
      <div className={card}><div className="text-xs text-gray-500">Subscriptions</div><div className="text-2xl font-semibold">{stats?stats.newsletter:'—'}</div></div>
      <div className={card}><div className="text-xs text-gray-500">Contacts</div><div className="text-2xl font-semibold">{stats?stats.contacts:'—'}</div></div>
    </div>
  )
}


