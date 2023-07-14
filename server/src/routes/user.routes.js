import { Router } from 'express'
import { getUsers, login, register } from '../controllers/user.controller.js'

const router = Router()

// get
router.get('/users', getUsers)

// post
router.post('/register', register)
router.post('/login', login)

export default router