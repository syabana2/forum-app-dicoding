import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, {threadItemShape} from './ThreadItem';

function ThreadList({threads, upVote, downVote}) {
  return (
    <div className='threads-list'>
      {
        threads.map((thread) => (
          <ThreadItem key={thread.id}
            {...thread}
            upVote={upVote}
            downVote={downVote}
          />
        ))
      }
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default ThreadList;
