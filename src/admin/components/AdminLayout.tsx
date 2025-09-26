import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { BookOpen, Calendar, Mail, MessageSquare, Shield, Menu, Images } from 'lucide-react'
import AdminStatsHeader from './AdminStatsHeader'

export default function AdminLayout() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const logout = () => { localStorage.removeItem('adminAuthed'); navigate('/admin/login') }

  const links = [
    { to: '/admin/sermons', label: 'Sermons', icon: <BookOpen size={18} /> },
    { to: '/admin/events', label: 'Events', icon: <Calendar size={18} /> },
    { to: '/admin/devotions', label: 'Devotions', icon: <BookOpen size={18} /> },
    { to: '/admin/newsletter', label: 'Subscriptions', icon: <Mail size={18} /> },
    { to: '/admin/contacts', label: 'Contacts', icon: <MessageSquare size={18} /> },
    { to: '/admin/testimonials', label: 'Testimonials', icon: <MessageSquare size={18} /> },
    { to: '/admin/gallery', label: 'Gallery', icon: <Images size={18} /> },
    { to: '/admin/admins', label: 'Admins', icon: <Shield size={18} /> },
  ]

  const linkBase = 'flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-gray-100 transition'

  const Sidebar = (
    <aside className="w-64 glass bg-white/70 border rounded-2xl p-4 h-full">
      <div className="mb-4 px-2">
        <div className="heading-font text-lg font-bold">
          <span className="brand-text-gradient">Shekinah Admin</span>
        </div>
        <p className="text-xs text-gray-500">Manage content and submissions</p>
      </div>
      <nav className="flex flex-col gap-1">
        {links.map(l => (
          <NavLink key={l.to} to={l.to} className={({isActive}) => `${linkBase} ${isActive ? 'bg-gray-100 ring-1 ring-gray-200' : ''}`} onClick={()=>setOpen(false)}>
            <span className="text-gray-700">{l.icon}</span>
            <span className="text-gray-800">{l.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-6 border-t pt-4">
        <button onClick={logout} className="w-full text-left text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition">Logout</button>
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" aria-label="Open menu" onClick={()=>setOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="heading-font text-xl font-bold">Admin Dashboard</div>
          </div>
          <button onClick={logout} className="hidden md:inline-block text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition">Logout</button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 flex gap-6">
        <div className="hidden md:block sticky top-20 h-[calc(100vh-120px)]">{Sidebar}</div>
        <main className="flex-1">
          <AdminStatsHeader />
          <Outlet />
        </main>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setOpen(false)}></div>
          <div className="absolute left-0 top-0 h-full w-72 p-4 bg-white shadow-xl">
            <button aria-label="Close" onClick={()=>setOpen(false)} className="absolute top-3 right-3 bg-white/90 text-gray-900 w-10 h-10 rounded-full shadow flex items-center justify-center hover:bg-white">✕</button>
            {Sidebar}
          </div>
        </div>
      )}
    </div>
  )
}


