import api from '../../utils/api';
import {hideLoading, showLoading} from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  UP_VOTE_THREADS: 'UP_VOTE_THREADS',
  DOWN_VOTE_THREADS: 'DOWN_VOTE_THREADS',
  CREATE_THREAD: 'CREATE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function upVoteThreadsActionCreator({threadId, userId}) {
  return {
    type: ActionType.UP_VOTE_THREADS,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadsActionCreator({threadId, userId}) {
  return {
    type: ActionType.DOWN_VOTE_THREADS,
    payload: {
      threadId,
      userId,
    },
  };
}

function createThreadActionCreator(thread) {
  return {
    type: ActionType.CREATE_THREAD,
    payload: {
      thread,
    },
  };
}

function asyncCreateThread(thread) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const createdThread = await api.createThread(thread);
      dispatch(createThreadActionCreator(createdThread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteThreads(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const {threads, authUser} = getState();
    dispatch(upVoteThreadsActionCreator({threadId, userId: authUser.id}));

    try {
      threads.forEach(async (thread) => {
        if (thread.id === threadId) {
          if (thread.upVotesBy.includes(authUser.id)) {
            await api.neutralizeThreadVote(threadId);
          } else {
            await api.upVoteThread(threadId);
          }
        }
      });
    } catch (error) {
      alert(error.message);
      dispatch(upVoteThreadsActionCreator({threadId, userId: authUser.id}));
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteThreads(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const {threads, authUser} = getState();
    dispatch(downVoteThreadsActionCreator({threadId, userId: authUser.id}));

    try {
      threads.forEach(async (thread) => {
        if (thread.id === threadId) {
          if (thread.downVotesBy.includes(authUser.id)) {
            await api.neutralizeThreadVote(threadId);
          } else {
            await api.downVoteThread(threadId);
          }
        }
      });
    } catch (error) {
      alert(error.message);
      dispatch(downVoteThreadsActionCreator({threadId, userId: authUser.id}));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  createThreadActionCreator,
  receiveThreadsActionCreator,
  upVoteThreadsActionCreator,
  downVoteThreadsActionCreator,
  asyncUpVoteThreads,
  asyncDownVoteThreads,
  asyncCreateThread,
};
