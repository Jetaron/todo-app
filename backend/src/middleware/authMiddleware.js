import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token
            req.user = await prisma.user.findUnique({
                where: {
                    id: decoded.id,
                },
                select: { // Обираємо тільки потрібні поля
                    id: true,
                    email: true,
                    // ... інші поля, якщо потрібно
                }
            });

            next();

        } catch (error) {
            console.error(error); // Виводимо помилку в консоль для налагодження
            res.status(401);
            // Використовуємо next для передачі помилки в обробник помилок
            return next(new Error('Not authorized'));
        }
    }

    if (!token) {
        res.status(401);
        return next(new Error('Not authorized, no token')); // Додано повідомлення про відсутність токена
    }
};

export { protect };