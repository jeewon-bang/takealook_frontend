import React, { useState } from 'react';
import { KAKAO_JAVASCRIPT_KEY, REDIRECT_URI } from 'config/config';
import KakaoLogin from 'react-kakao-login';
import GoogleLogin from 'react-google-login';
import { googleAction, kakaoAction, withdrawlAction } from 'reducer/auth';
import { useDispatch, useSelector } from 'react-redux';
import { GOOGLE_CLIENTID } from 'config/config';
import { useNavigate } from 'react-router-dom';
import './LoginPage.scss';
import useUpdateEffect from 'utils/useUpdateEffect';
import axiosInstance from 'api/customAxios';
import Footer from 'components/Common/Footer/Footer';

const LoginPage = () => {
  const { loginDone, withdrawl } = useSelector(({ auth }) => ({
    loginDone: auth.loginDone,
    withdrawl: auth.withdrawl,
  }));
  const user = localStorage.getItem('user');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const kakaoLogin = (res) => {
    dispatch(kakaoAction(res));
  };

  const googleLogin = (res) => {
    dispatch(googleAction(res)); // auth reducer에서 만든 googleAction이라는 액션 호출한다
  };

  // 로그인 완료후 메인페이지로 이동
  useUpdateEffect(() => {
    navigate('/');
  }, [loginDone]);

  useUpdateEffect(() => {
    if (window.confirm('탈퇴한 회원입니다. 계정을 복구하시겠습니까?')) {
      axiosInstance.patch(`/user/${user.id}/restore`).then((res) => {
        localStorage.clear();
        alert('계정 복구가 완료되었습니다. 재로그인 해주세요.');
        window.location.reload(); // 이러면..되나..?
      });
    }
  }, [withdrawl]);

  return (
    <div>
      <div className='content-container'>
        <div className='mainpage-container'>
          <div className='mainpage-container-topbox'>
            <img
              src={require('images/main1.png').default}
              className='mainpage-container-topbox-img'
              alt='main1'
            />
          </div>
          <div className='mainpage-container-bottombox'>
            <div className='login-box'>
              <KakaoLogin
                token={KAKAO_JAVASCRIPT_KEY}
                onSuccess={kakaoLogin}
                onFaile={kakaoLogin}
                onLogout={''}
                render={(renderProps) => (
                  <button
                    className='kakao-login-button'
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <img
                      src={require('images/kakao.png').default}
                      style={{ width: '30px', marginRight: '10px' }}
                      alt='kakao'
                    />
                    카카오 계정으로 로그인
                  </button>
                )}
              />
              <br />
              <GoogleLogin
                clientId={GOOGLE_CLIENTID}
                onSuccess={googleLogin}
                onFailure={googleLogin}
                cookiePolicy={'single_host_origin'} // 구글로그인의 경우 넣어줘야함
                render={(renderProps) => (
                  <button
                    className='google-login-button'
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <img
                      src={require('images/google.png').default}
                      style={{ width: '30px', marginRight: '10px' }}
                      alt='kakao'
                    />
                    구글 계정으로 로그인
                  </button>
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
