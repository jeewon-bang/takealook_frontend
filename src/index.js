import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/store';

const store = configureStore();

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			{/* store를 모든 곳에서 쓸수있게 하기위해 App을 Provider로 감싸준다 */}
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
