import {useState} from 'react'




const CreateProjectForm = ({onCreateProject}) => {

    const [formData, setFormData] = useState({
        name: '',
        description: ''
    })



    const {name, description} = formData


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value

        }))


    }


    const onSubmit = async (e) => {
        e.preventDefault()


        const projectData = {
            name,
            description
        }




        onCreateProject(projectData)
        setFormData({
            name: "",
            description: ""


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
                     placeholder='Project name'
                     onChange={onChange}
                    />

                </div>

                 <div className='form-group'>
                    <input type='text'
                     className='form-control'
                     id='description'
                     name='description'
                     value={description}
                     placeholder='Project description'
                     onChange={onChange}
                    />

                </div>


                <div className="form-group">
                    <button type="submit" className="btn btn-block">
                        Create Project

                    </button>

                </div>




            </form>


      </section>
  )
}

export default CreateProjectForm