import PostComment from 'components/Community/Post/PostComment/PostComment';
import WritePostComment from 'components/Community/Post/PostComment/WritePostComment';
import PostDetail from 'components/Community/Post/PostDetail/PostDetail';
import React, { useState, useEffect } from 'react';
import './PostDetailPage.scss';
import axiosInstance from 'api/customAxios';
import { useParams } from 'react-router-dom';
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

// 댓글리스트
// [
//   {
//       "writer": {
//           "id": 1,
//           "userName": "신지혜",
//           "userImage": "http://k.kakaocdn.net/dn/ThUCQ/btq6AcUDIj8/CejFJKZUa4LAmANQ92FJL0/img_640x640.jpg",
//           "dflag": false
//       },
//       "content": "댓글 달거야",
//       "modifiedAt": "2021-12-16T17:53:56.304",
//       "commentLike": 0
//   },
//   {
//       "writer": {
//           "id": 1,
//           "userName": "신지혜",
//           "userImage": "http://k.kakaocdn.net/dn/ThUCQ/btq6AcUDIj8/CejFJKZUa4LAmANQ92FJL0/img_640x640.jpg",
//           "dflag": false
//       },
//       "content": "댓글 달거야",
//       "modifiedAt": "2021-12-16T17:53:58.978",
//       "commentLike": 0
//   }
// ]
let doubleClickFlag = false;

const PostDetailPage = () => {
  const { index } = useParams();
  const [postDetails, setPostDetails] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [postLike, setPostLike] = useState(0);

  useEffect(() => {
    console.log('PostDetailPage.js');

    //게시글 상세 조회
    axiosInstance
      .get(`/post/${index}`)
      .then((res) => {
        setPostDetails(res.data);
        setPostLike(res.data.postLike);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePostLike = () => {
    if (!doubleClickFlag) {
      setPostLike(postLike + 1);
      doubleClickFlag = true;
      //like api
      // axiosInstance
      //   .post(`/post/${index}/comment/{commentId}/like`) //여기 commentId 수정
      //   .then()
      //   .catch((err) => console.log(err));
    } else {
      console.log('여기서 아무것도 하지 않을거야...');
      setPostLike(postLike - 1);
      //unlike api
      // axiosInstance
      //   .post(`/post/${index}/comment/{commentId}/like`) //여기 commentId 수정
      //   .then()
      //   .catch((err) => console.log(err));
    }
  };

  return loaded ? (
    <div className='content-container'>
      <div className='right-nav'>
        <img
          class='postlike'
          src={require('images/postlike.png').default}
          alt='postlike'
          onClick={handlePostLike}
        />
      </div>
      <div className='post-detail'>
        <PostDetail
          postLike={postLike}
          postDetails={postDetails}
          setPostDetails={setPostDetails}
        />
      </div>
      <div className='post-writecomment'>
        <WritePostComment postDetails={postDetails} />
      </div>
      <div className='postdetail-listcomment'>
        <h2>
          <font color='#ffa800'>{postDetails.commentListCount}</font>
          개의 댓글
        </h2>
      </div>
    </div>
  ) : (
    <div>로딩중</div>
  );
};

export default PostDetailPage;
