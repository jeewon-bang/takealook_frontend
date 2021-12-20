import PostList from 'components/Community/Post/PostList/PostList';
import Profile from 'components/MyPageForm/Profile/Profile';
import './MyLikePage.scss';
import React, { useEffect, useState } from 'react';
import axiosInstance from 'api/customAxios';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyLikePage = () => {
  const [user, setUser] = useState();
  const [likePosts, setLikePosts] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .all([
        axiosInstance.get(`/user/1`),
        axiosInstance.get(`/user/1/posts/like`),
      ])
      .then(
        axios.spread((userRes, likePostsRes) => {
          setUser(userRes.data);
          setLikePosts(likePostsRes.data);
          setLoaded(true);
        })
      );
  }, []);

  return loaded ? (
    <div class='mypost-container'>
      <div class='mypost-section1'>
        <Profile user={user} setUser={setUser} />
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
