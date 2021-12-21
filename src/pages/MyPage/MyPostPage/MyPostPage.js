import axiosInstance from 'api/customAxios';
import axios from 'axios';
import PostList from 'components/Community/Post/PostList/PostList';
import Profile from 'components/MyPageForm/Profile/Profile';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MyPostPage = () => {
  const [userInfo, setUserInfo] = useState();
  const [myPosts, setMyPosts] = useState();
  const [loaded, setLoaded] = useState(false);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    console.log('MyPage');
    axios
      .all([
        axiosInstance.get(`/user/${user.id}`),
        axiosInstance.get(`/user/${user.id}/posts`),
      ])
      .then(
        axios.spread((userRes, MyPostsRes) => {
          setUserInfo(userRes.data);
          setMyPosts(MyPostsRes.data);
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
            <h2>나의 게시글</h2>
          </div>
        </div>
        <div className='MyPostList'>
          {myPosts &&
            myPosts.map((post) => (
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

export default MyPostPage;
