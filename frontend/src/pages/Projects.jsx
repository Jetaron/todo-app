
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProjectList from '../components/ProjectList'
import CreateProjectForm from '../components/CreateProjectForm'




const Projects = () => {


    const [projects, setProjects] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {

        const fetchProjects = async () => {
            const response = await axios.get('/api/projects')

            setProjects(response.data)
            setIsLoading(false)
        }



        fetchProjects()


    }, [])





    const createProject = async (projectData) => {


        try {

            const response = await axios.post('/api/projects', projectData)

            //  Додаємо новий проект в кінець списку проектів.  Після цього, компонент ProjectList автоматично оновиться.
            setProjects([...projects, response.data])






        } catch (error) {

            console.log(error)


        }


    }





  return (
    <>

    <section className="heading">
        <h1>Projects</h1>
        <p>Manage Your Projects</p>

    </section>


    <CreateProjectForm  onCreateProject={createProject} />

    {isLoading ? (
        <p>Loading projects...</p>

    ) : (

        <>

        {projects.length > 0 ? (
            <ProjectList projects={projects} setProjects={setProjects} />


        ) : (
            <p>No projects yet</p>
        )}


        </>


    )}



    </>
  )
}

export default Projects