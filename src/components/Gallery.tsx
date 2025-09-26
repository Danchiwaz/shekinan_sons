import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { apiFetch, API_BASE_URL } from '../lib/utils'

type ImageModule = { default: string }

const Gallery = () => {
  // Import all images from assets/gallery (png, jpg, jpeg, webp)
  const localImages = useMemo(() => {
    const modules = import.meta.glob<ImageModule>('../assets/gallery/**/*.{png,jpg,jpeg,webp}', { eager: true })
    const urls = Object.values(modules).map((m) => m.default)
    return urls
  }, [])
  const [images, setImages] = useState<string[]>(localImages)

  useEffect(() => {
    (async () => {
      try {
        const data = await apiFetch('/gallery')
        if (Array.isArray(data) && data.length) {
          const origin = (() => { try { return new URL(API_BASE_URL).origin } catch { return 'http://localhost:4000' } })()
          const normalize = (u: string) => (/^https?:\/\//i.test(u) ? u : u.startsWith('/uploads/') ? `${origin}${u}` : u)
          setImages(data.map((g: any) => normalize(g.url)))
        }
      } catch {
        // fallback to localImages silently
      }
    })()
  }, [localImages])

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const open = (i: number) => setLightboxIdx(i)
  const close = () => setLightboxIdx(null)
  const next = () => setLightboxIdx((i) => (i === null ? null : (i + 1) % images.length))
  const prev = () => setLightboxIdx((i) => (i === null ? null : (i - 1 + images.length) % images.length))

  return (
    <section id="gallery" className="py-16 bg-white angle-top">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="heading-font text-3xl md:text-4xl font-bold text-gray-900 mb-3">Gallery</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Moments from our services, outreach, and community life</p>
        </div>

        {images.length === 0 ? (
          <p className="text-center text-gray-500">No images found in assets/gallery</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {images.slice(0, 3).map((src, i) => (
                <motion.button key={i} className="block w-full overflow-hidden rounded-2xl shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.995 }} onClick={() => open(i)}>
                  <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-64 object-cover" loading="lazy" />
                </motion.button>
              ))}
            </div>
            {images.length > 3 && (
              <div className="text-center mt-8">
                <button onClick={() => open(0)} className="btn-primary-gradient text-white font-semibold py-3 px-6 rounded-full shadow">
                  See More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && images[lightboxIdx] && (
          <motion.div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
            <motion.div className="relative max-w-5xl w-full" initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
              <img src={images[lightboxIdx]} alt="Selected" className="w-full h-auto rounded-xl shadow-2xl" />

              {/* Close button */}
              <button aria-label="Close" onClick={close} className="absolute top-3 right-3 bg-white/90 text-gray-900 w-10 h-10 rounded-full shadow flex items-center justify-center hover:bg-white">
                ✕
              </button>

              {/* Prev button */}
              <button aria-label="Previous" onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 btn-primary-gradient text-white w-12 h-12 rounded-full shadow flex items-center justify-center text-2xl">
                ‹
              </button>

              {/* Next button */}
              <button aria-label="Next" onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 btn-primary-gradient text-white w-12 h-12 rounded-full shadow flex items-center justify-center text-2xl">
                ›
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery


