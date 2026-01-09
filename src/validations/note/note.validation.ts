import { body } from 'express-validator'

export const noteValidator = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title must be at most 100 characters long'),
  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ max: 1000 })
    .withMessage('Content must be at most 1000 characters long')
]
export const noteUpdateValidator = [
  body('title').optional().isLength({ max: 100 }).withMessage('Title must be at most 100 characters long'),
  body('content').optional().isLength({ max: 1000 }).withMessage('Content must be at most 1000 characters long')
]
