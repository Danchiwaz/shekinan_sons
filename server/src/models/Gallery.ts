import mongoose, { Schema, Document } from 'mongoose'

export interface GalleryDocument extends Document {
  url: string
  caption?: string
  createdAt: Date
  updatedAt: Date
}

const GallerySchema = new Schema<GalleryDocument>({
  url: { type: String, required: true, trim: true },
  caption: { type: String, default: '' },
}, { timestamps: true })

export const Gallery = mongoose.model<GalleryDocument>('Gallery', GallerySchema)


