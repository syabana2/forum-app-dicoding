import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate, Link as ReachLink} from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import {asyncSetAuthUser} from '../states/authUser/action';
import {Heading, Link} from '@chakra-ui/react';

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
      <Heading as='h2' size='lg'>Login</Heading>
      <LoginInput login={onLogin} />
      <p className='register-info'>
        Belum punya akun? <Link as={ReachLink} to='/register' color='teal.500'>Daftar di sini.</Link>
      </p>
    </section>
  );
}

export default LoginPage;
