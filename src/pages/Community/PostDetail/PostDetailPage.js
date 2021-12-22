import PostComment from 'components/Community/Post/PostComment/PostComment';
import PostDetail from 'components/Community/Post/PostDetail/PostDetail';
import React, { useState, useEffect } from 'react';
import './PostDetailPage.scss';
import axiosInstance from 'api/customAxios';
import { Link, useParams } from 'react-router-dom';
import WriteComment from 'components/Community/Writes/WriteComment/WriteComment';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Spinner from 'components/Common/Spinner';

const PostDetailPage = () => {
  const user = useSelector((state) => state.auth.user); //내가 서버에 접속한 로그인한 정보
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [like, setLike] = useState(0);
  const [postLikeInfo, setPostLikeInfo] = useState({
    postId: postId,
    userId: user.id,
  });
  const [commentUpdate, setCommentUpdate] = useState(false);

  useEffect(() => {
    axios
      .all([
        axiosInstance.get(`/post/${postId}`),
        axiosInstance.get(`/post/${postId}/comment`),
      ])
      .then(
        axios.spread((postDetailsRes, commentsRes) => {
          console.log(postDetailsRes.data.checkLike);
          setPostDetails(postDetailsRes.data);
          setLike(postDetailsRes.data.postLike);
          setComments(commentsRes.data);
          setLoaded(true);
        })
      );
  }, []);

  const handlePostLike = () => {
    if (!postDetails.checkLike) {
      setLike(like + 1);
      axiosInstance
        .post(`/post/${postId}/like`, postLikeInfo, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) =>
          axiosInstance
            .get(`/post/${postId}`)
            .then((res) => {
              setPostDetails(res.data);
              setLoaded(true);
            })
            .catch((err) => console.log(err))
        )
        .catch((err) => console.log(err));
    } else {
      setLike(like - 1);
      axiosInstance
        .delete(`/post/${postId}/like`)
        .then((res) =>
          axiosInstance
            .get(`/post/${postId}`)
            .then((res) => {
              setPostDetails(res.data);
              setLoaded(true);
            })
            .catch((err) => console.log(err))
        )
        .catch((err) => console.log(err));
    }
  };

  return loaded ? (
    <div className='content-container'>
      <div className='detail-right-nav'>
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
        <PostDetail postDetails={postDetails} like={like} />
      </div>
      <div className='detail-commentwrite'>
        <WriteComment
          postDetails={postDetails}
          setPostDetails={setPostDetails}
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
            <PostComment
              postDetails={postDetails}
              setPostDetails={setPostDetails}
              comment={comment}
              setLoaded={setLoaded}
              setComments={setComments}
              commentUpdate={commentUpdate}
              setCommentUpdate={setCommentUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default PostDetailPage;
