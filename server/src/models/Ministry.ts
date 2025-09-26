import mongoose, { Schema, Document } from 'mongoose'

export interface MinistryDocument extends Document {
  name: string
  description?: string
  leader?: string
  imageUrl?: string
}

const MinistrySchema = new Schema<MinistryDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    leader: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
)

export const Ministry = mongoose.model<MinistryDocument>('Ministry', MinistrySchema)

