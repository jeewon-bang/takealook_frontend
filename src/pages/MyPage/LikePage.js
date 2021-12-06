import PostList from 'components/community/postlist/PostList';
import MyPageNav from 'components/MyPageForm/subnav/MyPageNav';

import React, { useState } from 'react';

const LikePage = () => {
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
  ]);

  return (
    <div class='content-body'>
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

export default LikePage;
