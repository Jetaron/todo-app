import { useState } from 'react';
import axios from 'axios';

const CreateCommentForm = ({ taskId, setComments }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/comments', {
        text,
        taskId,
      });

      setComments((prevComments) => [...prevComments, response.data]);
      setText('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CreateCommentForm;