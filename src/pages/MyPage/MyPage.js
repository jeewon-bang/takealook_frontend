import axios from 'axios';
import MyPageNav from 'components/MyPageForm/Nav/MyPageNav';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyPage.scss';

const MyPage = () => {
  return (
    <div class='content-body'>
      <MyPageNav />
      <div class='main-inner'>
        <div class='side-profile'>
          <img
            class='img-circle'
            src={require('images/happy.png').default}
            alt='cat'
          />
          <p>
            <span>박세은</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
