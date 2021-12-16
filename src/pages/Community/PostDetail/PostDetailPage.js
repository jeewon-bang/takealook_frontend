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

const PostDetailPage = () => {
  const { index } = useParams();
  console.log(index);
  const [postDetails, setPostDetails] = useState('');
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('PostDetailPage.js');

    axiosInstance
      .get(`/post/${index}`)
      .then((res) => {
        setPostDetails(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [comments]);

  return loaded ? (
    <div className='content-container'>
      <div className='post-detail'>
        <PostDetail postDetails={postDetails} setPostDetails={setPostDetails} />
      </div>
      <div className='post-writecomment'>
        <WritePostComment postDetails={postDetails} />
      </div>
      <div className='post-listcomment'>
        <h1>
          <font color='#ffa800'>{postDetails.commentList.length}</font>
          개의 댓글
        </h1>
        {/* {comments.map((cmt) => (
          <PostComment id={cmt.id} comments={comments} />
        ))} */}
      </div>
    </div>
  ) : (
    <div>로딩중</div>
  );
};

export default PostDetailPage;
