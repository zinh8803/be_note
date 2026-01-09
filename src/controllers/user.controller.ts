import { UserService } from '../services/user.service'
import { sendResponse } from '../utils/response.util'
import { STATUS_CODES, ERROR_MESSAGES } from '../constants/api.constants'
import { Request, Response, NextFunction } from 'express'

export class UserController {
  constructor(private userService: UserService) {}
  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await this.userService.getAllUsers()
      sendResponse(res, STATUS_CODES.OK, true, undefined, users)
    } catch (error: any) {
      const status = error.status || error.statusCode || STATUS_CODES.INTERNAL_SERVER
      sendResponse(res, status, false, error.message || ERROR_MESSAGES.SERVER_ERROR)
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params.id
      if (userId === 'me') {
        const token = req.cookies?.token
        if (!token) {
          sendResponse(res, STATUS_CODES.UNAUTHORIZED, false, 'No token provided')
          return
        }
        const user = await this.userService.me(token)
        if (!user) {
          sendResponse(res, STATUS_CODES.UNAUTHORIZED, false, 'Invalid token')
          return
        }
        sendResponse(res, STATUS_CODES.OK, true, undefined, user)
        return
      }
      const user = await this.userService.getUserById(userId)
      if (user) {
        sendResponse(res, STATUS_CODES.OK, true, undefined, user)
      } else {
        sendResponse(res, STATUS_CODES.NOT_FOUND, false, ERROR_MESSAGES.NOT_FOUND)
      }
    } catch (error: any) {
      const status = error.status || error.statusCode || STATUS_CODES.INTERNAL_SERVER
      sendResponse(res, status, false, error.message || ERROR_MESSAGES.SERVER_ERROR)
    }
  }

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = req.body
      await this.userService.registerUser(userData)

      sendResponse(res, STATUS_CODES.CREATED, true, 'Đăng ký thành công', null)
    } catch (error: any) {
      const status = error.status || error.statusCode || STATUS_CODES.INTERNAL_SERVER
      sendResponse(res, status, false, error.message || ERROR_MESSAGES.SERVER_ERROR)
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body
      const { token, refreshToken } = await this.userService.loginUser(email, password)
      // Set token in HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000 // 1 hour
      })
      // Optionally set refresh token in cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      })
      sendResponse(res, STATUS_CODES.OK, true, 'Đăng nhập thành công', { refreshToken })
    } catch (error: any) {
      const status = error.status || error.statusCode || STATUS_CODES.INTERNAL_SERVER
      sendResponse(res, status, false, error.message || ERROR_MESSAGES.SERVER_ERROR)
    }
  }

  async me(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.cookies?.token
      if (!token) {
        sendResponse(res, STATUS_CODES.UNAUTHORIZED, false, 'No token provided')
        return
      }
      const user = await this.userService.me(token)
      if (!user) {
        sendResponse(res, STATUS_CODES.UNAUTHORIZED, false, 'Invalid token')
        return
      }
      sendResponse(res, STATUS_CODES.OK, true, undefined, user)
    } catch (error: any) {
      const status = error.status || error.statusCode || STATUS_CODES.INTERNAL_SERVER
      sendResponse(res, status, false, error.message || ERROR_MESSAGES.SERVER_ERROR)
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.cookies?.token
      if (!token) {
        sendResponse(res, STATUS_CODES.UNAUTHORIZED, false, 'No token provided')
        return
      }
      const user = await this.userService.me(token)
      if (!user) {
        sendResponse(res, STATUS_CODES.UNAUTHORIZED, false, 'Invalid token')
        return
      }
      const data = req.body
      const updatedUser = await this.userService.updateUser(user._id, data)
      if (!updatedUser) {
        sendResponse(res, STATUS_CODES.NOT_FOUND, false, ERROR_MESSAGES.NOT_FOUND)
        return
      }
      sendResponse(res, STATUS_CODES.OK, true, 'Cập nhật thành công', updatedUser)
    } catch (error: any) {
      const status = error.status || error.statusCode || STATUS_CODES.INTERNAL_SERVER
      sendResponse(res, status, false, error.message || ERROR_MESSAGES.SERVER_ERROR)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.clearCookie('token')
      res.clearCookie('refreshToken')
      sendResponse(res, STATUS_CODES.OK, true, 'Đăng xuất thành công')
    } catch (error: any) {
      const status = error.status || error.statusCode || STATUS_CODES.INTERNAL_SERVER
      sendResponse(res, status, false, error.message || ERROR_MESSAGES.SERVER_ERROR)
    }
  }
}
