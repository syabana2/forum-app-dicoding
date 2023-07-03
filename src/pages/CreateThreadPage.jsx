import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {asyncCreateThread} from '../states/threads/action';
import ThreadInput from '../components/ThreadInput';
import {asyncPopulateUsersAndThreads} from '../states/shared/action';

function CreateThreadPage() {
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onCreateThreadHandler = ({body, category, title}) => {
    dispatch(asyncCreateThread({body, category, title}));
    navigate('/');
  };

  return (
    <ThreadInput createThread={onCreateThreadHandler} authUser={authUser} />
  );
}

export default CreateThreadPage;
