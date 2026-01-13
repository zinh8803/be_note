export interface IRefreshToken {
  UserId: string
  token: string
  createdAt: Date
  updatedAt: Date
}
export interface IRefreshTokenInput {
  UserId: string
  token: string
}
