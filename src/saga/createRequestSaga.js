import { call, delay, put } from 'redux-saga/effects';
import { useNavigate } from 'react-router-dom';

// type을 인자로 받아서 type_REQUEST, type_SUCCESS, type_FAILURE 형태로 만들어주는 함수
export const createRequestActionTypes = (type) => {
	const REQUEST = `${type}_REQUEST`;
	const SUCCESS = `${type}_SUCCESS`;
	const FAILURE = `${type}_FAILURE`;

	return [REQUEST, SUCCESS, FAILURE];
};

export function createRequestSaga(type, request) {
	// type_SUCCESS 형태를 GOOGLE_SUCCESS / KAKAO_SUCCESS 형태로 만들어줌
	const SUCCESS = type.replace(/REQUEST/g, 'SUCCESS');
	const FAILURE = type.replace(/REQUEST/g, 'FAILURE');

	return function* (action) {
		try {
			console.log('보낼거야');
			const response = yield call(request, action.payload); //call 은 사가 문법인데,
			console.log('보냈다');
			console.log(response);

			const token = response.headers.authorization;
			const userData = response.data;
			console.log('token', token);

			localStorage.setItem('jwt', token);
			localStorage.setItem('user', JSON.stringify(userData));

			yield put({
				//사가 문법 중의 액션 타입을 실행시켜줘요.
				type: SUCCESS,
				payload: response.data.data,
			});
		} catch (e) {
			const errorData = e.response.data;

			console.error('error data', errorData);

			yield put({
				type: FAILURE,
				payload: errorData,
				error: true,
			});
		}
	};
}
