import {ActionType} from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.UP_VOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId) ?
          threadDetail.upVotesBy.filter((userId) => userId !== action.payload.userId) :
          threadDetail.upVotesBy.concat(action.payload.userId),
        downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId) ?
          threadDetail.downVotesBy.filter((userId) => userId!== action.payload.userId) :
          threadDetail.downVotesBy,
      };
    case ActionType.DOWN_VOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId) ?
          threadDetail.downVotesBy.filter((userId) => userId !== action.payload.userId) :
          threadDetail.downVotesBy.concat(action.payload.userId),
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId) ?
          threadDetail.upVotesBy.filter((userId) => userId!== action.payload.userId) :
          threadDetail.upVotesBy,
      };
    case ActionType.ADD_COMMENT_THREAD_DETAIL:
      return {
        ...threadDetail,
        comments: [
          action.payload.comment,
          ...threadDetail.comments,
        ],
      };
    case ActionType.UP_VOTE_COMMENT_THREAD_DETAIL:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId) ?
                comment.upVotesBy.filter((userId) => userId !== action.payload.userId) :
                comment.upVotesBy.concat(action.payload.userId),
              downVotesBy: comment.downVotesBy.includes(action.payload.userId) ?
                comment.downVotesBy.filter((userId) => userId !== action.payload.userId) :
                comment.downVotesBy,
            };
          }
          return comment;
        }),
      };
    case ActionType.DOWN_VOTE_COMMENT_THREAD_DETAIL:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.includes(action.payload.userId) ?
                comment.downVotesBy.filter((userId) => userId !== action.payload.userId) :
                comment.downVotesBy.concat(action.payload.userId),
              upVotesBy: comment.upVotesBy.includes(action.payload.userId) ?
                comment.upVotesBy.filter((userId) => userId !== action.payload.userId) :
                comment.upVotesBy,
            };
          }
          return comment;
        }),
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
