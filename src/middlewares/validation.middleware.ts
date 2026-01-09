import { Request, Response, NextFunction } from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { AppError } from './error.middleware'

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validations.map((v) => v.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) return next()

    const extractedErrors: Record<string, string> = {}
    errors.array().forEach((err) => {
      if (err.type === 'field' && err.path) {
        extractedErrors[err.path] = err.msg
      }
    })

    const error = new Error('Validation failed') as AppError
    error.statusCode = 400
    ;(error as any).errors = extractedErrors

    next(error)
  }
}
