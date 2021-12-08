import React, { useState } from 'react';
import { REST_API_KEY, REDIRECT_URI } from 'config/config';
const LoginPage = () => {
	const [user, setUser] = useState(null);

	const kakaoLogin = () => {
		window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
	};

	return (
		<div>
			<button className='kakao-login-button' onClick={kakaoLogin}>
				카카오 로그인
			</button>
		</div>
	);
};

export default LoginPage;
