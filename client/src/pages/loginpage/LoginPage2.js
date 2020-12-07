import React, { useState, useContext, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { Modal } from 'antd';
import bcrypt from 'bcryptjs';
import { Link, useHistory } from 'react-router-dom';
import './loginStyle.css';
import {
  HOLDER,
  MainLogin,
  MainSlide,
  MainContainer,
  Footer,
} from './LoginPage2.styles';
import LOGO from '../../assets/img/FWC - High Res - Wide - Transparent.png';
import { toast } from '../../util/ToastUtil';
import UserContext from '../../context/userContext';

export const LoginPage2 = () => {
  const history = useHistory();
  const { setLoginState } = useContext(UserContext);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  // const [success, setSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const onFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setError(false);

    try {
      let pass = jwt.sign(password, process.env.REACT_APP_PASSWORD_SECRET);

      let loginResult = await axios.post('/api/auth/login', {
        password: pass,
        email,
      });

      if (loginResult.data.success) {
        setIsLoading(false);
        setError(false);
        setLoginState(true);
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
      setLoginState(false);
      setError(true);
      toast('Invalid Credentials');
    }
  };

  return (
    <HOLDER>
      {/* <MainContainer>
        <div>
          <MainLogin>
            <div className='Logo'>
              <img
                src={LOGO}
                alt='iem2'
                height='75vh'
                style={{ margin: '20px 40px' }}
              />
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

                <Link to='#!' class='form-text form-group' onClick={showModal}>
                  Forgot Password?
                </Link>
                <Modal
                  title='Forgot password?'
                  visible={visible}
                  onOk={handleOk}
                  onCancel={handleCancel}>
                  Please contact your admin to reset your password. <br />
                  You will receive an E-mail with with a temporary password.
                </Modal>

                <div className='form-group'>
                  <button type='submit' className='btn btn-md'>
                    {isLoading ? 'Logging you in ... ' : 'Sign In'}
                  </button>
                  <br />
                </div>

              </form>
            </div>
          </MainLogin>
        </div>
        <MainSlide>
          <div className='image'>
            {' '}
            <img className='imageMain' src='/smart-min.png' alt={'bgsy'} />
          </div>
        </MainSlide>
      </MainContainer>
      <div style={{ height: '1vh' }} />
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
      </Footer> */}

      <body className='background-here-login'>
        <nav>
          <div className='heading'>
            <h4>CloudsBuzz</h4>
          </div>
        </nav>
        <main>
          <div className='card'>
            <div className='card-left'>
              <h3>Welcome to</h3>
              <h2 className='cb gutterBottom'>CloudsBuzz</h2>
              <p className='small-text'>
                A technology company (tech company) is a type of business entity
                that focuses mainly on the development and manufacturing of
                technology products or providing technology as a service
              </p>
              <div className='icon-text'>
                <i className='material-icons'>library_books</i>
                <span className='small-text'>Resources</span>
                <i className='material-icons'>support</i>
                <span className='small-text'>Support</span>
              </div>
            </div>
            <div className='card-right'>
              <form action='' className='form' onSubmit={onFormSubmit}>
                <div className='input-icons'>
                  <label className='input-label' for='username'>
                    Username
                  </label>
                  <br />
                  <i className='material-icons icon'>person</i>
                  <input
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    className='input-field'
                    type='text'
                    placeholder='Enter Your Email'
                  />
                </div>
                <div className='input-icons'>
                  <label className='input-label' for='password'>
                    Password
                  </label>
                  <br />
                  <i className='material-icons icon'>lock</i>
                  <input
                    className='input-field'
                    placeholder='Enter Your Password'
                    type='password'
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  />
                </div>
                <input
                  className='btn-primary gutterBottom'
                  type='submit'
                  value='SIGN IN'
                />
                <a className='link gutterBottom'>Need assistance with Login?</a>
                <a className='link'>Contact Us</a>
              </form>
            </div>
          </div>
        </main>
      </body>
    </HOLDER>
  );
};
export default LoginPage2;
