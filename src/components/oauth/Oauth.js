import React, { useState, useHistory, useEffect } from 'react';
import {
	KAKAO_JAVASCRIPT_KEY,
	REDIRECT_URI,
	REST_API_KEY,
	CLIENT_SECRET,
} from 'config/config';
import qs from 'qs';
import axios from 'axios';

// const Oauth = () => {
// 	// calllback으로 받은 인가코드
// 	const code = new URL(window.location.href).searchParams.get('code');
// 	const history = useHistory();

// 	const getToken = async () => {
// 		try {
// 			// access token 가져오기
// 			const res = await axios.post(
// 				`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`
// 			);

// 			// Kakao Javascript SDK 초기화
// 			window.Kakao.init(REST_API_KEY);
// 			// access token 설정
// 			window.Kakao.Auth.setAccessToken(res.data.access_token);
// 			history.replace('/join');
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	};

// 	useEffect(() => {
// 		getToken();
// 	}, []);

// 	return null;
// };

export default Oauth;
