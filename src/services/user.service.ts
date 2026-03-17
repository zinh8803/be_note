import { IUser, IUserInput } from '../interfaces/user.interface'
import { UserRepository } from '../repositories/user.repository'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt, { JwtPayload } from 'jsonwebtoken'
import RefreshTokenModel from '../models/RefreshToken'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<IUser[]> {
    return this.userRepository.findAll()
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return this.userRepository.findById(userId)
  }

  async me(token: string): Promise<IUser | null> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
      if (!decoded || !decoded.id) {
        return null
      }
      // Lấy user không có password
      return this.userRepository.findById(decoded.id)
    } catch (err) {
      return null
    }
  }

  async refreshToken(oldRefreshToken: string): Promise<any> {
    // Tìm refreshToken trong DB
    const found = await RefreshTokenModel.findOne({ token: oldRefreshToken })
    if (!found) {
      const error: any = new Error('Invalid refresh token')
      error.status = 401
      throw error
    }
    // Lấy userId từ refreshToken
    const userId = found.UserId
    const user = await this.userRepository.findById(userId)
    if (!user) {
      const error: any = new Error('User not found')
      error.status = 404
      throw error
    }
    // Tạo access token mới
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' })
    return { token }
  }

  async registerUser(data: IUserInput): Promise<IUser> {
    const existingUsers = await this.userRepository.findAll({ email: data.email })
    if (existingUsers.length > 0) {
      throw new Error('Email already in use')
    }
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const userData = { ...data, password: hashedPassword }
    return this.userRepository.create(userData)
  }

  async loginUser(email: string, password: string): Promise<any> {
    const users = await this.userRepository.find({ email })
    if (users.length === 0) {
      const error: any = new Error('Invalid email or password')
      error.status = 401
      throw error
    }
    const user = users[0]
    if (!user.password) {
      console.log('User password is missing for user:', user)
      const error: any = new Error('User password is not set')
      error.status = 500
      throw error
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      const error: any = new Error('Invalid email or password')
      error.status = 401
      throw error
    }
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' })
    const refreshToken = bcrypt.genSaltSync(10)
    await RefreshTokenModel.create({ UserId: user._id.toString(), token: refreshToken })
    return { token, refreshToken }
  }

  async updateUser(userId: string, data: Partial<IUserInput>): Promise<IUser | null> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10)
    }
    return this.userRepository.update(userId, data)
  }
}
