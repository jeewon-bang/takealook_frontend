import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/Home/HomePage';
import JoinPage from './pages/Join/JoinPage';
import LoginPage from './pages/Login/LoginPage';
import MyCatPage from './pages/MyCat/MyCatPage';

// Route : 페이지가 바뀌는게 아니라 화면에서 객체만 바꿔서 그리기 (리액트는 single page application)
// react-router-dom 6버전 기준 강의내용이랑 좀 다른듯
function App() {
	return (
		<div>
			<Header />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login/' element={<LoginPage />} />
				<Route path='/join/' element={<JoinPage />} />
				<Route path='/mycat/' element={<MyCatPage />} />
				{/* <Route path='/board/' element={<BoardPage />} />
				<Route path='/board/write/' element={<WritePage />} /> */}
			</Routes>
		</div>
	);
}

export default App;
