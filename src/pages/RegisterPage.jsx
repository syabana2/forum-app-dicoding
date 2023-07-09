import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import {asyncRegisterUserAndThenLogin} from '../states/shared/action';
import {Heading} from '@chakra-ui/react';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegisterHandler = async ({name, email, password}) => {
    const result = await dispatch(asyncRegisterUserAndThenLogin({name, email, password}));
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <section className="register-page">
      <Heading as='h2' size='lg'>Register Page</Heading>
      <RegisterInput register={onRegisterHandler} />
    </section>
  );
}

export default RegisterPage;
