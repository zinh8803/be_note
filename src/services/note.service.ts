import { INote } from '~/interfaces/note.interface'
import { NoteRepository } from '~/repositories/note.repository'

export class NoteService {
  constructor(private noteRepository: NoteRepository) {}

  async getAllNotes(query?: any): Promise<INote[]> {
    return this.noteRepository.findAll(query)
  }

  async getNoteById(noteId: string): Promise<INote | null> {
    return this.noteRepository.findById(noteId)
  }

  async createNote(data: INote): Promise<INote> {
    return this.noteRepository.create(data)
  }

  async updateNote(noteId: string, data: Partial<INote>): Promise<INote | null> {
    return this.noteRepository.update(noteId, data)
  }

  async deleteNote(noteId: string): Promise<INote | null> {
    return this.noteRepository.delete(noteId)
  }
}
