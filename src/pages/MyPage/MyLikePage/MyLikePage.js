import PostList from 'components/Community/Post/PostList/PostList';
import Profile from 'components/MyPageForm/Profile/Profile';
import './MyLikePage.scss';
import React, { useEffect, useState } from 'react';
import axiosInstance from 'api/customAxios';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyLikePage = () => {
  const [userInfo, setUserInfo] = useState();
  const [likePosts, setLikePosts] = useState();
  const [loaded, setLoaded] = useState(false);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    axios
      .all([
        axiosInstance.get(`/user/${user.id}`),
        axiosInstance.get(`/user/${user.id}/posts/like`),
      ])
      .then(
        axios.spread((userRes, likePostsRes) => {
          setUserInfo(userRes.data);
          setLikePosts(likePostsRes.data);
          setLoaded(true);
        })
      );
  }, []);

  return loaded ? (
    <div class='mypost-container'>
      <div class='mypost-section1'>
        <Profile user={userInfo} setUser={setUserInfo} />
      </div>
      <div class='mypost-section2'>
        <div class='mypost-article'>
          <div class='block-title'>
            <h2>좋아한 게시글</h2>
          </div>
        </div>
        <div className='MyPostList'>
          {likePosts &&
            likePosts.map((post) => (
              <Link to={`/community/post/${post.postId}`} className='link'>
                <PostList post={post} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <div>로딩중</div>
  );
};

export default MyLikePage;
