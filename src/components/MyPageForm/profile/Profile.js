import React, { useState } from 'react';
import Location from '../../../components/Join/Location';
import './Profile.scss';

const Profile = () => {
  const [values, setValues] = useState({
    nickname: '',
    phone: '',
    location: [],
  });

  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);

  // form 내의 값들이 변경되었을때 실행
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault(); // 기존 form action 무시
    console.log('요청전송! ' + JSON.stringify(values));
    // axios({
    //   method: 'post',
    //   url: 'localhost/??',
    //   headers: {
    //     "Content-Type": "application/json;charset=utf-8"
    //   },
    //   body: JSON.stringify(values)
    // });
  };

  return (
    <div>
      <div class='MyProfile'>
        <div class='title'>
          <h2>정보수정</h2>
          <button type='button' onclick=''>
            회원탈퇴하기
          </button>
        </div>
        <div class='Profile-form'>
          <form onSubmit={submit}>
            <div class='input-label'>
              <label>아이디</label>
              <input type='text' name='loginId' onBlur={handleChange} />
            </div>

            <div class='input-label'>
              <label>닉네임</label>
              <input type='text' name='nickname' onBlur={handleChange} />
              <button>중복확인</button>
            </div>

            <div class='input-label'>
              <label>휴대폰 번호</label>
              <input type='text' name='phone' onBlur={handleChange} />
            </div>

            <div class='input-label'>
              <label>프로필 사진</label>
              <img
                class='care'
                src={require('images/happy.png').default}
                alt='defaltImg'
              />
              <input
                type='file'
                id='user_img'
                accept='image/*, .jfif'
                name='user_img'
                autocomplete='off'
              />
            </div>
            <div class='input-label'>
              <label class='locLabel'>활동 지역</label>
              <Location values={values} setValues={setValues} />
              <Location values={values} setValues={setValues} />
              <Location values={values} setValues={setValues} />
            </div>
            <button class='update' onClick={submit}>
              정보수정
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
