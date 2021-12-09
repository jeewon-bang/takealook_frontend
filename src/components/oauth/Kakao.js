import React, { useState } from 'react';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import { KAKAO_JAVASCRIPT_KEY, REDIRECT_URI } from 'config/config';
import axiosInstance from 'api/customAxios';

const KakaoBtn = styled(KakaoLogin)`
	padding: 0;
	width: 300px;
	height: 45px;
	line-height: 44px;
	color: #783c00;
	background-color: #ffeb00;
	border: 1px solid transparent;
	border-radius: 3px;
	font-size: 14px;
	font-weight: bold;
	text-align: center;
	cursor: pointer;
	&:hover {
		box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
	}
`;

const Kakao = () => {
	return (
		<div>
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
					axiosInstance.post('', res, { 'Content-Type': 'application/json' });
				}}
				onFaile={(err) => {
					console.log(err);
				}}></KakaoLogin>
		</div>
	);
};

export default Kakao;
