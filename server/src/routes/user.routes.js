import { Router } from 'express'
import { checkUserExist, hashPassword, checkRegisterData, comparePassword, checkLoginData, createToken } from '../middlewares/user.middleware.js'
import { register, getUsers, login } from '../controllers/user.controller.js'

const router = Router()

router.get('/users', getUsers)
router.post('/register', checkRegisterData, checkUserExist, hashPassword, register)
router.post('/login', checkLoginData, comparePassword, createToken, login)

export default router
