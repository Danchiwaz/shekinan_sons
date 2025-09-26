import mongoose, { Schema, Document } from 'mongoose'

export interface DevotionDocument extends Document {
  title: string
  verse: string
  content: string
  date: Date
  coverImageUrl?: string
}

const DevotionSchema = new Schema<DevotionDocument>({
  title: { type: String, required: true, trim: true },
  verse: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  coverImageUrl: { type: String },
}, { timestamps: true })

export const Devotion = mongoose.model<DevotionDocument>('Devotion', DevotionSchema)


