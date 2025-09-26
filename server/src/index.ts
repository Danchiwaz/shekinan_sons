import express from 'express'
import cors from 'cors'
import { env } from './config/env.js'
import { connectToDatabase } from './config/db.js'
import apiRouter from './routes/index.js'
import path from 'path'

const app = express()
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','x-admin-password'],
}))
app.use(express.json())

// Serve uploads
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')))

app.use('/api', apiRouter)

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
})

async function start() {
  await connectToDatabase()
  app.listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`)
  })
}

start()


