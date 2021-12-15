import React from 'react';
import { Link } from 'react-router-dom';

const LikePost = (props) => {
  const { likePosts, setLikePosts } = props;
  return (
    <div class='article'>
      <div class='block-title'>
        <h2>좋아한 게시글</h2>
        <Link to='/mypage/mylike'>
          <button onclick='/'>더보기</button>
        </Link>
      </div>
      {likePosts &&
        likePosts.map((post, index) =>
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
                      <div class='modified_at'>{post.modified_at}</div>
                    </div>
                    <div class='profile'>
                      <p>{post.writer}</p>
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

export default LikePost;
