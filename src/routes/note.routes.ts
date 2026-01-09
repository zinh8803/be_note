import express from 'express'
import { noteController } from '../container' // Đảm bảo bạn đã khởi tạo noteController với NoteService và UserService
const router = express.Router()

router.get('/', noteController.getAllNotes.bind(noteController))
router.post('/', noteController.create.bind(noteController))
router.delete('/:id', noteController.delete.bind(noteController))
router.get('/me', noteController.getNoteByToken.bind(noteController))
router.put('/update/:id', noteController.update.bind(noteController))
router.delete('/delete/:id', noteController.delete.bind(noteController))

export default router
