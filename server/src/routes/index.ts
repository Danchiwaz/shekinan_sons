import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { createCrudHandlers } from '../controllers/crudFactory.js'
import { Sermon } from '../models/Sermon.js'
import { Event } from '../models/Event.js'
import { Testimonial } from '../models/Testimonial.js'
import { Newsletter } from '../models/Newsletter.js'
import { Contact } from '../models/Contact.js'
import { Ministry } from '../models/Ministry.js'
import { Admin } from '../models/Admin.js'
import { Devotion } from '../models/Devotion.js'
import { Gallery } from '../models/Gallery.js'
import { Registration } from '../models/Registration.js'

const router = Router()

router.get('/health', (_req, res) => res.json({ status: 'ok' }))

// Uploads
const uploadsDir = path.resolve(process.cwd(), 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir)
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, unique + path.extname(file.originalname))
  },
})
const upload = multer({ storage })

router.post('/upload', upload.single('file'), (req, res) => {
  const filename = req.file?.filename
  if (!filename) return res.status(400).json({ error: 'No file uploaded' })
  const base = `${req.protocol}://${req.get('host')}`
  const url = `${base}/uploads/${filename}`
  res.json({ url })
})

// Bulk upload multiple files
router.post('/upload/bulk', upload.array('files', 20), (req, res) => {
  const files = (req.files as Express.Multer.File[]) || []
  if (!files.length) return res.status(400).json({ error: 'No files uploaded' })
  const base = `${req.protocol}://${req.get('host')}`
  const urls = files.map(f => `${base}/uploads/${f.filename}`)
  res.json({ urls })
})

// Stats
router.get('/stats', async (_req, res) => {
  try {
    const [sermons, events, newsletter, contacts] = await Promise.all([
      Sermon.countDocuments(),
      Event.countDocuments(),
      Newsletter.countDocuments(),
      Contact.countDocuments(),
    ])
    res.json({ sermons, events, newsletter, contacts })
  } catch (err:any) {
    res.status(500).json({ error: 'Failed to fetch stats', details: err.message })
  }
})

// Admin create (secured via header x-admin-password)
const ADMIN_CREATE_SECRET = process.env.ADMIN_CREATE_SECRET || ''
router.post('/admins', async (req, res) => {
  try {
    if (!ADMIN_CREATE_SECRET || req.headers['x-admin-password'] !== ADMIN_CREATE_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const admin = await Admin.create(req.body)
    res.status(201).json(admin)
  } catch (err:any) {
    res.status(400).json({ error: 'Failed to create admin', details: err.message })
  }
})

const resources = [
  { path: 'sermons', model: Sermon },
  { path: 'events', model: Event },
  { path: 'testimonials', model: Testimonial },
  { path: 'newsletter', model: Newsletter },
  { path: 'contacts', model: Contact },
  { path: 'ministries', model: Ministry },
  { path: 'devotions', model: Devotion },
  { path: 'registrations', model: Registration },
  { path: 'gallery', model: Gallery },
]

for (const { path, model } of resources) {
  const handlers = createCrudHandlers(model as any)
  router.post(`/${path}`, handlers.create)
  router.get(`/${path}`, handlers.list)
  router.get(`/${path}/:id`, handlers.get)
  router.put(`/${path}/:id`, handlers.update)
  router.delete(`/${path}/:id`, handlers.remove)
}

export default router



