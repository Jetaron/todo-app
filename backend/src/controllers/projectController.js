import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {

    const projects = await prisma.project.findMany({
        where: {
            authorId: req.user.id
        }
    })

    res.status(200).json(projects)
}


// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {

    const {name, description} = req.body

    if(!name) {
        res.status(400)
        throw new Error('Please add a project name')
    }

    const project = await prisma.project.create({
        data: {
            name,
            description,
            authorId: req.user.id
        }
    })

    res.status(201).json(project)
}



// @desc    Get project
// @route   GET /api/projects/:id
// @access  Private
const getProject = async (req, res) => {

    const project = await prisma.project.findUnique({
        where: {
            id: Number(req.params.id),
            authorId: req.user.id
        }
    })

    if(!project) {
        res.status(404)
        throw new Error('Project not found')

    }


    res.status(200).json(project)

}




// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {


    const project = await prisma.project.findUnique({
        where: {
            id: Number(req.params.id),
            authorId: req.user.id
        }
    })

    if(!project) {
        res.status(404)
        throw new Error('Project not found')

    }


    const updatedProject = await prisma.project.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(updatedProject)



}




// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {

    const project = await prisma.project.findUnique({
        where: {
            id: Number(req.params.id),
            authorId: req.user.id
        }
    })

    if(!project) {
        res.status(404)
        throw new Error('Project not found')

    }

    await prisma.project.delete({
        where: {
            id: Number(req.params.id)
        }
    })


    res.status(200).json({message: "Project deleted"})
}


export  {getProjects, createProject, getProject, updateProject, deleteProject}