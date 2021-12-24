import React, { useEffect, useState } from 'react';
import './PostListPage.scss';
import PostList from 'components/Community/Post/PostList/PostList';
import Sorting from 'components/Community/Sorting/Sorting';
import Category from 'components/Community/Category/Category';
import Searching from 'components/Community/Searching/Searching';
import axiosInstance from 'api/customAxios';
import { Link } from 'react-router-dom';
import Spinner from 'components/Common/Spinner';

const PostListPage = () => {
  const [boardId, setBoardId] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (boardId !== 0) {
      axiosInstance
        //카테고리별
        .get(`/posts/${boardId}`)
        .then((res) => {
          setPosts(res.data);
          setLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (boardId === 0) {
      axiosInstance
        //모두보기
        .get(`/posts`)
        .then((res) => {
          setPosts(res.data);
          setLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [boardId]);

  return loaded ? (
    <div className='content-container'>
      <div className='list-top-nav'>
        <Category boardId={boardId} setBoardId={setBoardId} />
      </div>
      <div className='list-right-nav'>
        <Link to='/community/write'>
          <img
            className='list-write-btn'
            src={require('images/write.png').default}
            alt='글쓰기'
          />
        </Link>
      </div>
      <div className='list-searching'>
        <Searching
          search={search}
          setSearch={setSearch}
          setPosts={setPosts}
          setLoaded={setLoaded}
          setBoardId={setBoardId}
        />
      </div>
      <div className='list-sorting'>
        <Sorting posts={posts} setPosts={setPosts} />
      </div>
      <div className='postlist'>
        {posts &&
          posts.map((post) => (
            <Link to={`/community/post/${post.postId}`} className='link'>
              <PostList post={post} />
            </Link>
          ))}
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default PostListPage;
