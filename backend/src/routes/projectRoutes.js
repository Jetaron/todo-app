import express from 'express'
import {getProjects, createProject, getProject, updateProject, deleteProject} from '../controllers/projectController'



const router = express.Router()

router.route('/').get(getProjects).post(createProject)
router.route('/:id').get(getProject).put(updateProject).delete(deleteProject)



export default router