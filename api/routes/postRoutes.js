import express from 'express'
import { createPost, deletePost, getPostdetails, getPosts, getUserPost, updatePost } from '../controllers/postControllers.js';

const router = express.Router();

router.post('/create', createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.get('/', getPosts)
router.get('/:id', getPostdetails)
router.get('/user/:userId', getUserPost)

export default router;