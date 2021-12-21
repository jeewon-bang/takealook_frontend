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
		<BrowserRouter history={history}>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
