import mongoose, { Schema, Document } from 'mongoose'

export interface SermonDocument extends Document {
  title: string
  description?: string
  speaker: string
  date: Date
  durationMinutes?: number
  videoUrl?: string
  audioUrl?: string
  thumbnailUrl?: string
  tags: string[]
}

const SermonSchema = new Schema<SermonDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    speaker: { type: String, required: true },
    date: { type: Date, required: true },
    durationMinutes: { type: Number },
    videoUrl: { type: String },
    audioUrl: { type: String },
    thumbnailUrl: { type: String },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
)

export const Sermon = mongoose.model<SermonDocument>('Sermon', SermonSchema)

