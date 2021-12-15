import React, { useState } from 'react';
import axiosInstance from 'api/customAxios';
import { KAKAO_JAVASCRIPT_KEY, REDIRECT_URI } from 'config/config';
import KakaoLogin from 'react-kakao-login';
const LoginPage = () => {
	// const [user, setUser] = useState(null);

	// const kakaoLogin = () => {
	// 	window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
	// };

	const [provider, setProvider] = useState('');
	const loginRequest = () => {
		axiosInstance.get('/login/kakao');
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
				}}></KakaoLogin>
		</div>
	);
};

export default LoginPage;
