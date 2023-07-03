import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import {asyncSetAuthUser} from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async ({email, password}) => {
    const result = await dispatch(asyncSetAuthUser({email, password}));
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <section className="login-page">
      <h2>Login</h2>
      <LoginInput login={onLogin} />
      <p className='register-info'>
        Belum punya akun? <Link to='/register'>Daftar di sini.</Link>
      </p>
    </section>
  );
}

export default LoginPage;
