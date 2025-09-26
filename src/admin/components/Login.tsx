import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const ADMIN_PW = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'

export default function Login() {
  const [pw, setPw] = useState('')
  const navigate = useNavigate()
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PW) {
      localStorage.setItem('adminAuthed', 'true')
      toast.success('Welcome back!')
      navigate('/admin/sermons')
    } else {
      toast.error('Invalid password')
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="bg-white border rounded-2xl p-8 w-full max-w-sm shadow-sm">
        <h1 className="heading-font text-2xl mb-4">Admin Login</h1>
        <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Password"
          className="w-full px-4 py-3 rounded-lg border border-[#D4AF37] bg-white text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
        <button type="submit" className="w-full mt-4 btn-primary-gradient text-white font-semibold py-3 px-4 rounded-lg">Sign In</button>
      </form>
    </div>
  )
}


