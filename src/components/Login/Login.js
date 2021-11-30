import React from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login'; // 라이브러리 설치 npm install react-google-login
import { useNavigate } from 'react-router';

const Login = () => {
	const navigate = useNavigate();

	const responseGoogle = async (response) => {
		console.log(response);
		let jwtToken = await axios.post(
			'http://localhost:8088/oauth/jwt/google', // 프론트에서 구글 로그인한 정보를 받아서 jwt 토큰 생성해서 반환해줄 컨트롤러
			JSON.stringify(response), // 보낼 로그인 정보
			{ headers: { 'Content-Type': 'application/json; charset=utf-8' } }
		);
		if (jwtToken.status === 200) {
			console.log(jwtToken);
			localStorage.setItem('jwtToken', jwtToken.data); // 받아온 jwt 토큰을 로컬스토리지에 저장
			navigate('/join');
		}
	};

	return (
		<GoogleLogin
			clientId='60559887256-hmg0dp5050q3b86n53k7tdqna6b2dr87.apps.googleusercontent.com'
			buttonText='Login'
			onSuccess={responseGoogle}
			onFailure={responseGoogle}
			cookiePolicy={'single_host_origin'}
		/>
	);
};

export default Login;
