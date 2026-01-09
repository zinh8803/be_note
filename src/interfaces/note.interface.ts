export interface INote {
  _id?: any
  UserId: string
  title: string
  content: string
  createdAt?: Date
  updatedAt?: Date
}
export interface INoteInput {
  UserId: string
  title: string
  content: string
}
