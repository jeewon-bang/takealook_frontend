import React from 'react';
import { KAKAO_JAVASCRIPT_KEY, REDIRECT_URI } from 'config/config';
import KakaoLogin from 'react-kakao-login';

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
				}}
				onFaile={(err) => {
					console.log(err);
				}}></KakaoLogin>
		</div>
	);
};

export default Kakao;
