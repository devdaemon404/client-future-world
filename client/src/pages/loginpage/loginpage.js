import React, { Fragment, useState } from 'react';
import {
  Center,
  LoginHead,
  Heading,
  SubHeading,
  FormBottom,
  BottomLinks,
} from './loginpage.styles';
import LOGO from '../../assets/img/logo.png';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const history = useHistory();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  // const [success, setSuccess] = useState(true);
  const [isLoading, setisLoading] = useState(false);

  const onFormSubmit = async (e) => {
    setisLoading(true);
    e.preventDefault();
    document.querySelector('#inv').style.display = 'none';
    try {
      var loginResult = await axios.post('/api/auth/login', {
        password,
        email,
      });

      if (loginResult.data.success) {
        console.log('done');
        history.push('/admin');
        setisLoading(false);
      }
    } catch (err) {
      setisLoading(false);
      document.querySelector('#inv').style.display = 'block';
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
                display: 'none',
              }}
            >
              Invalid Credentials
            </p>
          </form>

          <FormBottom>
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
          </FormBottom>
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
