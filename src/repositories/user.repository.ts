import User, { IUser } from '../models/User'
import { IUserInput } from '../interfaces/user.interface'
export class UserRepository {
  async findAll(query?: any): Promise<IUser[]> {
    return User.find(query || {})
      .select('-password')
      .exec()
  }

  async findById(userId: string): Promise<IUser | null> {
    return User.findById(userId).select('-password').exec()
  }

  async create(data: IUserInput): Promise<IUser> {
    const user = new User(data)
    return user.save()
  }

  async find(query?: any): Promise<IUser[]> {
    return User.find(query || {}).exec()
  }
}
