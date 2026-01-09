import express from 'express'
import { userController } from '../container'
import { userValidator, loginValidator, updateUserValidator } from '../validations/user/user.validation'
import { validate } from '../middlewares/validation.middleware'

const router = express.Router()

router.get('/', userController.getAllUsers.bind(userController))
router.get('/:id', userController.getUserById.bind(userController))
router.put('/update', validate(updateUserValidator), userController.update.bind(userController))
router.get('/me', userController.me.bind(userController))
router.post('/register', validate(userValidator), userController.register.bind(userController))
router.post('/login', validate(loginValidator), userController.login.bind(userController))
router.post('/logout', userController.logout.bind(userController))
export default router
