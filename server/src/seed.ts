import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Sermon } from './models/Sermon.js'
import { Event } from './models/Event.js'
import { Testimonial } from './models/Testimonial.js'
import { Newsletter } from './models/Newsletter.js'
import { Contact } from './models/Contact.js'
import { Ministry } from './models/Ministry.js'

dotenv.config()

async function seed() {
  const uri = process.env.MONGO_URI
  if (!uri) {
    throw new Error('MONGO_URI missing in .env')
  }

  // Ensure collections are created in a specific DB
  await mongoose.connect(uri, { dbName: 'shekinah' })
  console.log('Connected for seeding')

  const ops: Array<Promise<any>> = []

  const sermonCount = await Sermon.countDocuments()
  if (sermonCount === 0) {
    ops.push(
      Sermon.create({
        title: 'Finding Peace in Troubled Times',
        speaker: 'Pastor John Smith',
        date: new Date(),
        durationMinutes: 42,
        tags: ['peace', 'faith'],
      })
    )
  }

  const eventCount = await Event.countDocuments()
  if (eventCount === 0) {
    ops.push(
      Event.create({
        title: 'Summer Bible Study',
        location: 'Main Sanctuary',
        startAt: new Date(),
      })
    )
  }

  const testimonialCount = await Testimonial.countDocuments()
  if (testimonialCount === 0) {
    ops.push(
      Testimonial.create({
        name: 'Grace Wanjiku',
        since: '2020',
        quote: 'I found peace and purpose here. The worship is uplifting.',
        stars: 5,
      })
    )
  }

  const ministryCount = await Ministry.countDocuments()
  if (ministryCount === 0) {
    ops.push(
      Ministry.create({
        name: 'Youth Ministry',
        description: 'Empowering the next generation in faith',
      })
    )
  }

  const newsletterCount = await Newsletter.countDocuments()
  if (newsletterCount === 0) {
    ops.push(Newsletter.create({ email: 'demo@example.com' }))
  }

  const contactCount = await Contact.countDocuments()
  if (contactCount === 0) {
    ops.push(
      Contact.create({
        name: 'Demo User',
        email: 'demo@example.com',
        subject: 'Hello',
        message: 'Just saying hello!'
      })
    )
  }

  await Promise.all(ops)
  console.log('Seeding complete')
  await mongoose.connection.close()
}

seed().catch(async (err) => {
  console.error(err)
  await mongoose.connection.close()
  process.exit(1)
})


