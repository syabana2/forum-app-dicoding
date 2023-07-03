import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {asyncGetLeaderboards} from '../states/leaderboards/action';
import LeaderboardsList from '../components/LeaderboardsList';

function LeaderboardsPage() {
  const leaderboards = useSelector((state) => state.leaderboards);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  if (leaderboards.length === 0) {
    return (
      <div className='board-page'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='board-page'>
      <h2>Klasemen Pengguna Aktif</h2>
      <LeaderboardsList leaderboards={leaderboards} />
    </div>
  );
}

export default LeaderboardsPage;
