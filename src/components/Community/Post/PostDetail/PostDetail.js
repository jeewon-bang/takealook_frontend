import React, { useEffect, useState } from 'react';
import './PostDetail.scss';

const PostDetail = (props) => {
  const { id, postDetails, setPostDetails } = props;

  return (
    <div className='postdetail'>
      <div className='info-header'>
        <h5>
          <font color='#ffa800'>{postDetails[id].board}</font>
        </h5>
        <div className='info'>
          <span className='info-like'>
            <img
              class='image'
              src={require('images/heart.png').default}
              alt='like'
            />
            {postDetails[id].like}
          </span>
          <span className='info-comment'>
            <img
              class='image'
              src={require('images/chat.png').default}
              alt='cmt'
            />
            {postDetails[id].comment}
          </span>
          <span className='info-created_at'>{postDetails[id].created_at}</span>
        </div>
        <h1 className='top-title'>{postDetails[id].title}</h1>
        <div className='writer-info'>
          <div className='user-img'></div>
          <h5 className='writer-name'>{postDetails[id].writer}</h5>
        </div>
      </div>
      <hr />
      <div className='content'>
        <div>{postDetails[id].content}</div>
      </div>
      <hr />
    </div>
  );
};

export default PostDetail;
