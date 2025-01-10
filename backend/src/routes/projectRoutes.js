import express from 'express';
const router = express.Router();
import { createProject, getAllProjects, getProjectById, updateProject, deleteProject } from '../controllers/projectController.js';


// Створення нового проекту
router.post('/', createProject);

// Отримання всіх проектів
router.get('/', getAllProjects);

// Отримання проекту за ID
router.get('/:id', getProjectById);

// Оновлення проекту за ID
router.put('/:id', updateProject);

// Видалення проекту за ID
router.delete('/:id', deleteProject);


export default router;