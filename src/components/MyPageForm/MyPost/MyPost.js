import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MyPost.scss';

const MyPost = (props) => {
  const { MyPosts, setMyPosts } = props;
  const timeDiff = (date) => {
    return date.substring(0, 10);
  };

  let postLen = MyPosts.length;

  return postLen > 0 ? (
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
            <Link to={`/community/post/${post.postId}`} className='link'>
              <div class='PostList'>
                <ul class='Board'>
                  <li class='active'>
                    <div class='list-title'>
                      <p>
                        [<span>{post.board.name}</span>]
                      </p>
                    </div>
                    <div class='postList2'>
                      <p class='title'>{post.title}</p>
                      <p class='modified_at'>{timeDiff(post.modifiedAt)}</p>
                    </div>
                    <div class='profile'>
                      <p class='title'>
                        <img
                          class='image'
                          src={require('images/heart.png').default}
                          alt='like'
                        />
                        {post.postLike}
                        <i class='icon'></i>
                        <img
                          class='image'
                          src={require('images/chat.png').default}
                          alt='cmt'
                        />
                        {post.commentListCount}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </Link>
          ) : null
        )}
    </div>
  ) : (
    <div class='article'>
      <div class='block-title'>
        <h2>나의 게시글</h2>
        <Link to='/mypage/mypost'>
          <button onclick='/'>더보기</button>
        </Link>
      </div>
      <div className='mypage-msg'>
        <div className='content'>작성한 게시글이 없습니다.</div>
      </div>
    </div>
  );
};

export default MyPost;
