import React, { useState } from 'react';
import ProfileEdit from '../ProfileEdit/ProfileEdit';
import './Profile.scss';

const Profile = (props) => {
  const { user, setUser } = props;
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div class='mypage-profile'>
      <p class='hello'>Hello, {user.login_id}</p>
      <div class='figure' id='myProfile'>
        <div class='profile_container'>
          <img
            class='img-circle'
            src={require('images/happy.png').default}
            alt='cat'
          />
        </div>
        <div class='pro_info_area'>
          <p class='nick_name'>{user.nickname}</p>
          <span onClick={openModal}> MY 회원정보</span>
          {showModal && (
            <ProfileEdit
              setShowModal={setShowModal}
              user={user}
              setUser={setUser}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
