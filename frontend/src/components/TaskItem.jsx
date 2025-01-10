
import {FaTrashAlt} from 'react-icons/fa'
import axios from 'axios'
import {useState, useEffect} from 'react'
import CommentList from './CommentList'
import CreateCommentForm from './CreateCommentForm'




const TaskItem = ({task, tasks, setTasks}) => {


    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const fetchComments = async () => {


            const response = await axios.get('/api/comments', {
                params: {
                    taskId: task.id
                }


            })


            setComments(response.data)
            setIsLoading(false)



        }

        fetchComments()


    }, [task.id])






    const handleDelete = async (taskId) => {



        try {

            await axios.delete(`/api/tasks/${taskId}`)

            setTasks(tasks.filter((task) => task.id !== taskId))



        } catch (error) {

            console.log(error)

        }


    }




    return (

        <div>


                <h3>{task.name}</h3>
                <p>{task.description}</p>
                <p>{task.status}</p>
                <p>{task.priority}</p>
                <p>{new Date(task.dueDate).toLocaleString()}</p>


                {isLoading ? (
                    <p>Loading comments</p>

                ) : (
                    <>
                        <CommentList comments={comments} setComments={setComments} taskId={task.id}/>
                        <CreateCommentForm taskId={task.id} setComments={setComments} />




                    </>



                )}


                <button onClick={() => handleDelete(task.id)}>
                    <FaTrashAlt />

                </button>



        </div>



    )
}


export default TaskItem