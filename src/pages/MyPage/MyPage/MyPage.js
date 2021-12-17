import axiosInstance from 'api/customAxios';
import axios from 'axios';
import Alarm from 'components/MyPageForm/Alarm/Alarm';
import LikePost from 'components/MyPageForm/LikePost/LikePost';
import MyPost from 'components/MyPageForm/MyPost/MyPost';
import Profile from 'components/MyPageForm/Profile/Profile';

import React, { useState, useEffect } from 'react';
import '../MyPage.scss';

const MyPage = () => {
  let userData = {
    id: 1,
    loginId: 'seeun',
    nickname: '즐거운보리차',
    phone: '01097920214',
    image: '/images/bori2.jpg',
  };

  let LikeData = [
    {
      id: 1,
      writer: '혜민',
      title: '노릇노릇',
      content: '보리전이 익어간다',
      created_at: '2021-11-22',
      modified_at: '2021-11-22',
      img: '../../images/bori2.jpg',
      like: 10,
      comment: 3,
      board: '가출냥찾기',
    },
    {
      id: 2,
      writer: '세은',
      title: '율무야ㅠㅠ',
      content: '율무 너무 귀여워 내가 데려오고 싶다',
      created_at: '2021-11-23',
      modified_at: '2021-11-23',
      img: '../../images/yulmu1.jpg',
      like: 15,
      comment: 5,
      board: '도와주세요',
    },
    {
      id: 2,
      writer: '세은',
      title: '율무야ㅠㅠ',
      content: '율무 너무 귀여워 내가 데려오고 싶다',
      created_at: '2021-11-23',
      modified_at: '2021-11-23',
      img: '../../images/yulmu1.jpg',
      like: 15,
      comment: 5,
      board: '도와주세요',
    },
    {
      id: 2,
      writer: '세은',
      title: '율무야ㅠㅠ',
      content: '율무 너무 귀여워 내가 데려오고 싶다',
      created_at: '2021-11-23',
      modified_at: '2021-11-23',
      img: '../../images/yulmu1.jpg',
      like: 15,
      comment: 5,
      board: '도와주세요',
    },
  ];

  let MyPostData = [
    {
      id: 1,
      writer: '혜민',
      title: '노릇노릇',
      content: '보리전이 익어간다',
      created_at: '2021-11-22',
      modified_at: '2021-11-22',
      img: '../../images/bori2.jpg',
      like: 10,
      comment: 3,
      board: '전국고양이자랑',
    },
    {
      id: 1,
      writer: '혜민',
      title: '노릇노릇',
      content: '보리전이 익어간다',
      created_at: '2021-11-22',
      modified_at: '2021-11-22',
      img: '../../images/bori2.jpg',
      like: 10,
      comment: 3,
      board: '전국고양이자랑',
    },
    {
      id: 2,
      writer: '세은',
      title: '율무야ㅠㅠ',
      content: '율무 너무 귀여워 내가 데려오고 싶다',
      created_at: '2021-11-23',
      modified_at: '2021-11-23',
      img: '../../images/yulmu1.jpg',
      like: 15,
      comment: 5,
      board: '도와주세요',
    },
    {
      id: 2,
      writer: '세은',
      title: '율무야ㅠㅠ',
      content: '율무 너무 귀여워 내가 데려오고 싶다',
      created_at: '2021-11-23',
      modified_at: '2021-11-23',
      img: '../../images/yulmu1.jpg',
      like: 15,
      comment: 5,
      board: '도와주세요',
    },
    {
      id: 2,
      writer: '세은',
      title: '율무야ㅠㅠ',
      content: '율무 너무 귀여워 내가 데려오고 싶다',
      created_at: '2021-11-23',
      modified_at: '2021-11-23',
      img: '../../images/yulmu1.jpg',
      like: 15,
      comment: 5,
      board: '도와주세요',
    },
    {
      id: 2,
      writer: '세은',
      title: '율무야ㅠㅠ',
      content: '율무 너무 귀여워 내가 데려오고 싶다',
      created_at: '2021-11-23',
      modified_at: '2021-11-23',
      img: '../../images/yulmu1.jpg',
      like: 15,
      comment: 5,
      board: '도와주세요',
    },
  ];

  let notiData = [
    {
      id: 1,
      linkedId: 1,
      message: ' 00 님이 00(이)의 돌봄 내역을 추가했습니다.',
      type: 0,
      created_at: '2021-12-14T11:53:18.271',
      modified_at: '2021-12-14T11:53:18.271',
      checked: true,
    },
    {
      id: 2,
      linkedId: 1,
      message: ' 00 님이 00(이)의 정보를 수정했습니다.',
      type: 1,
      created_at: '2021-12-14T11:53:18.271',
      modified_at: '2021-12-14T11:53:18.271',
      checked: true,
    },
    {
      id: 3,
      linkedId: 1,
      message: ' 00 님이 00(이)를 함께 돌보게 되었습니다.',
      type: 2,
      created_at: '2021-12-14T11:53:18.271',
      modified_at: '2021-12-14T11:53:18.271',
      checked: true,
    },
    {
      id: 4,
      linkedId: 1,
      message: '00 님이 00(이)와 같은 고양이를 추천받아 그룹을 이동했습니다.',
      type: 3,
      created_at: '2021-12-14T9:53:18.271',
      modified_at: '2021-12-14T9:53:18.271',
      checked: true,
    },
    {
      id: 5,
      linkedId: 1,
      message: '00 님이 다른 고양이를 찾아 떠났습니다.',
      type: 4,
      created_at: '2021-12-14T9:53:18.271',
      modified_at: '2021-12-14T9:53:18.271',
      checked: true,
    },
    {
      id: 6,
      linkedId: 1,
      message: '00 님이 다른 고양이를 찾아 떠났습니다.',
      type: 5,
      created_at: '2021-12-14T9:53:18.271',
      modified_at: '2021-12-14T9:53:18.271',
      checked: true,
    },
    {
      id: 7,
      linkedId: 1,
      message:
        '00 님이 00(이)의 고양이 별 여행 소식을 전했습니다. 작별 메세지를 확인하세요.',
      type: 6,
      created_at: '2021-12-14T9:53:18.271',
      modified_at: '2021-12-14T9:53:18.271',
      checked: true,
    },
    {
      id: 8,
      linkedId: 1,
      message:
        '00 님이 00(이)이를 집으로 모셔갔습니다. 인사 메세지를 확인하세요.',
      type: 7,
      created_at: '2021-12-14T9:53:18.271',
      modified_at: '2021-12-14T9:53:18.271',
      checked: true,
    },
    {
      id: 9,
      linkedId: 1,
      message:
        '00 님이 00(이)이를 집으로 모셔갔습니다. 인사 메세지를 확인하세요.',
      type: 8,
      created_at: '2021-12-14T9:53:18.271',
      modified_at: '2021-12-14T9:53:18.271',
      checked: true,
    },
    {
      id: 10,
      linkedId: 1,
      message: '00님이 (게시글 제목)을 추천했습니다.',
      type: 9,
      created_at: '2021-12-14T9:53:18.271',
      modified_at: '2021-12-14T9:53:18.271',
      checked: true,
    },
    {
      id: 11,
      linkedId: 1,
      message: '00 님이 (댓글 내용)을 추천했습니다.',
      type: 10,
      created_at: '2021-12-14T9:53:18.271',
      modified_at: '2021-12-14T9:53:18.271',
      checked: true,
    },
  ];

  const [user, setUser] = useState(userData);
  const [likePosts, setLikePosts] = useState(LikeData);
  const [MyPosts, setMyPosts] = useState(MyPostData);
  const [alarm, setAlarm] = useState(notiData);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('MyPage');
    axios
      .all([
        axiosInstance.get(`/user/1`),
        // axiosInstance.get(``),
        // axiosInstance.get(``),
        axiosInstance.get(`/user/1/notifications`),
      ])
      .then(
        axios.spread((userRes, alarmRes) => {
          //, likePostsRes, MyPostsRes, alarmRes
          setUser(userRes.data);
          // setLikePosts(likePostsRes.data);
          // setMyPosts(MyPostsRes.data);
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
