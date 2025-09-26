import mongoose, { Schema, Document } from 'mongoose'

export interface EventDocument extends Document {
  title: string
  description?: string
  location: string
  startAt: Date
  endAt?: Date
  coverImageUrl?: string
  category?: string
}

const EventSchema = new Schema<EventDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    location: { type: String, required: true },
    startAt: { type: Date, required: true },
    endAt: { type: Date },
    coverImageUrl: { type: String },
    category: { type: String },
  },
  { timestamps: true }
)

export const Event = mongoose.model<EventDocument>('Event', EventSchema)

