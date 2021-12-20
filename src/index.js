import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from 'store/store';
import history from 'utils/history';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		{/* BrowserRouter가 아니라 Router로 감싸줘야 사가 코드에서 페이지 이동이 정상적으로 작동함 */}
		<BrowserRouter history={history}>
			{/* <Router history={history}> */}
			<App />
			{/* </Router> */}
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
