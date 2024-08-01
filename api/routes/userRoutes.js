import express from 'express'
import { deleteUser, getUser, updateUser } from '../controllers/userControllers.js'
import verifyToken from '../verifyToken.js'


const router = express.Router()

router.put('/:id', verifyToken, updateUser)
router.delete('/:id', verifyToken , deleteUser)
router.get('/:id', getUser)


export default router