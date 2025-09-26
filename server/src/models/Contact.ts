import mongoose, { Schema, Document } from 'mongoose'

export interface ContactDocument extends Document {
  name: string
  email?: string
  subject?: string
  message: string
  handled: boolean
}

const ContactSchema = new Schema<ContactDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: false, lowercase: true, trim: true },
    subject: { type: String },
    message: { type: String, required: true },
    handled: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Contact = mongoose.model<ContactDocument>('Contact', ContactSchema)

