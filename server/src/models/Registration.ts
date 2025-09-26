import mongoose, { Schema, Document, Types } from 'mongoose'

export interface RegistrationDocument extends Document {
  eventId: Types.ObjectId
  name: string
  phone: string
  createdAt: Date
}

const RegistrationSchema = new Schema<RegistrationDocument>({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
}, { timestamps: true })

export const Registration = mongoose.model<RegistrationDocument>('Registration', RegistrationSchema)




