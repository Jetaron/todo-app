import express from 'express'
const router = express.Router()
import {registerUser, loginUser, getCurrentUser} from '../controllers/userController'
import {protect} from '../middleware/authMiddleware'



router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/current', protect, getCurrentUser)




export default router;