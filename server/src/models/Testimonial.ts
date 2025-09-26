import mongoose, { Schema, Document } from 'mongoose'

export interface TestimonialDocument extends Document {
  name: string
  since?: string
  quote: string
  imgSrc?: string
  stars?: number
  approved: boolean
}

const TestimonialSchema = new Schema<TestimonialDocument>(
  {
    name: { type: String, required: true },
    since: { type: String },
    quote: { type: String, required: true },
    imgSrc: { type: String },
    stars: { type: Number, min: 1, max: 5, default: 5 },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Testimonial = mongoose.model<TestimonialDocument>('Testimonial', TestimonialSchema)

