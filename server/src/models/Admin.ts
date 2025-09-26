import mongoose, { Schema, Document } from 'mongoose'

export interface AdminDocument extends Document {
  name: string
  email: string
  role: 'owner' | 'editor' | 'viewer'
}

const AdminSchema = new Schema<AdminDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: { type: String, enum: ['owner', 'editor', 'viewer'], default: 'editor' },
  },
  { timestamps: true }
)

export const Admin = mongoose.model<AdminDocument>('Admin', AdminSchema)


