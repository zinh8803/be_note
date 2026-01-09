import express from 'express'
// Import route modules
//import postRoutes from "./post.routes";
import userRoutes from './user.routes'
import noteRoutes from './note.routes'

const router = express.Router()

// Base route for API health check
router.get('/', (req, res) => {
  res.json({ message: 'API is running' })
})

// Mount route modules
//router.use("/posts", postRoutes);
router.use('/users', userRoutes)
router.use('/notes', noteRoutes)

export default router
