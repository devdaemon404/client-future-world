import React, { Fragment, useState } from 'react';

import axios from 'axios';
import { Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import {
  Center,
  LoginHead,
  Heading,
  SubHeading,
  // FormBottom,
  BottomLinks,
} from './loginpage.styles';
import LOGO from '../../assets/img/logo.png';

const LoginPage = () => {
  const history = useHistory();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  // const [success, setSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const onFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setError(false);
    try {
      var loginResult = await axios.post('/api/auth/login', {
        password,
        email,
      });

      if (loginResult.data.success) {
        console.log('done');
        setIsLoading(false);
        setError(false);
        if (loginResult.data.role === 'admin') {
          history.push('/admin');
        } else {
          history.push('/');
        }
      }
    } catch (err) {
      setIsLoading(false);
      setError(true);
    }
  };
  return (
    <Fragment>
      <LoginHead>
        <img alt='logo' src={LOGO} />
      </LoginHead>
      <Heading> Sign in to your dashboard</Heading>
      <SubHeading>Enter your email address and password to continue</SubHeading>

      <Center>
        <Form.Group>
          <form>
            <Form.Control
              onChange={(e) => {
                setemail(e.target.value);
              }}
              name='User'
              size='lg'
              type='email'
              required
              placeholder='Email Id'
            />
            <br />
            <Form.Control
              size='lg'
              type='password'
              placeholder='Password'
              required
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <br />
            <button type='submit' onClick={onFormSubmit}>
              {isLoading ? 'Logging you in ... ' : 'sign in'}
            </button>
            <p
              id='inv'
              style={{
                color: 'red',
                width: 400,
                textAlign: 'Center',
                fontWeight: 500,
              }}
            >
              {error ? 'Invalid Credentials' : ''}
            </p>
          </form>

          {/* <FormBottom>
            <p>
              Click here for{' '}
              <strong>
                <Link to='#!' className='empLogin'>
                  Employee Login
                </Link>
              </strong>
            </p>
            <Link to='#!' className='forgot'>
              {' '}
              Forgot Password?
            </Link>
          </FormBottom> */}
        </Form.Group>

        <BottomLinks>
          <Link to='#!' className='BtmLink'>
            Privacy & Terms
          </Link>
          <Link to='#!' className='BtmLink'>
            Legal
          </Link>
          <Link to='#!' className='BtmLink'>
            Contact Us
          </Link>
        </BottomLinks>
      </Center>
    </Fragment>
  );
};

export default LoginPage;
