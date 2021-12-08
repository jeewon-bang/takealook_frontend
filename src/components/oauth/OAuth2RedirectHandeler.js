import React from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/user';

const OAuth2RedirectHandler = (props) => {
	let code = new URL(window.location.href).searchParams.get('code');

	//   React.useEffect(async () => {
	//     await dispatch(userActions.kakaoLogin(code));
	//   }, []);

	return <div>백에다가 줄 인가코드 : {code}</div>;
};

export default OAuth2RedirectHandler;
