import { createAction, handleActions } from 'redux-actions';

// 액션 타입
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';

// 액션 creator
export const startLoading = createAction(
	START_LOADING,
	(requestType) => requestType
);
export const finishLoading = createAction(
	FINISH_LOADING,
	(requestType) => requestType
);

// 초기 상태 선언
const initialState = {
	//check: null,
};

// 리듀서
const loading = handleActions(
	{
		[START_LOADING]: (state, action) => {
			return {
				...state,
				[action.payload]: true,
			};
		},
		[FINISH_LOADING]: (state, action) => {
			return {
				...state,
				[action.payload]: false,
			};
		},
	},
	initialState
);

export default loading;
