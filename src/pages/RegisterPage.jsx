import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import {asyncRegisterUserAndThenLogin} from '../states/shared/action';

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
      <h2>Register Page</h2>
      <RegisterInput register={onRegisterHandler} />
    </section>
  );
}

export default RegisterPage;
