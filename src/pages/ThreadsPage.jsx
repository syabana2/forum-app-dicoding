import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {asyncPopulateUsersAndThreads} from '../states/shared/action';
import {useNavigate} from 'react-router-dom';
import {BiSolidPlusCircle} from 'react-icons/bi';
import {asyncUpVoteThreads, asyncDownVoteThreads} from '../states/threads/action';
import CategoriesList from '../components/CategoriesList';
import ThreadList from '../components/ThreadList';
import Loading from '../components/Loading';
import {Heading} from '@chakra-ui/react';

function ThreadsPage() {
  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);
  const authUser = useSelector((states) => states.authUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpVoteHandler = (threadId) => {
    dispatch(asyncUpVoteThreads(threadId));
  };

  const onDownVoteHandler = (threadId) => {
    dispatch(asyncDownVoteThreads(threadId));
  };

  const onClickNewThreadHandler = () => {
    navigate('/new');
  };

  const categories = threads
      .map((thread) => `#${thread.category}`)
      .filter((item, index, arr) => arr.indexOf(item) === index);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser === null ? authUser : authUser.id,
  }));

  if (threads.length === 0) {
    return (
      <section className='home-page'>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <>
      <Loading />
      <section className='home-page'>
        <header>
          <Heading as='h5' size='sm'>Kategori popular</Heading>
          <CategoriesList categories={categories} />
        </header>
        <div className='home-page__content'>
          <Heading as='h2' size='lg'>Diskusi tersedia</Heading>
          <ThreadList
            threads={threadList}
            upVote={onUpVoteHandler}
            downVote={onDownVoteHandler}
          />
        </div>
        { authUser !== null ? (
          <button
            type='button'
            className='new-thread-button'
            onClick={onClickNewThreadHandler}
          >
            <BiSolidPlusCircle />
          </button>
        ) : null }
      </section>
    </>
  );
}

export default ThreadsPage;
