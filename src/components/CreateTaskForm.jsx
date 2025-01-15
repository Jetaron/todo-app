import {useState} from 'react'


const CreateTaskForm = ({projectId, onCreateTask}) => {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'Open',
        priority: 'Medium',
        dueDate: '',
        projectId: projectId



    })




    const {name, description, status, priority, dueDate} = formData




    const onChange = (e) => {
        setFormData((prevState) => ({

            ...prevState,
            [e.target.name]: e.target.value
        }))

    }


    const onSubmit = (e) => {
        e.preventDefault()

        const taskData = {
            name,
            description,
            status,
            priority,
            dueDate,
            projectId
        }




        onCreateTask(taskData)



        // Очищуємо форму після створення завдання
        setFormData({
            name: '',
            description: '',
            status: 'Open',
            priority: 'Medium',
            dueDate: '',
            projectId: projectId




        })



    }



  return (
    <section className='form'>
    <form onSubmit={onSubmit}>

        <div className='form-group'>
            <input type='text'
             className='form-control'
             id='name'
             name='name'
             value={name}
             placeholder='Task name'
             onChange={onChange}
            />


        </div>


        <div className='form-group'>
            <input type='text'
             className='form-control'
             id='description'
             name='description'
             value={description}
             placeholder='Task description'
             onChange={onChange}
            />


        </div>




        <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select id="status" name="status" value={status} onChange={onChange}>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

          </div>



          <div className="form-group">
            <label htmlFor="priority">Priority:</label>
            <select id="priority" name="priority" value={priority} onChange={onChange}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

          </div>



          <div className="form-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input type="date" className="form-control" id='dueDate' name='dueDate' value={dueDate} onChange={onChange} />

          </div>





          <div className="form-group">
                <button className="btn btn-block" type='submit'>Create Task</button>


          </div>



    </form>



    </section>
  )
}

export default CreateTaskForm