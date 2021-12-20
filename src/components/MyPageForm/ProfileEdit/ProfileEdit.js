import axiosInstance from 'api/customAxios';
import ImgUpload from 'components/Common/ImgUpload';
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
  const [newUserImg, setNewUserImg] = useState(null);
  const [userInfo, setUserInfo] = useState({
    nickname: user.nickname,
    phone: user.phone,
  });

  // form 내의 값들이 변경되었을때 실행
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const userInfosubmit = async () => {
    console.log(newUserImg);
    console.log(userInfo);

    const formData = new FormData();

    formData.append('profileImg', newUserImg);

    formData.append(
      'userInfo',
      new Blob([JSON.stringify(userInfo)], { type: 'application/json' })
    );

    // 콘솔에 찍어보기
    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    axiosInstance
      .put('/user/1', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        console.log(res);
        res.data === user.id
          ? alert('수정이 완료되었습니다.')
          : alert('오류가 발생하였습니다.');
      })
      .catch((err) => {});
  };

  const nicknameCheck = () => {
    let nickname = {
      nickname: userInfo.nickname,
    };

    axiosInstance
      .post(`/user/check`, nickname, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        console.log(res);
        res.data
          ? alert('사용가능한 닉네임입니다.')
          : alert('이미 사용중인 닉네임입니다.');
      })
      .catch((err) => {});
    // false일때 .(정보수정 버튼 클릭시 닉네임 중복알림 뜨도록 처리하기)
  };

  const withdrawalSubmit = () => {
    //탈퇴요청
    if (window.confirm('탈퇴하시겠습니까?')) {
      axiosInstance
        .patch(`/user/{userId}`)
        .then((res) => {
          console.log(res);
          res.data === user.id
            ? alert('탈퇴가 완료되었습니다.')
            : alert('오류발생');
        })
        .catch((err) => {});
    } else {
      alert('취소합니다.');
    }
  };

  return (
    <div className='editModal-background' onClick={closeModal}>
      <div className='modal-wrapper'>
        <div className='MyProfileEdit'>
          <div className='edit-titleBox'>
            <h2 className='edit-title'>정보수정</h2>
            <button className='submitButton' onClick={withdrawalSubmit}>
              회원탈퇴하기
            </button>
          </div>
          <div className='Profile-form'>
            <div className='input-label'>
              <label className='profile-label'>아이디</label>
              <input
                className='id-input'
                type='text'
                name='login_id'
                value={user.loginId}
              />
            </div>
            <div className='input-label'>
              <label className='profile-label'>닉네임</label>
              <input
                className='profile-input'
                type='text'
                name='nickname'
                placeholder={user.nickname}
                onChange={handleChange}
              />
              <button className='checkButton' onClick={nicknameCheck}>
                중복확인
              </button>
            </div>

            <div className='input-label'>
              <label className='profile-label'>프로필 사진</label>
              <ImgUpload
                user={user}
                newUserImg={newUserImg}
                setNewUserImg={setNewUserImg}
              />
            </div>
            <button className='profile-update' onClick={userInfosubmit}>
              정보수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
