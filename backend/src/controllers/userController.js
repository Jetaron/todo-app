import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

    // Find if user already exists
  const userExists = await prisma.user.findUnique({
    where: {
        email: email
    },
})

if(userExists) {
    res.status(400)
    throw new Error('User already exists')
}



  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
}




// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = async (req, res) => {

    const {email, password} = req.body

    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
    })

    // Check user and passwords match
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user.id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')

    }

}

// @desc    Get current user
// @route   /api/users/current
// @access  Private
const getCurrentUser = async (req, res) => {

    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
    })

    res.status(200).json(user)


}


// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}


export {registerUser, loginUser, getCurrentUser}