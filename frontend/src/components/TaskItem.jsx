import {FaTrashAlt} from 'react-icons/fa'
import axios from 'axios'



const TaskItem = ({task, tasks, setTasks}) => {




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



                <button onClick={() => handleDelete(task.id)}>
                    <FaTrashAlt />

                </button>



        </div>



    )
}


export default TaskItem