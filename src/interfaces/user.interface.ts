export interface IUser {
  _id?: any // Thêm dòng này
  username: string
  email: string
  password?: string
  firstName?: string
  lastName?: string
  imageUrl?: string
  role: 'user' | 'admin'
  createdAt?: Date
  updatedAt?: Date
}
export interface IUserInput {
  username: string
  email: string
  password: string
  firstName?: string
  lastName?: string
  imageUrl?: string
  role?: 'user' | 'admin'
}
