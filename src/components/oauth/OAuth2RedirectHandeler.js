import axios from 'axios';
import React, { useEffect } from 'react';

const OAuth2RedirectHandler = (props) => {
	const code = new URL(window.location.href).searchParams.get('code');
	const url = 'localhost/oauth2/authorization/kakao';

	// useEffect(() => {
	// 	axios.get(url, {params: {code:code}})
	// 	.then(res => {
	// 		console.log(res);
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});
	// }, []);

	return <div>백에다가 줄 인가코드 : {code}</div>;
};

export default OAuth2RedirectHandler;
