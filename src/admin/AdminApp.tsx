import { Routes, Route, Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import AdminLayout from './components/AdminLayout'
import Login from './components/Login'
import SermonsPage from './pages/SermonsPage'
import EventsPage from './pages/EventsPage'
import NewsletterPage from './pages/NewsletterPage'
import ContactsPage from './pages/ContactsPage'
import AdminsPage from './pages/AdminsPage'
import TestimonialsAdminPage from './pages/TestimonialsAdminPage'
import DevotionsPage from './pages/DevotionsPage'
import GalleryAdminPage from './pages/GalleryAdminPage'

const isAuthed = () => localStorage.getItem('adminAuthed') === 'true'

const Protected = ({ children }: { children: ReactNode }) => {
  return isAuthed() ? children : <Navigate to="/admin/login" replace />
}

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="" element={<Protected><AdminLayout /></Protected>}>
        <Route index element={<Navigate to="sermons" replace />} />
        <Route path="sermons" element={<SermonsPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="newsletter" element={<NewsletterPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="admins" element={<AdminsPage />} />
        <Route path="testimonials" element={<TestimonialsAdminPage />} />
        <Route path="gallery" element={<GalleryAdminPage />} />
        <Route path="devotions" element={<DevotionsPage />} />
      </Route>
    </Routes>
  )
}


