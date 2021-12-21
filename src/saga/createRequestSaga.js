import { call, delay, getContext, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from 'reducer/loading';
import { history } from 'utils/history';

export function createRequestSaga(type, request) {
	const SUCCESS = type.replace(/REQUEST/g, 'SUCCESS');
	const FAILURE = type.replace(/REQUEST/g, 'FAILURE');

	return function* (action) {
		yield put(startLoading(type));

		try {
			const response = yield call(request, action.payload);

			const token = response.headers.authorization;
			const userData = response.data;
			localStorage.setItem('jwt', token);
			localStorage.setItem('user', JSON.stringify(response.data));

			yield put({
				// put: (사가 문법) 액션 타입 실행
				type: SUCCESS,
				payload: response,
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

		yield put(finishLoading(type)); //로딩 끝
	};
}
