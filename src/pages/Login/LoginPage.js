import React, { useState } from 'react';
import axiosInstance from 'api/customAxios';
import { KAKAO_JAVASCRIPT_KEY, REDIRECT_URI } from 'config/config';
import KakaoLogin from 'react-kakao-login';
import GoogleLogin from 'react-google-login';
import NaverLogin from 'react-naver-login';
import { googleAction, kakaoAction } from 'reducer/auth';
import { useDispatch, useSelector } from 'react-redux';
import { GOOGLE_CLIENTID } from 'config/config';
import { NAVER_CLIENTID } from 'config/config';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
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

	const naverLogin = (res) => {
		console.log(res);
	};

	return (
		<div>
			<KakaoLogin
				token={KAKAO_JAVASCRIPT_KEY}
				onSuccess={kakaoLogin}
				onFaile={kakaoLogin}
				onLogout={''}
				render={(renderProps) => (
					<div onClick={renderProps.onClick} disabled={renderProps.disabled}>
						<h1>카카오 로그인</h1>
					</div>
				)}
			/>
			<GoogleLogin
				clientId={GOOGLE_CLIENTID}
				onSuccess={googleLogin}
				onFailure={googleLogin}
				cookiePolicy={'single_host_origin'} // 구글로그인의 경우 넣어줘야함
				render={(renderProps) => (
					<div onClick={renderProps.onClick} disabled={renderProps.disabled}>
						<h1>구글로그인</h1>
					</div>
				)}
			/>
			<NaverLogin
				clientId={NAVER_CLIENTID}
				callbackUrl={REDIRECT_URI} // 네이버로그인에서 특이한점..
				callbackHandle={false}
				onSuccess={naverLogin}
				onFailure={naverLogin}
				render={(renderProps) => (
					<div onClick={renderProps.onClick} disabled={renderProps.disabled}>
						<h1>네이버 로그인</h1>
					</div>
				)}
			/>
		</div>
	);
};

export default LoginPage;
