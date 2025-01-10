import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';



const Comment = ({ comment, comments, setComments, taskId }) => {


    const handleDelete = async (commentId) => {


        try {
            await axios.delete(`/api/comments/${commentId}`);

            setComments(comments.filter((comment) => comment.id !== commentId))





        } catch (error) {
            console.log(error)

        }



    }




  return (
    <div>

      <p>{comment.text}</p>
      <p>
        {new Date(comment.createdAt).toLocaleString()} by User {comment.authorId}
      </p>
      <button onClick={() => handleDelete(comment.id)}>
        <FaTrashAlt />
      </button>
    </div>
  );
};



export default Comment