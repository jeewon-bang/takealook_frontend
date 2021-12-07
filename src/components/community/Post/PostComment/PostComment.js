import React from 'react';
import './PostComment.scss';

const PostComment = (props) => {
  const { id, comments } = props;

  return (
    <div className='post-comment'>
      <div className='writer-info'>
        <div className='user-img'></div>
        <h5 className='writer-name'>{comments[id].writer}</h5>
        <div className='content-comment'>{comments[id].comment}</div>
      </div>
    </div>
  );
};

export default PostComment;
