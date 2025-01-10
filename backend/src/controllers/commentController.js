import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

// @desc    Get comments
// @route   GET /api/comments
// @access  Private
const getComments = async (req, res) => {


    const comments = await prisma.comment.findMany({
        where: {
            taskId: Number(req.query.taskId)
        }
    })


    res.status(200).json(comments)
}





// @desc    Create new comment
// @route   POST /api/comments
// @access  Private
const createComment = async (req, res) => {


    const comment = await prisma.comment.create({
        data: {
            ...req.body,
            authorId: req.user.id,
            taskId: Number(req.body.taskId)


        }
    })

    res.status(201).json(comment)


}




// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = async (req, res) => {


    const comment = await prisma.comment.delete({
        where: {
            id: Number(req.params.id)
        }


    })


    res.status(200).json({message: 'Comment deleted'})


}


export {getComments, createComment, deleteComment}import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

// @desc    Get comments
// @route   GET /api/comments
// @access  Private
const getComments = async (req, res) => {


    const comments = await prisma.comment.findMany({
        where: {
            taskId: Number(req.query.taskId)
        }
    })


    res.status(200).json(comments)
}





// @desc    Create new comment
// @route   POST /api/comments
// @access  Private
const createComment = async (req, res) => {


    const comment = await prisma.comment.create({
        data: {
            ...req.body,
            authorId: req.user.id,
            taskId: Number(req.body.taskId)


        }
    })

    res.status(201).json(comment)


}




// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = async (req, res) => {


    const comment = await prisma.comment.delete({
        where: {
            id: Number(req.params.id)
        }


    })


    res.status(200).json({message: 'Comment deleted'})


}


export {getComments, createComment, deleteComment}