import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';

const rootReducer = combineReducers({
	auth,
});

// * : 제너레이터 문법. 감시하고 있다가 ?
export function* rootSaga() {
	yield all([authSaga()]);
}

export default rootReducer;
