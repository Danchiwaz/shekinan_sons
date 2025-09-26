import mongoose from 'mongoose'
import { env } from './env.js'

export async function connectToDatabase(): Promise<typeof mongoose> {
  mongoose.set('strictQuery', true)
  try {
    const conn = await mongoose.connect(env.mongoUri)
    console.log(`MongoDB connected: ${conn.connection.host}`)
    return conn
  } catch (error) {
    console.error('Failed to connect to MongoDB', error)
    process.exit(1)
  }
}

