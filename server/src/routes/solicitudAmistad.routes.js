import { Router } from 'express'
import { getRequestByID, getFriendAcceptByID, sendSolicitud, acceptFriendRequest, rejectFriendRequest } from '../controllers/solicitudAmistad.controller.js'

const router = Router()

// get
router.get('/friendRequests/:recibir_solicitud_id', getRequestByID)
router.get('/friendRequestsAccept/:recibir_solicitud_id', getFriendAcceptByID)

// post
router.post('/friendRequests', sendSolicitud)
router.post('/friendRequests/:id_solicitud/accept', acceptFriendRequest)
router.post('/friendRequests/:id_solicitud/reject', rejectFriendRequest)

export default router
