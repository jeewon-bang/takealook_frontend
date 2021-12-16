import { createAction, handleActions } from 'redux-actions';
import {
	createRequestActionTypes,
	createRequestSaga,
} from 'libs/createRequestSaga';
import * as authApi from 'api/auth';
import { takeLatest } from '@redux-saga/core/effects';

// 액션 타입 생성 (api 요청할 때 액션타입은 무조건 REQUEST / SUCCESS / FAILURE 이렇게 3개 만든다)
const [GOOGLE_REQUEST, GOOGLE_SUCCESS, GOOGLE_FAILURE] =
	createRequestActionTypes('GOOGLE');

//액션 생성함수
export const googleAction = createAction(GOOGLE_REQUEST, (data) => data);
// 페이지에서 사용자가 구글로그인 버튼 눌러서 이 googleAction이 실행되면 GOOGLE_REQUEST라는 액션이 생성되게 된다

/** 사가 생성 */
// redux-saga: 액션을 모니터링하고 있다가, 특정 액션이 발생하면 특정 작업을 하게 하는 방식으로 사용한다
const googleSaga = createRequestSaga(GOOGLE_REQUEST, authApi.socialLogin); // GOOGLE_REQUEST 라는 액션이 발생하면 authApi.socialLogin(백서버로 요청 전송) 이라는 작업을 실행

// * : 제너레이터 문법. 계속 모니터링하고 있다가 GOOGLE_REQUEST라는 액션이 발생하면 googleSaga를 호출한다
// genereater : 원래 함수는 한번 리턴하면 종료되는데, 제너레이터 함수를 사용하면 순차적으로 여러번 리턴할 수 있다
export function* authSaga() {
	yield takeLatest(GOOGLE_REQUEST, googleSaga);
	// takeLatest : 버튼 여러번 눌렀을때 마지막에 누른 것만 포착해서 실행
}

// 초기 상태 선언
const initialState = {
	googleRequest: false, //이 상태값들은 전역변수, 어떤 위치의 컴포넌트도 다 가져서 쓸 수가 있어요.
	googleDone: false,
	googleError: null,

	principal: null,
};

const auth = handleActions(
	{
		[GOOGLE_REQUEST]: (state, { payload: data }) => ({
			...state,
			googleRequest: true,
		}),

		[GOOGLE_SUCCESS]: (state, { payload: data }) => ({
			...state,
			googleDone: true,
			principal: data,
		}),
		[GOOGLE_FAILURE]: (state, { payload: error }) => ({
			...state,
			googleError: error,
		}),
	},
	initialState
);

export default auth;
