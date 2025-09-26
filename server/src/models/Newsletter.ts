import mongoose, { Schema, Document } from 'mongoose'

export interface NewsletterDocument extends Document {
  email: string
  subscribedAt: Date
}

const NewsletterSchema = new Schema<NewsletterDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    subscribedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export const Newsletter = mongoose.model<NewsletterDocument>('Newsletter', NewsletterSchema)

