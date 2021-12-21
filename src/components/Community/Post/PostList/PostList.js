import React from 'react';
import { Link } from 'react-router-dom';
import './PostList.scss';

const PostList = (props) => {
  const { post } = props;
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
          {/* <div class='card-header-number'> 2 / 5 </div> */}
          {/* <img src={post.img} alt='img' /> */}
          {/* <img class='headerimage' src={backgroundimgs} alt='img' /> */}
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
          {/* <p class='card-body-description'>
            {newContent} hover할때 내용부분
          </p> */}

          <div class='card-body-footer'>
            <i class='card-body-nickname'>
              {post.writer.dflag === false ? post.writer.userName : '익명'}
            </i>
            <i class='icon icon-like_count'></i>
            <img
              class='image'
              src={require('images/heart.png').default}
              alt='like'
            />
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
