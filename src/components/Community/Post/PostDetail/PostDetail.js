import axiosInstance from 'api/customAxios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PostDetail.scss';

const PostDetail = (props) => {
  const { postDetails, like, doubleClickFlag } = props;
  const navigate = useNavigate();
  console.log('PostDetail 컴포넌트');

  //글 삭제
  const handleDelete = () => {
    console.log(postDetails.postId);
    axiosInstance
      .delete(`/post/${postDetails.postId}`)
      .then((res) => {
        navigate('/community');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='postdetail'>
      <div className='postdetail-header'>
        <h5>
          <font color='#ffa800'>{postDetails.board.name}</font>
        </h5>
        <div className='postdetail-header-info'>
          <span className='postdetail-header-info-like'>
            {doubleClickFlag === true ? (
              <img
                class='image'
                src={require('images/heart_like.png').default}
                alt='like'
              />
            ) : (
              <img
                class='image'
                src={require('images/heart.png').default}
                alt='like'
              />
            )}
            {like}
            {/* {postDetails.postLike} */}
          </span>
          <span className='postdetail-header-info-comment'>
            <img
              class='image'
              src={require('images/chat.png').default}
              alt='cmt'
            />
            {postDetails.commentListCount}
          </span>
          <span className='postdetail-header-info-created_at'>
            {postDetails.modifiedAt.substring(0, 10)}
          </span>
        </div>
        <h1 className='postdetail-title'>{postDetails.title}</h1>
        <div className='postdetail-writer-info'>
          <img
            src={postDetails.writer.userImage}
            className='postdetail-userimg'
            alt='user'
          />
          <h5>{postDetails.writer.userName}</h5>
          <Link to={`/community/update/${postDetails.postId}`}>
            <button className='postdetail-btn'>글 수정</button>
          </Link>
          <button className='postdetail-btn' onClick={handleDelete}>
            글 삭제
          </button>
        </div>
      </div>
      <hr />
      <div className='postdetail-content'>
        {/* <div>dangerouslySetInnerHTML: 문자열을 html 태그로 인식하게 해주는 역할</div> */}
        <div dangerouslySetInnerHTML={{ __html: postDetails.content }}></div>
      </div>
      <hr />
    </div>
  );
};

export default PostDetail;
