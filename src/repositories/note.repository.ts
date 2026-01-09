import { INoteInput } from "~/interfaces/note.interface"
import Note, { INote } from "~/models/Note"

export class NoteRepository {
  async findAll(query?: any): Promise<INote[]> {
    return Note.find(query || {}).exec()
  }

  async findById(noteId: string): Promise<INote | null> {
    return Note.findById(noteId).exec()
  }

  async create(data: INoteInput): Promise<INote> {
    const note = new Note(data)
     return note.save()
  }

  async update(noteId: string, data: Partial<INoteInput>): Promise<INote | null> {
    return Note.findByIdAndUpdate(noteId, data, { new: true }).exec()
  }

  async delete(noteId: string): Promise<INote | null> {
    return Note.findByIdAndDelete(noteId).exec()
  }

}