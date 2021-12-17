import { createAction, handleActions } from 'redux-actions';
import {
	createRequestActionTypes,
	createRequestSaga,
} from 'saga/createRequestSaga';
import * as authApi from 'api/auth';
import { takeLatest } from '@redux-saga/core/effects';

/** 액션 타입 생성 */
const [GOOGLE_REQUEST, GOOGLE_SUCCESS, GOOGLE_FAILURE] =
	createRequestActionTypes('GOOGLE');
const [KAKAO_REQUEST, KAKAO_SUCCESS, KAKAO_FAILURE] =
	createRequestActionTypes('KAKAO');
const [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE] =
	createRequestActionTypes('LOGOUT');
// 자동로그인
const [LOADUSER_REQUEST, LOADUSER_SUCCESS, LOADUSER_FAILURE] =
	createRequestActionTypes('LOADUSER');

/** 액션 creator (createAction 함수를 액션객체 자동으로 생성) */
export const googleAction = createAction(GOOGLE_REQUEST, (data) => data);
export const kakaoAction = createAction(KAKAO_REQUEST, (data) => data);

// 사가 creator - authApi.socialLogin 을 실행할 것임
const googleSaga = createRequestSaga(GOOGLE_REQUEST, authApi.googleLogin);
const kakaoSaga = createRequestSaga(KAKAO_REQUEST, authApi.kakaoLogin);

// 액션타입을 모니터링하고 있다가 GOOGLE_REQUEST라는 액션이 발생하면 googleSaga를 호출
export function* authSaga() {
	yield takeLatest(GOOGLE_REQUEST, googleSaga);
	yield takeLatest(KAKAO_REQUEST, kakaoSaga);
	// takeLatest : 버튼 여러번 눌렀을때 마지막에 누른 것만 포착해서 실행
}

// 초기 상태 선언
const initialState = {
	loginRequest: false,
	loginDone: false,
	loginError: null,
	principal: null,
};

const auth = handleActions(
	{
		[GOOGLE_REQUEST]: (state, { payload: data }) => ({
			...state,
			loginRequest: true,
		}),
		[GOOGLE_SUCCESS]: (state, { payload: data }) => ({
			...state,
			loginDone: true,
			principal: data,
		}),
		[GOOGLE_FAILURE]: (state, { payload: error }) => ({
			...state,
			loginError: error,
		}),
		[KAKAO_REQUEST]: (state, { payload: data }) => ({
			...state,
			loginRequest: true,
		}),
		[KAKAO_SUCCESS]: (state, { payload: data }) => ({
			...state,
			loginDone: true,
			principal: data,
		}),
		[KAKAO_FAILURE]: (state, { payload: error }) => ({
			...state,
			loginError: error,
		}),
	},
	initialState
);

export default auth;
