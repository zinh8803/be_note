import express from 'express'
import { noteController } from '../container'
import { validate } from '../middlewares/validation.middleware'
import { noteUpdateValidator, noteValidator } from '~/validations/note/note.validation'

const router = express.Router()

router.get('/', noteController.getAllNotes.bind(noteController))
router.post('/', validate(noteValidator), noteController.create.bind(noteController))
//router.delete('/:id', noteController.delete.bind(noteController))
router.get('/me', noteController.getNoteByToken.bind(noteController))
router.put('/update/:id', validate(noteUpdateValidator), noteController.update.bind(noteController))
router.delete('/delete/:id', noteController.delete.bind(noteController))

export default router
