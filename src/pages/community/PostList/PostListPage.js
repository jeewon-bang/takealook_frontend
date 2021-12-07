import React, { useEffect, useState } from 'react';
import './PostListPage.scss';
import PostList from 'components/Community/Post/PostList/PostList';
import Writebtn from 'components/Community/Writes/WriteBtn/Writebtn';
import Sorting from 'components/Community/Sorting/Sorting';
import Category from 'components/Community/Category/Category';

const PostListPage = () => {
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
      board: '전국고양이자랑',
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
      board: '전국고양이자랑',
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
      board: '가출냥찾기',
    },
    {
      id: 4,
      writer: '지혜',
      title: '서리태',
      content: '서리태 시크냥',
      created_at: '2021-11-25',
      modified_at: '',
      img: '../../images/ritae1.jpg',
      like: 60,
      comment: 8,
      board: '도와주세요',
    },
    {
      id: 5,
      writer: '지혜',
      title: '서리태',
      content: '서리태 시크냥',
      created_at: '2021-11-26',
      modified_at: '',
      img: '../../images/ritae1.jpg',
      like: 55,
      comment: 19,
      board: '도와주세요',
    },
    {
      id: 6,
      writer: '지혜',
      title: '서리태',
      content: '서리태 시크냥',
      created_at: '2021-11-27',
      modified_at: '',
      img: '../../images/ritae1.jpg',
      like: 200,
      comment: 15,
      board: '도와주세요',
    },
  ]);

  // setPosts(getPosts());

  const [activeCat, setActivateCat] = useState('모두보기');

  useEffect(() => {
    activeCat === '모두보기'
      ? setPosts(posts)
      : setPosts(posts.filter((post) => post.board === activeCat));
  }, [posts, activeCat]);

  return (
    <div>
      <Category activeCat={activeCat} setActivateCat={setActivateCat} />
      <hr />
      <div className='content-container'>
        <section>
          <div className='right-nav'>
            <Writebtn />
          </div>
          <div className='sorting-wrapper'>
            <Sorting posts={posts} setPosts={setPosts} />
          </div>
          <div className='wrapper'>
            {posts.map((post) => (
              <PostList post={post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostListPage;
