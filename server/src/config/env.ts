import dotenv from 'dotenv'

dotenv.config()

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '4000', 10),
  mongoUri: process.env.MONGO_URI || '',
}

if (!env.mongoUri) {
  console.warn('MONGO_URI not set. Please create a .env file in server/ with MONGO_URI')
}

