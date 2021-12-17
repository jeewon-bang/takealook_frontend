import axiosInstance from 'api/customAxios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const { postLike, postDetails, setPostDetails } = props;
  console.log(postDetails.content);
  const navigate = useNavigate();

  const handleDelete = () => {
    axiosInstance
      .delete(`/post/${postDetails.postId}`)
      .then(navigate('/community'))
      .catch((err) => console.log(err));
  };

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
            {postLike}
            {/* {postDetails.postLike} */}
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
          <h5 className='writer-name'>{postDetails.writer.userName}</h5>
          <button className='detail-btn'>글 수정</button>
          <button className='detail-btn' onClick={handleDelete}>
            글 삭제
          </button>
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
