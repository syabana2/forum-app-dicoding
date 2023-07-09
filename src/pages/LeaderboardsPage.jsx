import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {asyncGetLeaderboards} from '../states/leaderboards/action';
import LeaderboardsList from '../components/LeaderboardsList';
import {Heading} from '@chakra-ui/react';

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
      <Heading as='h2' size='lg'>Klasemen Pengguna Aktif</Heading>
      <LeaderboardsList leaderboards={leaderboards} />
    </div>
  );
}

export default LeaderboardsPage;
