// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SubNav from './components/community/SubNav';
import AllPage from './pages/community/AllPage';
import BestCatPage from './pages/community/BestCatPage';
import FindCatPage from './pages/community/FindCatPage';
import HelpCatPage from './pages/community/HelpCatPage';

function App() {
  return (
    <div>
      <SubNav />
      <hr />
      <Routes>
        <Route path='/all' exact={true} element={<AllPage />} />
        <Route path='/bestcat' exact={true} element={<BestCatPage />} />
        <Route path='/findcat' exact={true} element={<FindCatPage />} />
        <Route path='/helpcat' exact={true} element={<HelpCatPage />} />
      </Routes>
    </div>
  );
}

export default App;
