import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();

// Генерація JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Термін дії токена - 30 днів
    });
};


const registerUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400);
            throw new Error("Будь ласка, введіть всі поля");
        }

        // Перевірка, чи користувач вже існує
        const userExists = await prisma.user.findUnique({ where: { email } });

        if (userExists) {
            res.status(400);
            throw new Error("Користувач з таким email вже існує");
        }


        // Хешування пароля
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Створення користувача
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            res.status(400);
            throw new Error("Не вдалося створити користувача");
        }
    }
     catch (error) {
        next(error);
    }
};




const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            res.status(400);
            throw new Error("Неправильний email або пароль");
        }
    } catch (error) {
        next(error);
    }
};



//  (Опційно) Отримання даних поточного користувача
const getMe = async (req, res) => {
    const { _id, email } = await prisma.user.findUnique({where:{id: req.user.id}})
    res.status(200).json({
        id: _id,
        email
    })
}



export { registerUser, loginUser, getMe };