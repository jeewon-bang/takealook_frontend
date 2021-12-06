import React, { useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './MyPageNav.scss';

const MyPageNav = () => {
  return (
    <div>
      <div class='list-title'>
        <h2>박세은님의 페이지</h2>
      </div>
      <div class='tab-content'>
        <div class='tab-inner'>
          <div class='MyPage-Nav'>
            <div class='MyPage-Nav'>
              <Link to='/profile' className='nav-link'>
                프로필
              </Link>
              <Link to='/mypage' className='nav-link'>
                나의 게시글
              </Link>
              <Link to='/like' className='nav-link'>
                좋아요
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageNav;
