import { Route, Routes } from 'react-router-dom';
import PostDetail from './components/community/PostDetail';
import Header from './components/Header/Header';
import CommunityPage from './pages/community/CommunityPage';
import WritePage from './pages/community/WritePage';
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
        <Route path='/community' element={<CommunityPage />} />
        <Route path='/community/write' element={<WritePage />} />
        <Route path='/community/post/:id' element={<PostDetail />} />
        {/* <Route path='/board/' element={<BoardPage />} />
				<Route path='/board/write/' element={<WritePage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
