import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'aos/dist/aos.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminApp from './admin/AdminApp'
import logo from './assets/logo.jpeg'

// Set favicon to site logo at runtime
const ensureFavicon = () => {
  const head = document.head
  let link = head.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    head.appendChild(link)
  }
  link.type = 'image/jpeg'
  link.href = logo
}
ensureFavicon()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
