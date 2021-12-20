import axiosInstance from 'api/customAxios';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './WriteComment.scss';

const WriteComment = (props) => {
  const {
    postDetails,
    setPostDetails,
    comments,
    setComments,
    setLoaded,
    commentUpdate,
    newComment,
  } = props;
  const [commentId, setCommentId] = useState({
    writerId: 1,
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

      await axiosInstance
        .post(`/post/${postDetails.postId}/comment`, commentId, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => console.log(res, '댓글 post 끝났니')); //59 -> commentId

      await axios
        .all([
          axiosInstance.get(`/post/${postDetails.postId}`),
          axiosInstance.get(`/post/${postDetails.postId}/comment`),
        ])
        .then(
          axios.spread((postDetailsRes, commentsRes) => {
            console.log('댓글 get 끝났니');
            setPostDetails({
              ...postDetails,
              // commentListCount: postDetailsRes.data.commentListCount,
            });
            setComments([...comments, commentsRes.data]);
            setLoaded(true);
          })
        );
      // await axiosInstance
      //   .post(`/post/${postDetails.postId}/comment`, commentId, {
      //     // headers: { 'Content-Type': 'multipart/form-data' },
      //     headers: { 'Content-Type': 'application/json' },
      //   })
      //   .then(
      //     await axios
      //       .all([
      //         axiosInstance.get(`/post/${postDetails.postId}`),
      //         axiosInstance.get(`/post/${postDetails.postId}/comment`),
      //       ])
      //       .then(
      //         axios.spread((postDetailsRes, commentsRes) => {
      //           console.log(commentsRes);
      //           // console.log('데이터는 받아오니');
      //           // console.log(comments); //새로운 댓글은 적용 안됨
      //           setPostDetails({
      //             ...postDetails,
      //             // commentListCount: postDetailsRes.data.commentListCount,
      //           });
      //           setComments([...comments, commentsRes.data]);
      //           // console.log(comments); //새로운 댓글은 적용 안됨
      //           setLoaded(true);
      //         })
      //       )
      //     //댓글 리스트 조회
      //     // axiosInstance
      //     //   .get(`/post/${postDetails.postId}/comment`)
      //     //   .then((res) => {
      //     //     setComments([...comments, res.data]);
      //     //     // setComments(res.data);
      //     //   })
      //     //   .catch((err) => console.log(err))

      //     // axiosInstance
      //     // .get(`/post/${postId}`)
      //     // .then((res) => {
      //     //   setPostDetails(res.data);
      //     //   setLike(res.data.postLike);
      //     // }).catch((err) => console.log(err))
      //     // );
      //   );
    }
  };

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
          placeholder='댓글을 작성하려면 TakeaLook! 에 로그인 해주세요.'
          onChange={writeComment}
        />
        {commentUpdate === false ? (
          <input
            className='comment-btn'
            type='button'
            value='등록'
            onClick={handleSubmit}
          />
        ) : (
          <input
            className='comment-btn'
            type='button'
            value='수정 완료'
            onClick={handleUpdate}
          />
        )}
        <input
          className='comment-btn'
          type='button'
          value='등록'
          onClick={handleSubmit}
        />
      </div>
      {/* <div className='post-listcomment'>
        {comments.map((comment) => (
          <PostComment postDetails={postDetails} comment={comment} />
        ))}
      </div> */}
    </div>
  );
};

export default WriteComment;
