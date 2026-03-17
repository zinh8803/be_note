import mongoose, { Schema, Document } from 'mongoose'

export interface IRefreshToken extends Document {
  UserId: string
  token: string
  createdAt: Date
  updatedAt: Date
}
const RefreshTokenSchema: Schema = new Schema(
  {
    UserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true }
  },
  { timestamps: true }
)
const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', RefreshTokenSchema)
export default RefreshToken
