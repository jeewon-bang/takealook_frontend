import React, { useState } from 'react';
import PostList from '../../components/community/PostList';
import SubNav from '../../components/community/SubNav';
import Write from '../../components/community/Write';
import './CommunityPage.scss';

const CommunityPage = () => {
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
    {
      id: 3,
      writer: '지수',
      title: '부비',
      content: '영종도에서 부비를 잃어버렸어요',
      created_at: '2021-11-24',
      modified_at: '',
      img: '../../images/yulmu2.jpg',
      like: 21,
      comment: 10,
      board: 'findcat',
    },
    {
      id: 4,
      writer: '지혜',
      title: '서리태',
      content: '서리태 시크냥',
      created_at: '2021-11-25',
      modified_at: '',
      img: '../../images/ritae1.jpg',
      like: 24,
      comment: 12,
      board: 'helpcat',
    },
    {
      id: 5,
      writer: '지혜',
      title: '서리태',
      content: '서리태 시크냥',
      created_at: '2021-11-25',
      modified_at: '',
      img: '../../images/ritae1.jpg',
      like: 24,
      comment: 12,
      board: 'helpcat',
    },
    {
      id: 6,
      writer: '지혜',
      title: '서리태',
      content: '서리태 시크냥',
      created_at: '2021-11-25',
      modified_at: '',
      img: '../../images/ritae1.jpg',
      like: 24,
      comment: 12,
      board: 'helpcat',
    },
  ]);

  const [backgroundimgs, setBackgroundimgs] = useState([]);
  const [board, setBoard] = useState();

  return (
    <div>
      <SubNav board={board} />
      <hr />
      <section>
        <div className='right-nav'>
          <Write />
        </div>
        <div className='wrapper'>
          {posts.map((post) => (
            <PostList post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;
