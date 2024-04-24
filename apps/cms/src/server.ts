import express from 'express'
import payload from 'payload'
import path from 'path'
import dotenv from 'dotenv'
import { seedLocalData } from './seed'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const app = express()

app.get('/', (_, res) => {
  res.redirect('/admin')
})

app.use('/', express.static(path.join(__dirname, '/public')))

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  payload.globals.config

  if (process.env.PAYLOAD_SEED_LOCAL_DATA === 'true') {
    await seedLocalData()
  }

  app.listen(3001)
}

start()
