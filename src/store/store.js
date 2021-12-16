import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from '../reducer';

const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware();

	const store = createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(sagaMiddleware))
	);

	sagaMiddleware.run(rootSaga);

	return store;
};

export default configureStore;
