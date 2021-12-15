import axiosInstance from 'api/customAxios';
import CatImageUpload from 'components/CatRegister/CatImageUpload/CatImageUpload';
import React, { useState } from 'react';
import './ProfileEdit.scss';

const ProfileEdit = (props) => {
  const { user, setUser, setShowModal } = props;

  // 캘린더 모달창 끄는 함수
  const closeModal = (e) => {
    e.target.className === 'modal-wrapper'
      ? setShowModal(false)
      : setShowModal(true);
  };
  const [userInfo, setUserInfo] = useState({
    nickname: user.nickname,
    phone: user.phone,
    user_img: user.user_img,
  });

  // form 내의 값들이 변경되었을때 실행
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    //탈퇴요청
    try {
      const response = await axiosInstance.patch(`/user/1`);
      console.log(response);
      response.data ? alert('탈퇴가 완료되었습니다.') : alert('오류발생');
    } catch (err) {
      console.log('Error >>', err);
    }
  };

  const checkSubmit = async () => {
    //닉네임 중복 체크 요청 - true - 사용가능한 닉네임입니다.
    // false - 이미 사용중인 닉네임입니다.(정보수정 버튼 클릭시 닉네임 중복알림 뜨도록 처리하기)
    try {
      const response = await axiosInstance.post(
        `/user/check`,
        userInfo.nickname,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response);
      response.data
        ? alert('사용가능한 닉네임입니다.')
        : alert('이미 사용중인 닉네임입니다.');
    } catch (err) {
      console.log('Error >>', err);
    }
  };

  const userInfosubmit = async () => {
    try {
      const response = await axiosInstance.put(`/user/1`, userInfo, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
    } catch (err) {
      console.log('Error >>', err);
    }
  };

  return (
    <div className='modal-background' onClick={closeModal}>
      <div className='modal-wrapper'>
        <div className='MyProfile'>
          <div className='edit-titleBox'>
            <h2 className='edit-title'>정보수정</h2>
            <button className='submitButton' type='button' onclick={submit}>
              회원탈퇴하기
            </button>
          </div>
          <div className='Profile-form'>
            <div className='input-label'>
              <label>아이디</label>
              <input
                className='id-input'
                type='text'
                name='login_id'
                value={user.loginId}
              />
            </div>
            <div className='input-label'>
              <label>닉네임</label>
              <input
                className='profile-input'
                type='text'
                name='nickname'
                placeholder={user.nickname}
                onChange={handleChange}
              />
              <button className='checkButton' onClick={checkSubmit}>
                중복확인
              </button>
            </div>

            <div className='input-label'>
              <label>휴대폰 번호</label>
              <input
                className='phone-input'
                type='text'
                name='phone'
                placeholder={user.phone}
                onChange={handleChange}
              />
            </div>

            <div className='input-label'>
              <label>프로필 사진</label>
              <img
                className='care'
                src={require('images/happy.png').default}
                alt='defaltImg'
              />
              <input
                type='file'
                id='user_img'
                accept='image/*, .jfif'
                name='user_img'
                autocomplete='off'
                onChange={handleChange}
              />
              {/* <CatImageUpload
                image={userInfo.image}
                setImage={setUserInfo.image}
              /> */}
            </div>

            <button className='update' onClick={userInfosubmit}>
              정보수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
