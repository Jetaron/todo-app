import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

import axios from 'axios'
import TaskList from '../components/TaskList'
import CreateTaskForm from '../components/CreateTaskForm'



const Tasks = () => {


    const [tasks, setTasks] = useState([])
    const [project, setProject] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const {id} = useParams()




    useEffect(() => {


        const fetchProject = async (projectId) => {

            const response = await axios.get(`/api/projects/${projectId}`)
            setProject(response.data)


        }


        const fetchTasks = async (projectId) => {

            const response = await axios.get('/api/tasks', {
                params: {
                    projectId: projectId

                }
            })


            setTasks(response.data)
            setIsLoading(false)



        }


        fetchProject(id)
        fetchTasks(id)


    }, [id])





     const createTask = async (taskData) => {



        try {


            const response = await axios.post('/api/tasks', taskData)

            setTasks([...tasks, response.data])





        } catch (error) {


            console.log(error)
        }




     }


  return (
    <>
        <section className='heading'>

            <h1>{project.name}</h1>
            <p>Manage Your Tasks</p>

        </section>


        <CreateTaskForm projectId={id} onCreateTask={createTask} />



            {isLoading ? (
                <p>Loading tasks...</p>

            ) : (
                  <>

                {tasks.length > 0 ? (
                    <TaskList tasks={tasks}  setTasks={setTasks} />


                ) : (
                    <p>No tasks yet</p>
                )}


                 </>



            )}





    </>
  )
}

export default Tasks