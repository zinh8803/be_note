import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import { connectDB } from './config/database'
import apiRoutes from './routes/index'
import { errorHandler } from './middlewares/error.middleware'
import cors from 'cors'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
connectDB()
app.use(cors({ origin: process.env.URL_CLIENT, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api', apiRoutes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
