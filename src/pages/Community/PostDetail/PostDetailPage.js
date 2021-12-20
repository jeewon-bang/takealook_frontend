import PostComment from 'components/Community/Post/PostComment/PostComment';
import PostDetail from 'components/Community/Post/PostDetail/PostDetail';
import React, { useState, useEffect } from 'react';
import './PostDetailPage.scss';
import axiosInstance from 'api/customAxios';
import { Link, useParams } from 'react-router-dom';
import WriteComment from 'components/Community/Writes/WriteComment/WriteComment';
import axios from 'axios';
// {
//   "board": {
//       "id": 2,
//       "name": "가출냥 찾기"
//   },
//   "postId": 17,
//   "writer": {
//       "id": 1,
//       "userName": "신지혜",
//       "userImage": "http://k.kakaocdn.net/dn/ThUCQ/btq6AcUDIj8/CejFJKZUa4LAmANQ92FJL0/img_640x640.jpg",
//       "dflag": false
//   },
//   "thumbnail": "https://takealook-bucket.s3.ap-northeast-2.amazonaws.com/static/8f31ec06-b73a-45bd-8af4-b28852122685s.jpg",
//   "title": "테스트테스트",
//   "content": "테스트ㅇ",
//   "createdAt": "2021-12-19T02:25:48.287",
//   "modifiedAt": "2021-12-19T02:25:48.287",
//   "postLike": 1,
//   "commentList": [
//       {
//           "writer": {
//               "id": 1,
//               "userName": "신지혜",
//               "userImage": "http://k.kakaocdn.net/dn/ThUCQ/btq6AcUDIj8/CejFJKZUa4LAmANQ92FJL0/img_640x640.jpg",
//               "dflag": false
//           },
//           "commentId": 40,
//           "content": "댓글",
//           "modifiedAt": "2021-12-19T02:37:25.101",
//           "commentLike": 0
//       },
//       {
//           "writer": {
//               "id": 1,
//               "userName": "신지혜",
//               "userImage": "http://k.kakaocdn.net/dn/ThUCQ/btq6AcUDIj8/CejFJKZUa4LAmANQ92FJL0/img_640x640.jpg",
//               "dflag": false
//           },
//           "commentId": 41,
//           "content": "댓글이다",
//           "modifiedAt": "2021-12-19T12:04:20.07",
//           "commentLike": 0
//       },
//       {
//           "writer": {
//               "id": 1,
//               "userName": "신지혜",
//               "userImage": "http://k.kakaocdn.net/dn/ThUCQ/btq6AcUDIj8/CejFJKZUa4LAmANQ92FJL0/img_640x640.jpg",
//               "dflag": false
//           },
//           "commentId": 42,
//           "content": "고양이 최고",
//           "modifiedAt": "2021-12-19T12:07:48.909",
//           "commentLike": 0
//       }
//   ],
//   "commentListCount": 3
// }

const PostDetailPage = () => {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [like, setLike] = useState(0);
  const [doubleClickFlag, setDoubleClickFlag] = useState(false);
  const [postLikeInfo, setPostLikeInfo] = useState({
    postId: postId,
    userId: 1,
  });

  useEffect(() => {
    axios
      .all([
        axiosInstance.get(`/post/${postId}`),
        axiosInstance.get(`/post/${postId}/comment`),
      ])
      .then(
        axios.spread((postDetailsRes, commentsRes) => {
          setPostDetails(postDetailsRes.data);
          setLike(postDetailsRes.data.postLike);
          setComments(commentsRes.data);
          setLoaded(true);
        })
      );
  }, []);

  const handlePostLike = () => {
    if (!doubleClickFlag) {
      setLike(like + 1);
      setDoubleClickFlag(true);
      //like api
      axiosInstance
        .post(`/post/${postId}/like`, postLikeInfo, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then()
        .catch((err) => console.log(err));
    } else {
      setLike(like - 1);
      setDoubleClickFlag(false);
      //unlike api
      axiosInstance
        .delete(`/post/${postId}/like`, postLikeInfo, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then()
        .catch((err) => console.log(err));
    }
  };

  return loaded ? (
    <div className='content-container'>
      <div className='right-nav'>
        <img
          class='detail-like-btn'
          src={require('images/postlike.png').default}
          alt='좋아요'
          onClick={handlePostLike}
        />
        <Link to='/community/write'>
          <img
            className='detail-write-btn'
            src={require('images/write.png').default}
            alt='글쓰기'
          />
        </Link>
      </div>
      <div className='detail-postdetail'>
        <PostDetail
          postDetails={postDetails}
          like={like}
          doubleClickFlag={doubleClickFlag}
        />
      </div>
      <div className='detail-commentwrite'>
        <WriteComment
          postDetails={postDetails}
          setPostDetails={setPostDetails}
          comments={comments}
          setComments={setComments}
          setLoaded={setLoaded}
        />
      </div>
      <div className='detail-commentlist-info'>
        <h2>
          <font color='#ffa800'>{postDetails.commentListCount}</font>
          개의 댓글
        </h2>
        <div className='detail-commentlist'>
          {comments.map((comment) => (
            <PostComment postDetails={postDetails} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div>로딩중</div>
  );
};

export default PostDetailPage;
