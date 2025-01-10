import express from 'express';
import { PrismaClient } from '@prisma/client';
import projectRoutes from './routes/projectRoutes.js'; // Імпорт маршрутів для проектів
import taskRoutes from './routes/taskRoutes.js';     // Імпорт маршрутів для задач
import userRoutes from './routes/userRoutes.js';     // Імпорт маршрутів для користувачів

const prisma = new PrismaClient();
const app = express();
const port = 3001;

app.use(express.json());


// Використання маршрутів
// Префікс '/projects' буде додано до всіх маршрутів в projectRoutes
app.use('/projects', projectRoutes);
// Аналогічно для задач та користувачів
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);


// Базовий маршрут для перевірки
app.get('/', (req, res) => {
  res.send('Сервер працює!');
});

// Обробка помилок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Помилка сервера' });
});


const server = app.listen(port, () => {
  console.log(`Сервер запущено на порті ${port}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  server.close(() => {
    console.log('HTTP server closed')
  })
})


export default app;