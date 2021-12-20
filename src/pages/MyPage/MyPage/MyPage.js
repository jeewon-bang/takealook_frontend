import axiosInstance from 'api/customAxios';
import axios from 'axios';
import Alarm from 'components/MyPageForm/Alarm/Alarm';
import LikePost from 'components/MyPageForm/LikePost/LikePost';
import MyPost from 'components/MyPageForm/MyPost/MyPost';
import Profile from 'components/MyPageForm/Profile/Profile';

import React, { useState, useEffect } from 'react';
import '../MyPage.scss';

const MyPage = () => {
  const [user, setUser] = useState();
  const [MyPosts, setMyPosts] = useState();
  const [likePosts, setLikePosts] = useState();
  const [alarm, setAlarm] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('MyPage');
    axios
      .all([
        axiosInstance.get(`/user/1`),
        axiosInstance.get(`/user/1/posts`),
        axiosInstance.get(`/user/1/posts/like`),
        axiosInstance.get(`/user/1/notifications`),
      ])
      .then(
        axios.spread((userRes, MyPostsRes, likePostsRes, alarmRes) => {
          setUser(userRes.data);
          setMyPosts(MyPostsRes.data);
          setLikePosts(likePostsRes.data);
          setAlarm(alarmRes.data);
          setLoaded(true);
        })
      );
  }, []);

  console.log(user);

  return loaded ? (
    <div class='mypage-container'>
      <div class='section1'>
        <Profile user={user} setUser={setUser} />
      </div>
      <div class='section2'>
        <MyPost MyPosts={MyPosts} setMyPosts={setMyPosts} />
        <LikePost likePosts={likePosts} setLikePosts={setLikePosts} />
      </div>
      <div class='section-alarm'>
        <Alarm alarm={alarm} setAlarm={setAlarm} />
      </div>
    </div>
  ) : (
    <div>로딩중</div>
  );
};

export default MyPage;
