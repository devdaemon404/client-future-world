import React, { useState } from 'react';

import axios from 'axios';

import { Link, useHistory } from 'react-router-dom';
import {
  MainLogin,
  MainSlide,
  MainContainer,
  Footer,
} from './LoginPage2.styles';
import LOGO from '../../assets/img/logo.png';
import { toast } from '../../util/ToastUtil';

export const LoginPage2 = () => {
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
        setIsLoading(false);
        setError(false);
        if (
          loginResult.data.role === 'admin' ||
          loginResult.data.role === 'sub-admin'
        ) {
          history.push('/admin');
        } else {
          history.push('/');
        }
      }
    } catch (err) {
      setIsLoading(false);
      setError(true);
      toast('Error While Logging');
    }
  };

  return (
    <React.Fragment>
      <MainContainer>
        <div>
          <MainLogin>
            <div className='Logo'>
              <img src={LOGO} alt='iem2' style={{ margin: '20px 40px' }} />
            </div>
            <div className='loginForm'>
              <div style={{ height: 150 }}></div>
              <form onSubmit={onFormSubmit}>
                <h6>Login ID</h6>

                <div className='form-group'>
                  <input
                    type='email'
                    className='lg'
                    id='exampleInputEmail1'
                    aria-describedby='emailHelp'
                    placeholder='Enter Your Email'
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    style={{
                      background: 'none',
                      borderRadius: 0,
                      borderBottom: '1px solid rgba(0,0,0,.3)',
                      width: '350px',
                    }}
                  />
                </div>
                <h6>Password</h6>

                <div className='form-group'>
                  <input
                    type='password'
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    className=' lg'
                    id='exampleInputPassword1'
                    placeholder='Enter Your Password'
                    style={{
                      background: 'none',

                      borderRadius: 0,
                      borderBottom: '1px solid rgba(0,0,0,.3)',
                      width: '350px',
                    }}
                  />
                </div>
                <div className='form-grou'>
                  <button
                    type='submit'
                    className='btn'
                    style={{
                      width: '190px',
                      margin: '10px 13% ',
                      background: '#3f47cc',
                      color: 'white',
                    }}>
                    {isLoading ? 'Logging you in ... ' : 'Sign In'}
                  </button>
                  <br />
                </div>
                <div className='form-group'>
                  <p style={{ color: 'red', fontWeight: 700 }}>
                    {error ? 'Invalid Credentials' : ''}
                  </p>
                </div>
              </form>
            </div>
          </MainLogin>
        </div>
        <MainSlide>
          <div className='image'>
            {' '}
            <img
              src='/smart-min.png'
              alt={'bgsy'}
              style={{
                width: 800,

                objectFit: 'fill',
              }}
            />
          </div>
          {/* <h2 className='Head'> Helping businesses around the world succeed</h2> */}
        </MainSlide>
        <Footer>
          <div className='footer-up'></div>
          <div className='footer-down'>
            <a
              className='Link'
              href='http://www.futureworldconsultancy.com/contact.html'
              target='_blank'>
              Contact Us
            </a>
            {'   '}|
            <a
              className='Link'
              href='http://www.futureworldconsultancy.com/'
              target='_blank'>
              Terms of service
            </a>
            {'   '}|
            <a
              className='Link'
              href='http://www.futureworldconsultancy.com/'
              target='_blank'>
              Privacy policy
            </a>
          </div>
        </Footer>
      </MainContainer>
    </React.Fragment>
  );
};
export default LoginPage2;
