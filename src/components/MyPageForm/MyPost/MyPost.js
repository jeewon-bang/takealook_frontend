import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MyPost.scss';

const MyPost = (props) => {
  const { MyPosts, setMyPosts } = props;
  const [count, setCount] = useState(0);
  return (
    <div class='article'>
      <div class='block-title'>
        <h2>나의 게시글</h2>
        <Link to='/mypage/mypost'>
          <button onclick='/'>더보기</button>
        </Link>
      </div>
      {MyPosts &&
        MyPosts.map((post, index) =>
          index < 5 ? (
            <Link to={'/community/post/' + 1} className='link'>
              <div class='PostList'>
                <ul class='Board'>
                  <li class='active'>
                    <div class='list-title'>
                      <p>
                        [<span>{post.board}</span>]
                      </p>
                    </div>
                    <div class='postList2'>
                      <p class='title'>{post.title}</p>

                      <p class='modified_at'>{post.modified_at}</p>
                    </div>
                    <div class='profile'>
                      <p class='title'>
                        <img
                          class='image'
                          src={require('images/heart.png').default}
                          alt='like'
                        />
                        {post.like}
                        <i class='icon'></i>
                        <img
                          class='image'
                          src={require('images/chat.png').default}
                          alt='cmt'
                        />
                        {post.comment}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </Link>
          ) : null
        )}
    </div>
  );
};

export default MyPost;
