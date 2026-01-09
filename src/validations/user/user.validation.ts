import { body } from 'express-validator'

export const userValidator = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters'),

  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  body('firstName').optional().isString().withMessage('First name must be a string'),

  body('lastName').optional().isString().withMessage('Last name must be a string'),

  body('imageUrl').optional().isURL().withMessage('Image URL must be a valid URL'),

  body('role').optional().isIn(['user', 'admin']).withMessage('Role must be either "user" or "admin"')
]

export const loginValidator = [
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required')
]
