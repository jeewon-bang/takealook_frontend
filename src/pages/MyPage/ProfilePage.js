import MyPageNav from 'components/MyPageForm/Nav/MyPageNav';
import Profile from 'components/MyPageForm/profile/Profile';
import React from 'react';

const ProfilePage = () => {
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
        <Profile />
      </div>
    </div>
  );
};

export default ProfilePage;
