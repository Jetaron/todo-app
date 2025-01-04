import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()


// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {

    const tasks = await prisma.task.findMany({
        where: {
            projectId: Number(req.query.projectId)

        }

    })



    res.status(200).json(tasks)
}




// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {

    if(!req.body.name) {
        res.status(400)
        throw new Error('Please add a task name')

    }

    const task = await prisma.task.create({
        data: {
            ...req.body,
            projectId: Number(req.body.projectId)

        }


    })


    res.status(201).json(task)
}

// @desc    Get task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res) => {


    const task = await prisma.task.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })

    if(!task) {
        res.status(404)
        throw new Error('Task not found')
    }

    res.status(200).json(task)

}




// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {


    const task = await prisma.task.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })


    if(!task) {
        res.status(404)
        throw new Error('Task not found')
    }

    const updatedTask = await prisma.task.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })


    res.status(200).json(updatedTask)
}


// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {


    const task = await prisma.task.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })


    if(!task) {
        res.status(404)
        throw new Error('Task not found')
    }


    await prisma.task.delete({
        where: {
            id: Number(req.params.id)
        }
    })


    res.status(200).json({message: 'Task deleted'})



}




export {getTasks, createTask, getTask, updateTask, deleteTask}