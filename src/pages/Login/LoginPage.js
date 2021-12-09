import React, { useState } from 'react';
import { REST_API_KEY, REDIRECT_URI } from 'config/config';
import axiosInstance from 'api/customAxios';
import Kakao from 'components/oauth/Kakao';
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
			<Kakao />
		</div>
	);
};

export default LoginPage;
