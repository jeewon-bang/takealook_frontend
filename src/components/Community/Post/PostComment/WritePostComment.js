import axiosInstance from 'api/customAxios';
import React, { useEffect, useState } from 'react';
import PostComment from './PostComment';
import './WritePostComment.scss';

const WritePostComment = (props) => {
  const { postDetails } = props;
  const [comments, setComments] = useState([]);
  const [newComments, setNewComments] = useState(false);
  const [commentId, setCommentId] = useState({
    writerId: 1,
    content: '댓글내용',
  });

  // commentInfo.constructor  => array인지 object인지
  const writeComment = (e) => {
    const content = document.getElementById('content').value; //content id에서 받아온 value값
    setCommentId({ ...commentId, [e.target.name]: content });
  };

  useEffect(() => {
    //댓글 리스트 조회
    axiosInstance
      .get(`/post/${postDetails.postId}/comment`)
      .then((res) => {
        setComments(res.data);
      })
      .catch();
  }, [newComments]);

  const handleSubmit = () => {
    if (!commentId) {
      alert('댓글을 입력해주세요!');
    } else {
      document.getElementById('content').value = null;

      axiosInstance
        .post(`/post/${postDetails.postId}/comment`, commentId, {
          // headers: { 'Content-Type': 'multipart/form-data' },
          headers: { 'Content-Type': 'application/json' },
        })
        .then(
          //댓글 리스트 조회
          axiosInstance
            .get(`/post/${postDetails.postId}/comment`)
            .then((res) => {
              setComments(res.data);
              setNewComments(true);
            })
            .catch()
        );
    }
  };

  return (
    <div>
      <div className='comment'>
        <input
          className='comment-input'
          id='content'
          name='content'
          type='text'
          placeholder='댓글을 작성하려면 TakeaLook! 에 로그인 해주세요.'
          onChange={writeComment}
        />
        <input
          className='comment-btn'
          type='button'
          value='등록'
          onClick={handleSubmit}
        />
      </div>
      <div className='post-listcomment'>
        {comments.map((comment) => (
          <PostComment postDetails={postDetails} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default WritePostComment;
