import React from 'react';
import PropTypes from 'prop-types';
import {BiSolidLike, BiLike, BiSolidDislike, BiDislike} from 'react-icons/bi';
import {alertNeedLogin, postedAt} from '../utils';

function ThreadDetail({
  id, title, body, createdAt,
  owner, upVotesBy, downVotesBy,
  upVote, downVote, authUser,
}) {
  let userId = '';
  if (authUser !== null) {
    userId = authUser.id;
  }
  const isUpVote = upVotesBy.includes(userId);
  const isDownVote = downVotesBy.includes(userId);

  const onUpVote = (event) => {
    event.stopPropagation();
    upVote(id);
  };

  const onDownVote = (event) => {
    event.stopPropagation();
    downVote(id);
  };

  return (
    <>
      <div className='thread-content'>
        <h2>{title}</h2>
        <div className='thread-content__body' dangerouslySetInnerHTML={{__html: body}} />
      </div>
      <footer className='thread-footer'>
        <button
          type='button'
          className='thread-upvote__button'
          onClick={userId === '' ? alertNeedLogin : onUpVote}
        >
          {isUpVote ? <BiSolidLike /> : <BiLike /> }
          <span className='thread-upvote__label'>{upVotesBy.length}</span>
        </button>
        <button
          type='button'
          className='thread-downvote__button'
          onClick={userId === '' ? alertNeedLogin : onDownVote}
        >
          {isDownVote ? <BiSolidDislike /> : <BiDislike /> }
          <span className='thread-downvote__label'>{downVotesBy.length}</span>
        </button>
        <div className='owner-info'>
          <span>Dibuat Oleh</span>
          <img src={`${owner.avatar}`} alt="avatar" />
          <span>{owner.name}</span>
        </div>
        <p>{postedAt(createdAt)}</p>
      </footer>
    </>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  authUser: PropTypes.object,
};

export {ownerShape};

export default ThreadDetail;
