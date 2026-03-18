import { Request, Response, NextFunction } from 'express'
import { NoteService } from '../services/note.service'
import { UserService } from '../services/user.service'
import { sendResponse } from '../utils/response.util'
import { STATUS_CODES, ERROR_MESSAGES } from '../constants/api.constants'

export class NoteController {
  constructor(
    private noteService: NoteService,
    private userService: UserService
  ) {}

  async getAllNotes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const notes = await this.noteService.getAllNotes()
      sendResponse(res, STATUS_CODES.OK, true, undefined, notes)
    } catch (error: any) {
      const status = error.status || error.statusCode || STATUS_CODES.INTERNAL_SERVER
      sendResponse(res, status, false, error.message || ERROR_MESSAGES.SERVER_ERROR)
    }
  }

  async getNoteByToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.cookies?.token
      if (!token) {
        sendResponse(res, STATUS_CODES.UNAUTHORIZED, false, 'No token provided')
        return
      }
      const user = await this.userService.me(token)
      if (!user || !user._id) {
        sendResponse(res, STATUS_CODES.UNAUTHORIZED, false, 'Invalid token')
        return
      }
      const notes = await this.noteService.getAllNotes({ UserId: user._id })
      sendResponse(res, STATUS_CODES.OK, true, undefined, notes)
    } catch (error: any) {
      const status = error.status || error.statusCode || STATUS_CODES.INTERNAL_SERVER
      sendResponse(res, status, false, error.message || ERROR_MESSAGES.SERVER_ERROR)
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.cookies?.token
      if (!token) {
        sendResponse(res, STATUS_CODES.UNAUTHORIZED, false, 'No token provided')
        return
      }
      const user = await this.userService.me(token)
      if (!user || !user._id) {
        sendResponse(res, STATUS_CODES.UNAUTHORIZED, false, 'Invalid token')
        return
      }
      const noteData = {
        ...req.body,
        UserId: user._id
      }
      const note = await this.noteService.createNote(noteData)
      sendResponse(res, STATUS_CODES.CREATED, true, 'Tạo note thành công', note)
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
      if (!user || !user._id) {
        sendResponse(res, STATUS_CODES.UNAUTHORIZED, false, 'Invalid token')
        return
      }
      const noteId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
      if (!noteId) {
        sendResponse(res, STATUS_CODES.BAD_REQUEST, false, 'Invalid note id')
        return
      }
      const note = await this.noteService.getNoteById(noteId)
      if (!note) {
        sendResponse(res, STATUS_CODES.NOT_FOUND, false, ERROR_MESSAGES.NOT_FOUND)
        return
      }
      if (String(note.UserId) !== String(user._id)) {
        sendResponse(res, STATUS_CODES.FORBIDDEN, false, 'Bạn không có quyền cập nhật note này')
        return
      }
      const noteData = {
        ...req.body,
        UserId: user._id
      }
      const updatedNote = await this.noteService.updateNote(noteId, noteData)
      sendResponse(res, STATUS_CODES.OK, true, 'Cập nhật note thành công', updatedNote)
    } catch (error: any) {
      const status = error.status || error.statusCode || STATUS_CODES.INTERNAL_SERVER
      sendResponse(res, status, false, error.message || ERROR_MESSAGES.SERVER_ERROR)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.cookies?.token
      if (!token) {
        sendResponse(res, STATUS_CODES.UNAUTHORIZED, false, 'No token provided')
        return
      }
      const user = await this.userService.me(token)
      if (!user || !user._id) {
        sendResponse(res, STATUS_CODES.UNAUTHORIZED, false, 'Invalid token')
        return
      }
      const noteId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
      if (!noteId) {
        sendResponse(res, STATUS_CODES.BAD_REQUEST, false, 'Invalid note id')
        return
      }
      const note = await this.noteService.getNoteById(noteId)
      if (!note) {
        sendResponse(res, STATUS_CODES.NOT_FOUND, false, ERROR_MESSAGES.NOT_FOUND)
        return
      }
      if (String(note.UserId) !== String(user._id)) {
        sendResponse(res, STATUS_CODES.FORBIDDEN, false, 'Bạn không có quyền xóa note này')
        return
      }
      const deletedNote = await this.noteService.deleteNote(noteId)
      sendResponse(res, STATUS_CODES.OK, true, 'Xóa note thành công', deletedNote)
    } catch (error: any) {
      const status = error.status || error.statusCode || STATUS_CODES.INTERNAL_SERVER
      sendResponse(res, status, false, error.message || ERROR_MESSAGES.SERVER_ERROR)
    }
  }
}
