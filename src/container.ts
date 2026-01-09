import { UserService } from './services/user.service'
import { UserController } from './controllers/user.controller'
import { UserRepository } from './repositories/user.repository'

// userservice và usercontroller
const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

// Export các instance để dùng lại
export { userRepository, userService, userController }
