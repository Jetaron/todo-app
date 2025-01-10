import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProjectEditForm from './ProjectEditForm';



const ProjectList = ({ projects, setProjects }) => {

  const [isEditing, setIsEditing] = useState(null);


  const handleEdit = (projectId) => {
    setIsEditing(projectId);
  };



  const handleDelete = async (projectId) => {

    try {

        await axios.delete(`/api/projects/${projectId}`)
        setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId))




    } catch (error) {

        console.log(error)
    }



  }




  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>
          {isEditing === project.id ? (
            <ProjectEditForm
              project={project}
              setIsEditing={setIsEditing}
              projects={projects}
              setProjects={setProjects}


            />


           ) : (

             <div>
                 <Link to={`/project/${project.id}`}><h3>{project.name}</h3></Link>
                 <p>{project.description}</p>
                 <button onClick={() => handleEdit(project.id)}>Edit</button>
                 <button onClick={() => handleDelete(project.id)}>Delete</button>

             </div>




           )}




        </div>
      ))}
    </div>
  );
};

export default ProjectList;