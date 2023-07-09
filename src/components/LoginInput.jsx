import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

function LoginInput({login}) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [show, , setShow] = useInput(false);
  const handleClick = () => setShow(!show);

  return (
    <form className="login-input">
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            placeholder="Enter email"
            value={email}
            onChange={onEmailChange}
          />
        </InputGroup>
      </FormControl>

      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={onPasswordChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button type="button" onClick={() => login({email, password})}>
        Login
      </Button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
