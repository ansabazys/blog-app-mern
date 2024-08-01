import express from 'express'
import { logInUser, logOutUser, refetchUser, regUser } from '../controllers/authControllers.js'

const router = express.Router()

router.post('/register', regUser)
router.post('/login', logInUser)
router.get('/logout', logOutUser)
router.get('/refetch', refetchUser)

export default router