import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {
  asyncReceiveThreadDetail,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncUpVoteCommentThreadDetail,
  asyncDownVoteCommentThreadDetail,
  asyncAddCommentThreadDetail,
} from '../states/threadDetail/action';

import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';

function DetailPage() {
  const {id} = useParams();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onUpVoteThreadHandler = () => {
    dispatch(asyncUpVoteThreadDetail(id));
  };

  const onDownVoteThreadHandler = () => {
    dispatch(asyncDownVoteThreadDetail(id));
  };

  const onAddCommentHandler = (content) => {
    dispatch(asyncAddCommentThreadDetail({threadId: id, content}));
  };

  const onUpVoteCommentHandler = (commentId) => {
    dispatch(asyncUpVoteCommentThreadDetail(commentId));
  };

  const onDownVoteCommentHandler = (commentId) => {
    dispatch(asyncDownVoteCommentThreadDetail(commentId));
  };

  if (!threadDetail) {
    return (
      <section className='detail-page'>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className='detail-page'>
      <header className='thread-header'>
        <p className='thread-header__category'>#{threadDetail.category}</p>
      </header>
      <ThreadDetail
        {...threadDetail}
        authUser={authUser}
        upVote={onUpVoteThreadHandler}
        downVote={onDownVoteThreadHandler}
      />
      <div className='thread-comment'>
        <CommentInput addComment={onAddCommentHandler} authUser={authUser} />
        <CommentList
          comments={threadDetail.comments}
          authUser={authUser}
          upVote={onUpVoteCommentHandler}
          downVote={onDownVoteCommentHandler}
        />
      </div>
    </section>
  );
}

export default DetailPage;
