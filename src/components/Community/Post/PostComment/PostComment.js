import axiosInstance from 'api/customAxios';
import WriteComment from 'components/Community/Writes/WriteComment/WriteComment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './PostComment.scss';

const PostComment = (props) => {
  const user = useSelector((state) => state.auth.user);
  const { postDetails, comment, setLoaded } = props;
  const [newComment, setNewComment] = useState({
    newContent: comment.content,
    commentId: comment.commentId,
  });
  const [commentUpdate, setCommentUpdate] = useState(false);

  const handleDelete = () => {
    axiosInstance
      .delete(`/post/${postDetails.postId}/comment/${comment.commentId}`) //여기 commentId 수정
      .then((res) => {
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = () => {
    setCommentUpdate(true);
    console.log(newComment);
  };

  return (
    <div className='postcomment'>
      <div className='postcomment-writer-info'>
        <img
          src={postDetails.writer.userImage}
          className='postcomment-userimg'
          alt='user'
        />
        <h5 className='postcomment-writer-name'>{comment.writer.userName}</h5>
      </div>
      {commentUpdate === false ? (
        <div className='postcomment-content'>{comment.content}</div>
      ) : (
        <div className='postcomment-content-update'>
          <WriteComment newComment={newComment} commentUpdate={commentUpdate} />
        </div>
      )}

      {user.id === postDetails.writer.id ? (
        <div className='postcomment-btn'>
          {commentUpdate === false ? (
            <button className='postcomment-update-btn' onClick={handleUpdate}>
              수정
            </button>
          ) : null}

          <button className='postcomment-delete-btn' onClick={handleDelete}>
            삭제
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default PostComment;
