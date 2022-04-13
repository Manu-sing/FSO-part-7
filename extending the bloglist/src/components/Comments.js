import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, initializeComments } from "../reducers/commentsReducer";

const Comments = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(initializeComments());
  }, []);

  const addComment = (e) => {
    e.preventDefault();
    let content = e.target.comm.value;
    const newComment = {
      comment: content,
    };
    dispatch(createComment(newComment));
  };

  return (
    <div>
      <ul>
        <h4>Comments:</h4>
        <form onSubmit={addComment}>
          <input name="comm" /> <button>add</button>
        </form>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
