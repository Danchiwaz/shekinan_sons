import { Request, Response } from 'express'
import { Model } from 'mongoose'

export const createCrudHandlers = <T>(ModelEntity: Model<T>) => ({
  create: async (req: Request, res: Response) => {
    try {
      const doc = await ModelEntity.create(req.body)
      res.status(201).json(doc)
    } catch (err) {
      res.status(400).json({ error: 'Failed to create', details: (err as Error).message })
    }
  },
  list: async (req: Request, res: Response) => {
    try {
      // Optional date range filtering when a model has a `date` field
      const fromParam = req.query.from as string | undefined
      const toParam = req.query.to as string | undefined
      const dateFilter: Record<string, any> = {}
      if (fromParam || toParam) {
        const gte = fromParam ? new Date(fromParam as string) : undefined
        const lte = toParam ? new Date(toParam as string) : undefined
        const range: Record<string, Date> = {}
        if (gte && !isNaN(gte.getTime())) range.$gte = gte
        if (lte && !isNaN(lte.getTime())) {
          // include entire end day if only date provided
          lte.setHours(23,59,59,999)
          range.$lte = lte
        }
        if (Object.keys(range).length) {
          dateFilter.date = range
        }
      }

      const pageParam = req.query.page as string | undefined
      const limitParam = req.query.limit as string | undefined
      const hasPagination = !!(pageParam || limitParam)
      if (!hasPagination) {
        const docs = await ModelEntity.find(dateFilter).sort({ createdAt: -1 })
        return res.json(docs)
      }

      const pageRaw = parseInt(pageParam || '1', 10)
      const limitRaw = parseInt(limitParam || '12', 10)
      const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1
      const limit = Number.isFinite(limitRaw) && limitRaw > 0 ? limitRaw : 12
      const total = await ModelEntity.countDocuments(dateFilter)
      const pages = Math.max(1, Math.ceil(total / limit))
      const skip = (page - 1) * limit
      const items = await ModelEntity.find(dateFilter).sort({ createdAt: -1 }).skip(skip).limit(limit)
      res.json({ items, total, page, pages, limit })
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch', details: (err as Error).message })
    }
  },
  get: async (req: Request, res: Response) => {
    try {
      const doc = await ModelEntity.findById(req.params.id)
      if (!doc) return res.status(404).json({ error: 'Not found' })
      res.json(doc)
    } catch (err) {
      res.status(400).json({ error: 'Invalid id', details: (err as Error).message })
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const doc = await ModelEntity.findByIdAndUpdate(req.params.id, req.body, { new: true })
      if (!doc) return res.status(404).json({ error: 'Not found' })
      res.json(doc)
    } catch (err) {
      res.status(400).json({ error: 'Failed to update', details: (err as Error).message })
    }
  },
  remove: async (req: Request, res: Response) => {
    try {
      const doc = await ModelEntity.findByIdAndDelete(req.params.id)
      if (!doc) return res.status(404).json({ error: 'Not found' })
      res.status(204).send()
    } catch (err) {
      res.status(400).json({ error: 'Failed to delete', details: (err as Error).message })
    }
  },
})


