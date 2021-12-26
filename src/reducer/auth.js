import { createAction, handleActions } from 'redux-actions';
import { createRequestSaga } from 'saga/createRequestSaga';
import * as authApi from 'api/auth';
import { takeLatest } from '@redux-saga/core/effects';
import history from 'utils/history';
import { useNavigate } from 'react-router-dom';

/** 액션 타입 생성 */
// type을 인자로 받아서 type_REQUEST, type_SUCCESS, type_FAILURE 형태로 만들어주는 함수
export const createRequestActionTypes = (type) => {
	const REQUEST = `${type}_REQUEST`;
	const SUCCESS = `${type}_SUCCESS`;
	const FAILURE = `${type}_FAILURE`;

	return [REQUEST, SUCCESS, FAILURE];
};

const [GOOGLE_REQUEST, GOOGLE_SUCCESS, GOOGLE_FAILURE] =
	createRequestActionTypes('GOOGLE');
const [KAKAO_REQUEST, KAKAO_SUCCESS, KAKAO_FAILURE] =
	createRequestActionTypes('KAKAO');
const [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE] =
	createRequestActionTypes('LOGOUT');
const [LOADUSER_REQUEST, LOADUSER_SUCCESS, LOADUSER_FAILURE] =
	createRequestActionTypes('LOADUSER');

/** 액션 creator (createAction 함수를 액션객체 자동으로 생성) */
export const googleAction = createAction(GOOGLE_REQUEST, (data) => data);
export const kakaoAction = createAction(KAKAO_REQUEST, (data) => data);
export const logoutAction = createAction(LOGOUT_SUCCESS);
export const loadUserAction = createAction(LOADUSER_REQUEST); // 새로고침해도 로그인 유지
// export const withdrawlAction = createAction(RESTORE_WITHDRAWL);

// 사가 creator - authApi에 정의한 작업을 실행할 것임
const googleSaga = createRequestSaga(GOOGLE_REQUEST, authApi.googleLogin);
const kakaoSaga = createRequestSaga(KAKAO_REQUEST, authApi.kakaoLogin);
const loadUserSaga = createRequestSaga(LOADUSER_REQUEST, authApi.loadUser);

// 액션타입을 모니터링하고 있다가 특정 액션타입이 발생하면 특정 Saga를 호출
export function* authSaga() {
	yield takeLatest(GOOGLE_REQUEST, googleSaga);
	yield takeLatest(KAKAO_REQUEST, kakaoSaga);
	yield takeLatest(LOADUSER_REQUEST, loadUserSaga);
	// takeLatest : 버튼 여러번 눌렀을때 마지막에 누른 것만 포착해서 실행
}

// 초기 상태 선언
const initialState = {
	loginRequest: false,
	loginDone: false,
	loginError: null,

	loadUserRequest: false,
	loadUserDone: false,
	loadUserError: null,

	logoutDone: true,
	logoutError: null,

	user: null,
	withdrawl: false,
};

const auth = handleActions(
	{
		[GOOGLE_REQUEST]: (state, { payload: response }) => ({
			...state,
			loginRequest: true,
		}),
		[GOOGLE_SUCCESS]: (state, { payload: response }) => {
			const user = response.data;
			// 탈퇴한 회원이 로그인했다면
			if (user.dflag === true) {
				return {
					...state,
					withdrawl: true,
				};
			} else {
				return {
					...state,
					loginDone: true,
					user: response.data,
				};
			}
		},
		[GOOGLE_FAILURE]: (state, { payload: error }) => ({
			...state,
			loginError: error,
		}),
		[KAKAO_REQUEST]: (state, { payload: response }) => ({
			...state,
			loginRequest: true,
			// logoutDone: false,
		}),
		[KAKAO_SUCCESS]: (state, { payload: response }) => {
			const user = response.data;
			// 탈퇴한 회원이 로그인했다면
			if (user.dflag === true) {
				return {
					...state,
					withdrawl: true,
				};
			} else {
				return {
					...state,
					loginDone: true,
					user: response.data,
				};
			}
		},
		[KAKAO_FAILURE]: (state, { payload: error }) => ({
			...state,
			loginError: error,
		}),
		[LOADUSER_REQUEST]: (state, { payload: response }) => ({
			...state,
			loadUserRequest: true,
			logoutDone: false,
		}),
		[LOADUSER_SUCCESS]: (state, { payload: response }) => ({
			...state,
			loadUserRequest: false,
			loadUserDone: true,
			loginDone: true,
			// user: response.data,
			user: JSON.parse(localStorage.getItem('user')),
		}),
		[LOADUSER_FAILURE]: (state, { payload: error }) => ({
			...state,
			loadUserError: error,
		}),
		[LOGOUT_SUCCESS]: (state, { payload: data }) => {
			localStorage.clear(); // 백에서 받은 jwt 토큰 삭제

			return {
				...state,
				logoutDone: true,
				loginDone: false,
				user: null,
			};
		},
		[LOGOUT_FAILURE]: (state, { payload: error }) => ({
			...state,
			logoutError: error,
		}),
		// [RESTORE_WITHDRAWL]: (state, { payload: error }) => ({
		// 	...state,
		// 	withdrawl: false
		// }),
	},
	initialState
);

export default auth;
