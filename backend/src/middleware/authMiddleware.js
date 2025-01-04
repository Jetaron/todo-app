import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()


const protect = async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)


            // Get user from token
            req.user = await prisma.user.findUnique({
                where: {
                    id: decoded.id
                },
            })

            next()




        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }

    }


    if(!token) {
        res.status(401)
        throw new Error('Not authorized')

    }
}



export {protect}