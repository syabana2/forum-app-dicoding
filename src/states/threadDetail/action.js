import api from '../../utils/api';
import {hideLoading, showLoading} from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  ADD_COMMENT_THREAD_DETAIL: 'ADD_COMMENT_THREAD_DETAIL',
  UP_VOTE_COMMENT_THREAD_DETAIL: 'UP_VOTE_COMMENT_THREAD_DETAIL',
  DOWN_VOTE_COMMENT_THREAD_DETAIL: 'DOWN_VOTE_COMMENT_THREAD_DETAIL',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function upVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function downVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function addCommentThreadDetailActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT_THREAD_DETAIL,
    payload: {
      comment,
    },
  };
}

function upVoteCommentThreadDetailActionCreator({userId, commentId}) {
  return {
    type: ActionType.UP_VOTE_COMMENT_THREAD_DETAIL,
    payload: {
      userId,
      commentId,
    },
  };
}

function downVoteCommentThreadDetailActionCreator({userId, commentId}) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT_THREAD_DETAIL,
    payload: {
      userId,
      commentId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const {authUser, threadDetail} = getState();
    dispatch(upVoteThreadDetailActionCreator(authUser.id));

    try {
      if (threadDetail.upVotesBy.includes(authUser.id)) {
        await api.neutralizeThreadVote(threadDetail.id);
      } else {
        await api.upVoteThread(threadDetail.id);
      }
    } catch (error) {
      alert(error.message);
      dispatch(upVoteThreadDetailActionCreator(authUser.id));
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const {authUser, threadDetail} = getState();
    dispatch(downVoteThreadDetailActionCreator(authUser.id));

    try {
      if (threadDetail.downVotesBy.includes(authUser.id)) {
        await api.neutralizeThreadVote(threadDetail.id);
      } else {
        await api.downVoteThread(threadDetail.id);
      }
    } catch (error) {
      alert(error.message);
      dispatch(downVoteThreadDetailActionCreator(authUser.id));
    }

    dispatch(hideLoading());
  };
}

function asyncAddCommentThreadDetail({threadId, content = ''}) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const createdComment = await api.createComment({threadId, content});
      dispatch(addCommentThreadDetailActionCreator(createdComment));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteCommentThreadDetail(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const {authUser, threadDetail} = getState();
    dispatch(upVoteCommentThreadDetailActionCreator({commentId, userId: authUser.id}));

    try {
      threadDetail.comments.forEach(async (comment) => {
        if (comment.id === commentId) {
          if (threadDetail.upVotesBy.includes(authUser.id)) {
            await api.neutralizeCommentVote(threadDetail.id, commentId);
          } else {
            await api.upVoteComment(threadDetail.id, commentId);
          }
        }
      });
    } catch (error) {
      alert(error.message);
      dispatch(upVoteCommentThreadDetailActionCreator({commentId, userId: authUser.id}));
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteCommentThreadDetail(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const {authUser, threadDetail} = getState();
    dispatch(downVoteCommentThreadDetailActionCreator({commentId, userId: authUser.id}));

    try {
      threadDetail.comments.forEach(async (comment) => {
        if (comment.id === commentId) {
          if (threadDetail.upVotesBy.includes(authUser.id)) {
            await api.neutralizeCommentVote(threadDetail.id, commentId);
          } else {
            await api.downVoteComment(threadDetail.id, commentId);
          }
        }
      });
    } catch (error) {
      alert(error.message);
      dispatch(downVoteCommentThreadDetailActionCreator({commentId, userId: authUser.id}));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  upVoteThreadDetailActionCreator,
  downVoteThreadDetailActionCreator,
  addCommentThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncAddCommentThreadDetail,
  asyncUpVoteCommentThreadDetail,
  asyncDownVoteCommentThreadDetail,
};
