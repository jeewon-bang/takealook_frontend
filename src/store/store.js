import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from '../reducer';
import history from 'utils/history';

const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware({
		context: { history: history },
	});

	const store = createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(sagaMiddleware)) // 사가 미들웨어 적용
	);

	sagaMiddleware.run(rootSaga);

	return store;
};

export default configureStore;
