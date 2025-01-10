import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js'; // Імпорт middleware

const router = express.Router();

// Реєстрація
router.post('/register', async (req, res, next) => {
    try {
      await registerUser(req, res, next);
    } catch (error) {
      next(error); // Передача помилки в загальний обробник помилок
    }
  });
  

// Логін
router.post('/login', async (req, res, next) => {
    try {
        await loginUser(req, res, next);
    } catch (error) {
        next(error);
    }
});


// Отримання інформації про поточного користувача (захищений маршрут)
router.get('/me', protect, async (req, res, next) => {
    try {
        await getMe(req, res, next);
    } catch (error) {
        next(error)
    }
});



export default router;