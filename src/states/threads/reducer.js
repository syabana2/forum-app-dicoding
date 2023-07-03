import {ActionType} from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.CREATE_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.UP_VOTE_THREADS:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId) ?
              thread.upVotesBy.filter((userId) => userId!== action.payload.userId) :
              thread.upVotesBy.concat([action.payload.userId]),
            downVotesBy: thread.downVotesBy.includes(action.payload.userId) ?
              thread.downVotesBy.filter((userId) => userId !== action.payload.userId) :
              thread.downVotesBy,
          };
        }

        return thread;
      });
    case ActionType.DOWN_VOTE_THREADS:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            downVotesBy: thread.downVotesBy.includes(action.payload.userId) ?
              thread.downVotesBy.filter((userId) => userId!== action.payload.userId) :
              thread.downVotesBy.concat([action.payload.userId]),
            upVotesBy: thread.upVotesBy.includes(action.payload.userId) ?
              thread.upVotesBy.filter((userId) => userId !== action.payload.userId) :
              thread.upVotesBy,
          };
        }

        return thread;
      });
    default:
      return threads;
  }
}

export default threadsReducer;
