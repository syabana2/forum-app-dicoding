import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {BiSolidLike, BiLike, BiSolidDislike, BiDislike} from 'react-icons/bi';
import {BsReply} from 'react-icons/bs';
import {alertNeedLogin, postedAt} from '../utils';

function ThreadItem({
  id, title, body, category, createdAt,
  user, upVotesBy, downVotesBy, totalComments,
  upVote, downVote, authUser,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const onUpVoteHandler = (event) => {
    event.stopPropagation();
    upVote(id);
  };

  const onDownVoteHandler = (event) => {
    event.stopPropagation();
    downVote(id);
  };

  return (
    <div className='thread-item'>
      <header className='thread-item__header'>
        <span className='thread-item__category'>#{category}</span>
        <h4 className='thread-item__title'>
          <Link to={`/threads/${id}`}>{title}</Link>
        </h4>
      </header>
      <div className='thread-item__body' dangerouslySetInnerHTML={{__html: body}} />
      <footer className='thread-item__footer'>
        <button
          type='button'
          className='thread-upvote__button'
          onClick={authUser === null ? alertNeedLogin : onUpVoteHandler}
        >
          {isUpVoted ? <BiSolidLike /> : <BiLike />}
          <span className='thread-upvote__label'>{upVotesBy.length}</span>
        </button>
        <button
          type='button'
          className='thread-downvote__button'
          onClick={authUser === null ? alertNeedLogin : onDownVoteHandler}
        >
          {isDownVoted ? <BiSolidDislike /> : <BiDislike />}
          <span className='thread-downvote__label'>{downVotesBy.length}</span>
        </button>
        <p className='thread-item__total-comments'>
          <BsReply size={20}/>
          {totalComments}
        </p>
        <p>{postedAt(createdAt)}</p>
        <p className='thread-item__owner'>
          Dibuat Oleh <strong>{user.name}</strong>
        </p>
      </footer>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  totalComments: PropTypes.number.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  authUser: PropTypes.string,
};

ThreadItem.defaultProps = {
  upVote: null,
  downVote: null,
};

export {threadItemShape};

export default ThreadItem;
