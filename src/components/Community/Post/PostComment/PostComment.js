import axiosInstance from 'api/customAxios';
import React from 'react';
import './PostComment.scss';

const PostComment = (props) => {
  const { postDetails, comment } = props;

  const handleDelete = () => {
    axiosInstance
      .delete(`/post/${postDetails.postId}/comment/${comment.commentId}`) //여기 commentId 수정
      .then()
      .catch((err) => console.log(err));
  };

  return (
    <div className='post-comment'>
      <div className='writer-info'>
        <div className='user-img'></div>
        <h5 className='writer-name'>{comment.writer.userName}</h5>
        <div className='content-comment'>{comment.content}</div>
        <button className='comment-update-btn'>수정</button>
        <button className='comment-delete-btn' onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default PostComment;
