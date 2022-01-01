import axiosInstance from 'api/customAxios';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './WriteComment.scss';

const WriteComment = (props) => {
  const user = useSelector((state) => state.auth.user);
  const { postDetails, setPostDetails, setComments, setLoaded, newComment } =
    props;
  const [commentId, setCommentId] = useState({
    writerId: user.id,
    content: '',
  });

  const writeComment = (e) => {
    const content = document.getElementById('content').value;
    setCommentId({ ...commentId, [e.target.name]: content });
  };

  const handleSubmit = async () => {
    if (!commentId.content) {
      alert('댓글을 입력해주세요!');
    } else {
      document.getElementById('content').value = null;
      setLoaded(false);

      axiosInstance
        .post(`/post/${postDetails.postId}/comment`, commentId, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => {
          axios
            .all([
              axiosInstance.get(`/post/${postDetails.postId}`),
              axiosInstance.get(`/post/${postDetails.postId}/comment`),
            ])
            .then(
              axios.spread((postDetailsRes, commentsRes) => {
                setPostDetails(postDetailsRes.data);
                setComments(commentsRes.data);
                setLoaded(true);
              })
            );
        });
    }
  };

  //댓글 수정..?
  const handleUpdate = (e) => {
    axiosInstance
      .patch(
        `/post/${postDetails.postId}/comment/${newComment.commentId}`,
        commentId,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((res) => console.log(res, '댓글 patch 끝났니'));
  };

  return (
    <div>
      <div className='comment'>
        <input
          className='comment-input'
          id='content'
          name='content'
          type='text'
          placeholder='댓글을 작성해주세요😸'
          onChange={writeComment}
        />
        <input
          className='comment-btn'
          type='button'
          value='등록'
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default WriteComment;
