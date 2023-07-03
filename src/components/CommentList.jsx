import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import {ownerShape} from './ThreadDetail';

function CommentList({comments, authUser, upVote, downVote}) {
  return (
    <div className='thread-comment__list'>
      <h3>Komenter ({comments.length})</h3>
      <div className='comments-list'>
        {
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              {...comment}
              authUser={authUser}
              upVote={upVote}
              downVote={downVote}
            />
          ))
        }
      </div>
    </div>
  );
}

const commentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
  authUser: PropTypes.object,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default CommentList;
