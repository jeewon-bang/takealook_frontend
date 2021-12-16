import React, { useEffect, useState } from 'react';
import './PostListPage.scss';
import PostList from 'components/Community/Post/PostList/PostList';
import Writebtn from 'components/Community/Writes/WriteBtn/Writebtn';
import Sorting from 'components/Community/Sorting/Sorting';
import Category from 'components/Community/Category/Category';
import Searching from 'components/Community/Searching/Searching';
import axiosInstance from 'api/customAxios';
import { Link } from 'react-router-dom';
// {
//   "board": {
//       "id": 2,
//       "name": "가출냥 찾기"
//   },
//   "postId": 19,
//   "writer": {
//       "id": 1,
//       "userName": "신지혜",
//       "userImage": "http://k.kakaocdn.net/dn/ThUCQ/btq6AcUDIj8/CejFJKZUa4LAmANQ92FJL0/img_640x640.jpg",
//       "dflag": false
//   },
//   "thumbnail": "https://takealook-bucket.s3.ap-northeast-2.amazonaws.com/static/998c2c95-f2c4-4245-8710-c940259775c7digits.png",
//   "title": "png1 체인지",
//   "content": "png1 체인지",
//   "modifiedAt": "2021-12-16T13:15:13.837",
//   "postLike": 0,
//   "commentList": [],
//   "commentListCount": 0
// }

const PostListPage = () => {
  const [boardId, setBoardId] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // const [search, setSearch] = useState('');
  // console.log(search);

  useEffect(() => {
    console.log('PostListPage.js');

    axiosInstance
      .get(`/posts/${boardId}`)
      .then((res) => {
        console.log(res);
        console.log(typeof res);
        console.log(res.data);
        console.log(typeof res.data);
        console.log(res.data.length);
        setPosts(res.data);
        console.log(typeof posts);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [boardId]);

  return loaded ? (
    <div className='content-container'>
      <div className='nav-wrapper'>
        <Category setBoardId={setBoardId} />
      </div>
      <div className='right-nav'>
        <Writebtn />
      </div>
      <div className='searching-wrapper'>
        <Searching />
      </div>
      <div className='sorting-wrapper'>
        <Sorting posts={posts} setPosts={setPosts} />
      </div>
      <div className='wrapper'>
        {posts &&
          posts.map((post) => (
            <Link to={`/community/post/${post.postId}`} className='link'>
              <PostList post={post} />
            </Link>
          ))}
      </div>
    </div>
  ) : (
    <div>로딩중</div>
  );
};

export default PostListPage;
