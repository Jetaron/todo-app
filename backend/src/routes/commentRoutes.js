import express from 'express'
import {getComments, createComment, deleteComment} from '../controllers/commentController'



const router = express.Router()


router.route('/').get(getComments).post(createComment)
router.route('/:id').delete(deleteComment)



export default router