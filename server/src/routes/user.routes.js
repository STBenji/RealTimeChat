import { Router } from 'express'
import { getUsers, login, register, searchUser } from '../controllers/user.controller.js'

const router = Router()

// get
router.get('/users', getUsers)
router.get('/searchUser', searchUser)

// post
router.post('/register', register)
router.post('/login', login)

export default router