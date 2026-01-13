import { Request, Response, NextFunction } from 'express'

export interface AppError extends Error {
  statusCode?: number
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = err.statusCode || 500

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    errors: (err as any).errors,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`) as AppError
  error.statusCode = 404
  next(error)
}
