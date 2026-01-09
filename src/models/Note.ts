import mongoose, { Schema, Document } from 'mongoose'

export interface INote extends Document {
  UserId: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

const NoteSchema: Schema = new Schema(
  {
    UserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true }
  },
  { timestamps: true }
)

const Note = mongoose.model<INote>('Note', NoteSchema)
export default Note
