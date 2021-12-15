import { Route, Routes } from 'react-router-dom';
import Header from './components/common/Header/Header';
import HomePage from './pages/Home/HomePage';
import JoinPage from './pages/Join/JoinPage';
import LoginPage from './pages/Login/LoginPage';
import MyCatPage from './pages/MyCatPage/MyCatPage';
import './App.css';
import MyPage from './pages/MyPage/MyPage/MyPage';
import CatDetailPage from './pages/CatDetail/CatDetailPage';
import CatRegisterPage from 'pages/CatRegisterPage/CatRegisterPage';
import OAuth2RedirectHandler from 'components/oauth/OAuth2RedirectHandeler';
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
        <Route path='/recomendation' element={<RecomendationPage />} />
        <Route path='/mymatch' element={<MyMatchingPage />} />
        <Route path='/match' element={<MatchingPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/mypage/mylike' element={<MyLikePage />} />
        <Route path='/mypage/mypost' element={<MyPostPage />} />
        <Route path='/community' element={<PostListPage />} />
        <Route path='/community/write' element={<PostWritePage />} />
        <Route path='/community/post/:id' element={<PostDetailPage />} />
        <Route path='/oauth/callback/*' element={<OAuth2RedirectHandler />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </div>
  );

}

export default App;
