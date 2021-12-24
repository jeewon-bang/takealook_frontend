import axiosInstance from 'api/customAxios';
import axios from 'axios';
import Alarm from 'components/MyPageForm/Alarm/Alarm';
import LikePost from 'components/MyPageForm/LikePost/LikePost';
import MyPost from 'components/MyPageForm/MyPost/MyPost';
import Profile from 'components/MyPageForm/Profile/Profile';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './MyPage.scss';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState();
  const [MyPosts, setMyPosts] = useState();
  const [likePosts, setLikePosts] = useState();
  const [alarms, setAlarms] = useState();
  const [alarmCount, setAlarmCount] = useState();
  const [loaded, setLoaded] = useState(false);
  const [notiId, setNotiId] = useState();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    axios
      .all([
        axiosInstance.get(`/user/${user.id}`),
        axiosInstance.get(`/user/${user.id}/posts`),
        axiosInstance.get(`/user/${user.id}/posts/like`),
        axiosInstance.get(`/user/${user.id}/notifications`),
        axiosInstance.get(`/user/${user.id}/notification/unchecked`),
      ])
      .then(
        axios.spread(
          (userRes, MyPostsRes, likePostsRes, alarmRes, countRes) => {
            setUserInfo(userRes.data);
            setMyPosts(MyPostsRes.data);
            setLikePosts(likePostsRes.data);
            setAlarms(alarmRes.data);
            setAlarmCount(countRes.data);
            setLoaded(true);
          }
        )
      );
  }, []);

  console.log(alarmCount);

  return loaded ? (
    <div class='mypage-container'>
      <div class='section1'>
        <Profile user={userInfo} setUser={setUserInfo} />
      </div>
      <div class='section2'>
        <MyPost MyPosts={MyPosts} setMyPosts={setMyPosts} />
        <LikePost likePosts={likePosts} setLikePosts={setLikePosts} />
      </div>
      <div class='section-alarm'>
        <Alarm
          alarms={alarms}
          setAlarms={setAlarms}
          notiId={notiId}
          setNotiId={setNotiId}
          alarmCount={alarmCount}
        />
      </div>
    </div>
  ) : (
    <div>로딩중</div>
  );
};

export default MyPage;
