import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardsItem from './LeaderboardsItem';

function LeaderboardsList({leaderboards}) {
  return (
    <div className='leaderboards-list'>
      <header>
        <p className='leaderboards-list__user-label'>Pengguna</p>
        <p className='leaderboards-list__score-label'>Skor</p>
      </header>
      {
        leaderboards.map((leaderboard) => (
          <LeaderboardsItem key={leaderboard.user.id}
            {...leaderboard.user}
            score = {leaderboard.score}
          />
        ))
      }
    </div>
  );
}

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.shape({
          id: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
        score: PropTypes.number.isRequired,
      }),
  ).isRequired,
};


export default LeaderboardsList;
