import React, { useEffect, useState } from 'react';
import './PostDetail.scss';

// {
//   "board": {
//       "id": 2,
//       "name": "가출냥 찾기"
//   },
//   "postId": 19,
//   "writer": {
//       "id": 1,
//       "userName": "신지혜",
//       "userImage": "http://k.kakaocdn.net/dn/ThUCQ/btq6AcUDIj8/CejFJKZUa4LAmANQ92FJL0/img_640x640.jpg",
//       "dflag": false
//   },
//   "thumbnail": "https://takealook-bucket.s3.ap-northeast-2.amazonaws.com/static/998c2c95-f2c4-4245-8710-c940259775c7digits.png",
//   "title": "png1 체인지",
//   "content": "png1 체인지",
//   "modifiedAt": "2021-12-16T13:15:13.837",
//   "postLike": 0,
//   "commentList": [],
//   "commentListCount": 0
// }

const PostDetail = (props) => {
  const { postDetails, setPostDetails } = props;

  return (
    <div className='postdetail'>
      <div className='info-header'>
        <h5>
          <font color='#ffa800'>{postDetails.board.name}</font>
        </h5>
        <div className='info'>
          <span className='info-like'>
            <img
              class='image'
              src={require('images/heart.png').default}
              alt='like'
            />
            {postDetails.postLike}
          </span>
          <span className='info-comment'>
            <img
              class='image'
              src={require('images/chat.png').default}
              alt='cmt'
            />
            {postDetails.commentListCount}
          </span>
          <span className='info-created_at'>
            {postDetails.modifiedAt.substring(0, 10)}
          </span>
        </div>
        <h1 className='top-title'>{postDetails.title}</h1>
        <div className='writer-info'>
          <div className='user-img'></div>
          <h5 className='writer-name'>{postDetails.writer.name}</h5>
        </div>
      </div>
      <hr />
      <div className='content'>
        <div>{postDetails.content}</div>
      </div>
      <hr />
    </div>
  );
};

export default PostDetail;
