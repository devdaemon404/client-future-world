import React, { Fragment } from 'react';
import { LoginContainer, Center, LoginHeader } from './loginpage.styles';
import Header from '../../components/header/Header';

const loginpage = () => {
  return (
    <Fragment>
      <Header />
      <LoginContainer>
        <Center>
          <LoginHeader>Login</LoginHeader>
          <form className='text-center mt-4'>
            <div class="form-group form-input">
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div class="form-group form-input">
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" class="btn button btn-primary btn-light w-50">login</button>
          </form>
        </Center>
      </LoginContainer>
    </Fragment>
  )
}

export default loginpage;

