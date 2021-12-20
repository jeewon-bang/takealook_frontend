import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Common/Header/Header';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import MyCatPage from './pages/MyCatPage/MyCatPage';
import './App.css';
import MyPage from './pages/MyPage/MyPage/MyPage';
import CatDetailPage from './pages/CatDetail/CatDetailPage';
import CatRegisterPage from 'pages/CatRegisterPage/CatRegisterPage';
import PostDetailPage from 'pages/Community/PostDetail/PostDetailPage';
import PostWritePage from 'pages/Community/PostWrite/PostWritePage';
import PostListPage from 'pages/Community/PostList/PostListPage';
import CatUpdatePage from 'pages/CatUpdatePage/CatUpdatePage';
import RecomendationPage from 'pages/MatchingPage/Recomendation/RecomendationPage';
import MyMatchingPage from 'pages/MatchingPage/MyMatch/MyMatchingPage';
import MatchingPage from 'pages/MatchingPage/Match/MatchingPage';
import MyLikePage from 'pages/MyPage/MyLikePage/MyLikePage';
import MyPostPage from 'pages/MyPage/MyPostPage/MyPostPage';
import Test from 'components/CatRegister/CatImageUpload/Test';
import OauthRedirectHandler from 'pages/Login/OauthRedirectHandler';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserAction } from 'reducer/auth';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		console.log('자동 재로그인');
		dispatch(loadUserAction());
	}, []);

	return (
		<div>
			<Header />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login/' element={<LoginPage />} />
				<Route path='/mycat/' element={<MyCatPage />} />
				<Route path='/mycat/:catId' element={<CatDetailPage />} />
				<Route path='/mycat/:catId/update' element={<CatUpdatePage />} />
				<Route path='/mycat/new' element={<CatRegisterPage />} />
				<Route path='/recomendation' element={<RecomendationPage />} />
				<Route path='/mymatch' element={<MyMatchingPage />} />
				<Route path='/match' element={<MatchingPage />} />
				<Route path='/mypage' element={<MyPage />} />
				<Route path='/mypage/mylike' element={<MyLikePage />} />
				<Route path='/mypage/mypost' element={<MyPostPage />} />
				<Route path='/community' element={<PostListPage />} />
				<Route path='/community/write' element={<PostWritePage />} />
				<Route path='/community/post/:index' element={<PostDetailPage />} />
				<Route path='/test' element={<Test />} />
				<Route path='/oauth/:accesstoken' element={<OauthRedirectHandler />} />
			</Routes>
		</div>
	);
}

export default App;
