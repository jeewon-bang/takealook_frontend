import React from 'react';
import { Link } from 'react-router-dom';
import './PostList.scss';

const PostList = (props) => {
  const { id, title, content, writer, like, comment, created_at, board } =
    props.post;

  let today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  // const todayCustom = year + '-' + month + '-' + date;
  const todayCustom = `${year}-${month >= 10 ? month : '0' + month}-${
    date >= 10 ? date : '0' + date
  }`;

  // console.log(todayCustom); //2021-12-14
  // console.log(created_at.substring(0, 10));

  return (
    <div>
      <Link to={'/community/post/' + id} className='link'>
        <div class='card'>
          <div class='card-header'>
            {todayCustom === created_at.substring(0, 10) ? (
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
              {/* <h3></h3> */}
              <p>
                <font size='2' color='#ffa800'>
                  <strong>{board}</strong>
                </font>
              </p>
              <h1 className='card-body-header-title'>{title}</h1>
              <p>{content}</p>
            </div>
            <p class='card-body-description'>{content}</p>

            <div class='card-body-footer'>
              <i class='card-body-nickname'>{writer}</i>
              <i class='icon icon-like_count'></i>
              <img
                class='image'
                src={require('images/heart.png').default}
                alt='like'
              />
              {like}
              <i class='icon icon-comments_count'></i>
              <img
                class='image'
                src={require('images/chat.png').default}
                alt='cmt'
              />
              {comment}
              <i class='reg_date'> {created_at.substring(0, 10)} </i>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostList;
