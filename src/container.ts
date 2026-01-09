import { UserService } from './services/user.service'
import { UserController } from './controllers/user.controller'
import { UserRepository } from './repositories/user.repository'
import { NoteService } from './services/note.service'
import { NoteController } from './controllers/note.controller'
import { NoteRepository } from './repositories/note.repository'

// userservice và usercontroller
const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

// NoteService và NoteController
const noteRepository = new NoteRepository()
const noteService = new NoteService(noteRepository)
const noteController = new NoteController(noteService, userService)

// Export các instance để dùng lại
export { userRepository, userService, userController, noteRepository, noteService, noteController }