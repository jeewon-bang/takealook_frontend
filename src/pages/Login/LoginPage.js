import React, { useState } from 'react';
import { KAKAO_JAVASCRIPT_KEY, REDIRECT_URI } from 'config/config';
import KakaoLogin from 'react-kakao-login';
import GoogleLogin from 'react-google-login';
import { googleAction, kakaoAction } from 'reducer/auth';
import { useDispatch, useSelector } from 'react-redux';
import { GOOGLE_CLIENTID } from 'config/config';
import { useNavigate } from 'react-router-dom';
import './LoginPage.scss';
import useUpdateEffect from 'utils/useUpdateEffect';

const LoginPage = () => {
	const { user, loginDone, logoutDone } = useSelector(({ auth }) => ({
		user: auth.user,
		loginDone: auth.loginDone,
		logoutDone: auth.logoutDone,
	}));
	const navigate = useNavigate();
	const dispatch = useDispatch();


  const kakaoLogin = (res) => {
    console.log(res);
    dispatch(kakaoAction(res));
  };

  const googleLogin = (res) => {
    // console.log(res); // 구글이 로그인 다하고 준 정보
    dispatch(googleAction(res)); // auth reducer에서 만든 googleAction이라는 액션 호출한다
  };

	useUpdateEffect(() => {
		navigate('/');
	}, [loginDone]);

	return (
		<div className='content-container'>
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
							disabled={renderProps.disabled}>
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
							disabled={renderProps.disabled}>
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
	);
};

export default LoginPage;
