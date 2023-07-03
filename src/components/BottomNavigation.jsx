import React from 'react';
import PropTypes from 'prop-types';
import {
  AiOutlineComment,
  AiOutlineBarChart,
  AiOutlineLogin,
  AiOutlineLogout,
} from 'react-icons/ai';

function BottomNavigation({authUser, signOut, redirectTo}) {
  return (
    <div className='navigation-bottom'>
      <nav>
        <button
          type='button'
          className='navigation-item'
          onClick={() => redirectTo('/')}
        >
          <div className='navigation-item__icon'><AiOutlineComment /></div>
          <p className='navigation-item__label'>Threads</p>
        </button>

        <button
          type='button'
          className='navigation-item'
          onClick={() => redirectTo('/leaderboards')}
        >
          <div className='navigation-item__icon'><AiOutlineBarChart /></div>
          <p className='navigation-item__label'>Leaderboards</p>
        </button>

        {
          authUser === null ? (
          <button
            type='button'
            className='navigation-item'
            onClick={() => redirectTo('/login')}
          >
            <div className='navigation-item__icon'><AiOutlineLogin /></div>
            <p className='navigation-item__label'>Login</p>
          </button>
          ) : (
            <button
              type='button'
              className='navigation-item'
              onClick={() => signOut()}
            >
              <div className='navigation-item__icon'><AiOutlineLogout /></div>
              <p className='navigation-item__label'>Logout</p>
            </button>
          )
        }
      </nav>
    </div>
  );
}

BottomNavigation.propTypes = {
  redirectTo: PropTypes.func.isRequired,
  authUser: PropTypes.object,
  signOut: PropTypes.func.isRequired,
};

export default BottomNavigation;
