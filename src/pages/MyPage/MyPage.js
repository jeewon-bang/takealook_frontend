import axios from 'axios';
import PostList from 'components/community/postlist/PostList';
import MyPageNav from 'components/MyPageForm/SubNav/MyPageNav';

import React, { useState, useEffect } from 'react';
import './MyPage.scss';

const MyPage = () => {
  const [posts, setPosts] = useState([
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
  ]);

  return (
    <div class='content-container'>
      <MyPageNav />
      <div class='main-inner'>
        <div class='side-profile'>
          <img
            class='img-circle'
            src={require('images/happy.png').default}
            alt='cat'
          />
          <p>
            <span>박세은</span>
          </p>
        </div>
        <div className='MyPost'>
          {posts.map((post) => (
            <PostList post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
