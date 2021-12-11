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
      board: '전국고양이자랑',
      like: 10,
      comment: 3,
      created_at: '2021-11-22',
      modified_at: '',
      title:
        '고양이와 함께 하는 재택근무 드디어 편하게 일할 수 있게 되었습니다',
      content:
        '사무실에서 냥이들 맨날 노트북 위에 올라와서 행복하지만 현실적으로 바쁜데 ㅠㅠ 신경써야해서 난처했는데 이건 무슨 고양이 터널마냥 ㅋㅋㅋㅋ 공간있어서 냥이들 저 공간으로 지나가거나 앉아있더라구요 ㅋㅎㅎ 노트북 발열때문에 따뜻해지니깐 노곤한지 자고 ㅋㅋㅋ 요즘은 재택근무 땜시 집에 있는데, 집에서도 저희 냥이님이 즐겨 앉아계셔서 다행입니다 :)다',
      writer: '혜민',
      writer_img: '../../images/bori2.jpg',
      img: '../../images/bori2.jpg',
    },
    {
      id: 2,
      board: '전국고양이자랑',
      like: 10,
      comment: 5,
      created_at: '2021-11-23',
      modified_at: '',
      title: '율무야ㅠㅠ',
      content: '율무 너무 귀여워 내가 데려오고 싶다',
      writer: '세은',
      writer_img: '../../images/bori2.jpg',
      img: '../../images/yulmu1.jpg',
    },
    {
      id: 3,
      board: '가출냥찾기',
      like: 21,
      comment: 10,
      created_at: '2021-11-24',
      modified_at: '',
      title: '부비',
      content: '영종도에서 부비를 잃어버렸어요',
      writer: '지수',
      writer_img: '../../images/bori2.jpg',
      img: '../../images/yulmu2.jpg',
    },
    {
      id: 4,
      board: '도와주세요',
      like: 60,
      comment: 8,
      created_at: '2021-11-25',
      modified_at: '',
      title: '서리태',
      content: '서리태 시크냥',
      writer: '지혜',
      writer_img: '../../images/bori2.jpg',
      img: '../../images/ritae1.jpg',
    },
    {
      id: 5,
      board: '도와주세요',
      like: 55,
      comment: 19,
      created_at: '2021-11-26',
      modified_at: '',
      title: '서리태',
      content: '서리태 시크냥',
      writer: '지혜',
      writer_img: '../../images/bori2.jpg',
      img: '../../images/ritae1.jpg',
    },
    {
      id: 6,
      board: '도와주세요',
      like: 200,
      comment: 15,
      created_at: '2021-11-27',
      modified_at: '',
      title: '서리태',
      content: '서리태 시크냥',
      writer: '지혜',
      writer_img: '../../images/bori2.jpg',
      img: '../../images/ritae1.jpg',
    },
  ]);

  // setPosts(getPosts());

  // const [activeCat, setActivateCat] = useState('모두보기');
  // const [posts2, setPosts2] = useState([...posts]);

  // useEffect(() => {
  //   activeCat === '모두보기'
  //     ? setPosts(posts)
  //     : setPosts(posts.filter((post) => post.board === activeCat));
  // }, [activeCat]);

  return (
    <div className='content-container'>
      <div>
        <Category
          posts={posts}
          setPosts={setPosts}
          // activeCat={activeCat}
          // setActivateCat={setActivateCat}
        />
        <hr />
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
      </div>
    </div>
  );
};

export default PostListPage;
