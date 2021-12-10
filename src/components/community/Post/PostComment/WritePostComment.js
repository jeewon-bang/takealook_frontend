import axiosInstance from 'api/customAxios';
import React, { useState } from 'react';
import './WritePostComment.scss';

const WritePostComment = (props) => {
  const { postId } = props;

  // console.log(postId);

  const [commentInfo, setCommentInfo] = useState({
    writerId: 1,
    content: '댓글내용',
  });

  // commentInfo.constructor  => array인지 object인지
  const writeComment = (e) => {
    const content = document.getElementById('content').value; //content id에서 받아온 value값
    setCommentInfo({ ...commentInfo, [e.target.name]: content });
  };

  const handleSubmit = () => {
    if (!commentInfo) {
      alert('댓글을 입력해주세요!');
    } else {
      console.log(commentInfo); // {postId: '', writerId: '', content: '댓글내용'}

      // const formData = new FormData();
      // formData.append(
      //   'commentInfo',
      //   new Blob([JSON.stringify(commentInfo)], {
      //     type: 'application/json',
      //   })
      // );

      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]); //commentInfo, [object File]
      // }

      axiosInstance.post(`/post/1/comment`, commentInfo, {
        // headers: { 'Content-Type': 'multipart/form-data' },
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };

  return (
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
  );
};

export default WritePostComment;
