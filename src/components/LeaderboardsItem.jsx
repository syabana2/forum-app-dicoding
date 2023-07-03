import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardsItem({avatar, name, score}) {
  return (
    <div className='leaderboard-item'>
      <div className='leaderboard-item__user-info'>
        <img src={avatar} alt={name} />
        <p>{name}</p>
      </div>
      <p className='leaderboard-item__score'>{score}</p>
    </div>
  );
}

LeaderboardsItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardsItem;
