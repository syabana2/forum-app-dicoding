import React, {useEffect} from 'react';
import {useNavigate, Routes, Route} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {asyncPreloadProcess} from './states/isPreload/action';
import {asyncUnsetAuthUser} from './states/authUser/action';
import BottomNavigation from './components/BottomNavigation';
import TopBar from './components/TopBar';
import ThreadsPage from './pages/ThreadsPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateThreadPage from './pages/CreateThreadPage';
import Loading from './components/Loading';

function App() {
  const authUser = useSelector((states) => states.authUser);
  const isPreload = useSelector((states) => states.isPreload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  const navigate = useNavigate();

  const redirectTo = (path) => {
    navigate(path);
  };

  if (isPreload) {
    return null;
  }

  return (
    <>
      <Loading/>
      <div className='app'>
        <header>
          <TopBar />
        </header>
        <main>
          <Routes>
            <Route path='/' element={<ThreadsPage />} />
            <Route path='/leaderboards' element={<LeaderboardsPage />} />
            <Route path='/threads/:id' element={<DetailPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />}></Route>
            <Route path='/new' element={<CreateThreadPage />}></Route>
          </Routes>
        </main>
        <footer>
          <BottomNavigation authUser={authUser} signOut={onSignOut} redirectTo={redirectTo}/>
        </footer>
      </div>
    </>
  );
}

export default App;
