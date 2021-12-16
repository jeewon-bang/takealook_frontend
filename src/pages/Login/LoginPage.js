import React, { useState } from 'react';
import axiosInstance from 'api/customAxios';
import { KAKAO_JAVASCRIPT_KEY, REDIRECT_URI } from 'config/config';
import KakaoLogin from 'react-kakao-login';
import GoogleLogin from 'react-google-login';
import { googleAction } from 'reducer/auth';
import { useDispatch, useSelector } from 'react-redux';

const LoginPage = () => {
	// const [user, setUser] = useState(null);

	// const kakaoLogin = () => {
	// 	window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
	// };

	// dispatch: store에 저장된 전역함수? 호출할때
	const dispatch = useDispatch();

	const googleLogin = (response) => {
		console.log(response); // 구글이 로그인 다하고 준 정보
		dispatch(googleAction(response)); // auth reducer에서 만든 googleAction이라는 액션 호출한다
	};

	return (
		<div>
			{/* <button className='kakao-login-button' onClick={kakaoLogin}>
				카카오 로그인
			</button> */}
			{/* <button onClick={loginRequest}>카카오로그인</button> */}
			{/* <button onClick={loginRequest}>구글로그인</button>  */}
			<KakaoLogin
				token={KAKAO_JAVASCRIPT_KEY}
				callbackUrl={REDIRECT_URI}
				render={(renderProps) => (
					<div onClick={renderProps.onClick} disabled={renderProps.disabled}>
						카카오로그인
					</div>
				)}
				onSuccess={(res) => {
					console.log(res);
				}}
				onFaile={(err) => {
					console.log(err);
				}}
			/>

			<GoogleLogin
				clientId='209691932995-18pa50488koof918nk1q6qkmbsc6ojna.apps.googleusercontent.com'
				buttonText='Google Login'
				onSuccess={googleLogin}
				onFailure={googleLogin}
				cookiePolicy={'single_host_origin'}
			/>
		</div>
	);
};

export default LoginPage;
