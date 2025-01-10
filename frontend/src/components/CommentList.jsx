import Comment from './Comment';

const CommentList = ({ comments, setComments, taskId }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} comments={comments} setComments={setComments} taskId={taskId}/>
      ))}
    </div>
  );
};


export default CommentList