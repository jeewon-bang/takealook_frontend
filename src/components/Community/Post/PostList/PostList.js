import React from 'react';
import { Link } from 'react-router-dom';
import './PostList.scss';

const PostList = (props) => {
  const { post } = props;
  //<> 태그 제거 + 이미지도 제거
  const newContent = post.content.replace(/(<([^>]+)>)/gi, '');

  let today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const todayCustom = `${year}-${month >= 10 ? month : '0' + month}-${
    date >= 10 ? date : '0' + date
  }`;

  return (
    <div>
      <div class='cards'>
        <div
          class='card-header'
          style={{
            backgroundImage: `url(${post.thumbnail})`,
          }}
        >
          {todayCustom === post.modifiedAt.substring(0, 10) ? (
            <div class='card-header-is_closed'>
              <div class='card-header-text'>new!</div>
            </div>
          ) : null}
        </div>

        <div class='card-body'>
          <div class='card-body-header'>
            <p>
              <font size='2' color='#ffa800'>
                <strong>{post.board.name}</strong>
              </font>
            </p>
            <h1 className='card-body-header-title'>{post.title}</h1>
            <p>{newContent}</p>
          </div>

          <div class='card-body-footer'>
            <img
              src={post.writer.userImage}
              className='postlist-userimg'
              alt='user'
            />
            {post.writer.dflag === false ? (
              <i class='card-body-nickname'>{post.writer.userName}</i>
            ) : (
              <i class='card-body-nickname'>탈퇴회원</i>
            )}
            <i class='icon icon-like_count'></i>
            {/* {post.checkLike === true ? (
              <img
                class='image'
                src={require('images/heart_like.png').default}
                alt='like'
              />
            ) : ( */}
            <img
              class='image'
              src={require('images/heart.png').default}
              alt='like'
            />
            {/* )} */}
            {post.postLike}
            <i class='icon icon-comments_count'></i>
            <img
              class='image'
              src={require('images/chat.png').default}
              alt='cmt'
            />
            {post.commentListCount}
            <i class='reg_date'> {post.modifiedAt.substring(0, 10)} </i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;
