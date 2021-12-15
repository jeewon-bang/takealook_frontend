import axiosInstance from 'api/customAxios';
import axios from 'axios';
import PostList from 'components/Community/Post/PostList/PostList';
import Profile from 'components/MyPageForm/Profile/Profile';
import React, { useEffect, useState } from 'react';

const MyPostPage = () => {
  let userData = {
    id: 1,
    login_id: 'seeun',
    nickname: '즐거운보리차',
    phone: '01097920214',
    image: '../../images/bori2.jpg',
  };

  let MyPostData = [
    {
      id: 1,
      writer: '혜민',
      title: '노릇노릇',
      content: '보리전이 익어간다',
      created_at: '2021-11-22',
      modified_at: '',
      img: '../../images/bori2.jpg',
      like: 10,
      comment: 3,
      board: 'bestcat',
    },
    {
      id: 2,
      writer: '세은',
      title: '율무야ㅠㅠ',
      content: '율무 너무 귀여워 내가 데려오고 싶다',
      created_at: '2021-11-23',
      modified_at: '',
      img: '../../images/yulmu1.jpg',
      like: 15,
      comment: 5,
      board: 'bestcat',
    },
    {
      id: 2,
      writer: '세은',
      title: '율무야ㅠㅠ',
      content: '율무 너무 귀여워 내가 데려오고 싶다',
      created_at: '2021-11-23',
      modified_at: '',
      img: '../../images/yulmu1.jpg',
      like: 15,
      comment: 5,
      board: 'bestcat',
    },
    {
      id: 2,
      writer: '세은',
      title: '율무야ㅠㅠ',
      content: '율무 너무 귀여워 내가 데려오고 싶다',
      created_at: '2021-11-23',
      modified_at: '',
      img: '../../images/yulmu1.jpg',
      like: 15,
      comment: 5,
      board: 'bestcat',
    },
  ];

  const [user, setUser] = useState(userData);
  const [myPosts, setMyPosts] = useState(MyPostData);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('MyPage');
    axios
      .all([axiosInstance.get(`/user/{userId}`), axiosInstance.get(``)])
      .then(
        axios.spread((userRes, MyPostsRes) => {
          setUser(userRes.data);
          setMyPosts(MyPostsRes.data);
          setLoaded(true);
        })
      );
  }, []);

  return (
    <div class='mypost-container'>
      <div class='mypost-section1'>
        <Profile user={user} setUser={setUser} />
      </div>

      <div class='mypost-section2'>
        <div class='mypost-article'>
          <div class='block-title'>
            <h2>나의 게시글</h2>
          </div>
        </div>
        <div className='MyPostList'>
          {myPosts.map((post) => (
            <PostList post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPostPage;
