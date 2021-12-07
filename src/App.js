import { Route, Routes } from 'react-router-dom';
import Header from './components/common/Header/Header';
import CommunityPage from './pages/community/community/CommunityPage';
import WritePage from './pages/community/write/WritePage';
import HomePage from './pages/Home/HomePage';
import JoinPage from './pages/Join/JoinPage';
import LoginPage from './pages/Login/LoginPage';
import MyCatPage from './pages/MyCat/MyCatPage';
import MyPage from './pages/MyPage/MyPage';
import LikePage from 'pages/MyPage/LikePage';
import ProfilePage from 'pages/MyPage/ProfilePage';
import CatDetailPage from './pages/CatDetail/CatDetailPage';
import CatRegisterPage from 'pages/CatRegisterPage/CatRegisterPage';
import CatUpdatePage from 'pages/CatUpdatePage/CatUpdatePage';
// import RecomendationPage from 'pages/matching/recomendation/RecomendationPage';
// import { MyMatchingPage } from 'pages/matching/Mymatch/MyMatchingPage';
// import { MatchingPage } from 'pages/matching/Match/MatchingPage';  왠지모르게 임포트가 자꾸 안돼서 잠깐 주석처리함 ㅠ
import Kakao from 'components/oauth/Kakao';
import OAuth2RedirectHandler from 'components/oauth/OAuth2RedirectHandeler';
import PostDetailPage from 'pages/community/postdetail/PostDetailPage';

// Route : 페이지가 바뀌는게 아니라 화면에서 객체만 바꿔서 그리기 (리액트는 single page application)
// react-router-dom 6버전 기준 강의내용이랑 좀 다른듯
function App() {
	return (
		<div>
			<Header />

			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login/' element={<LoginPage />} />
				<Route path='/oauth/kakao' element={<OAuth2RedirectHandler />} />
				<Route path='/join/' element={<JoinPage />} />
				<Route path='/mycat/' element={<MyCatPage />} />
				<Route path='/mycat/:catId' element={<CatDetailPage />} />
				<Route path='/mycat/update' element={<CatUpdatePage />} />
				<Route path='/mycat/new' element={<CatRegisterPage />} />
				{/* <Route path='/recomendation' element={<RecomendationPage />} /> */}
				{/* <Route path='/mymatch' element={<MyMatchingPage />} /> */}
				{/* <Route path='/match' element={<MatchingPage />} /> */}
				<Route path='/mypage' element={<MyPage />} />
				<Route path='/like' element={<LikePage />} />
				<Route path='/profile' element={<ProfilePage />} />
				<Route path='/community' element={<CommunityPage />} />
				<Route path='/community/write' element={<WritePage />} />
				<Route path='/community/post/:id' element={<PostDetailPage />} />
			</Routes>
		</div>
	);
}

export default App;
