import React from 'react';
import PropTypes from 'prop-types';
import {BiSolidLike, BiLike, BiSolidDislike, BiDislike} from 'react-icons/bi';
import {alertNeedLogin, postedAt} from '../utils';
import {ownerShape} from './ThreadDetail';

function CommentItem({
  id, content, createdAt,
  owner, upVotesBy, downVotesBy,
  upVote, downVote, authUser,
}) {
  let userId = '';
  if (authUser !== null) {
    userId = authUser.id;
  }
  const isUpVoted = upVotesBy.includes(userId);
  const isDownVoted = downVotesBy.includes(userId);

  const onUpVoteHandler = (event) => {
    event.stopPropagation();
    upVote(id);
  };

  const onDownVoteHandler = (event) => {
    event.stopPropagation();
    downVote(id);
  };

  return (
    <div className='comment-item'>
      <header className='comment-item__header'>
        <div className='comment-item__owner-info'>
          <img src={`${owner.avatar}`} alt={owner.name} />
          <p>{owner.name}</p>
        </div>
        <p>{postedAt(createdAt)}</p>
      </header>
      <p dangerouslySetInnerHTML={{__html: content}} />
      <footer>
        <button
          type='button'
          className='thread-upvote__button'
          onClick={userId === '' ? alertNeedLogin : onUpVoteHandler}
        >
          {isUpVoted ? <BiSolidLike /> : <BiLike /> }
          <span className='thread-upvote__label'>{upVotesBy.length}</span>
        </button>
        <button
          type='button'
          className='thread-downvote__button'
          onClick={userId === '' ? alertNeedLogin : onDownVoteHandler}
        >
          {isDownVoted ? <BiSolidDislike /> : <BiDislike /> }
          <span className='thread-downvote__label'>{downVotesBy.length}</span>
        </button>
      </footer>
    </div>
  );
}

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
};

CommentItem.propTypes = {
  ...commentItemShape,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
};

CommentItem.defaultProps = {
  upVote: null,
  downVote: null,
};

export {commentItemShape};

export default CommentItem;
