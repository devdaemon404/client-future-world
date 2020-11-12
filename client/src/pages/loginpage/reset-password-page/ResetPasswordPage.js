import React, { Fragment } from 'react';
import logo from '../../../assets/img/logo.png';

const ResetPasswordPage = () => {
  return (
    <Fragment>
      <div
        style={{ paddingTop: '100px', background: '#3F47CC', height: '100vh' }}>
        <div class='container text-center'>
          <div class='row'>
            <div class='col-md-4 col-md-offset-4'></div>
            <div class='col-md-4 col-md-offset-4 shadow p-3 mb-5 bg-white rounded p-5'>
              <div class='panel panel-default '>
                <div class='panel-body'>
                  <div class='text-center'>
                    <h3>
                      <img
                        src={logo}
                        alt='Future-World'
                        className='img-fluid'
                        width='120px'
                      />
                    </h3>
                    <h2 class='text-center'>Forgot Password?</h2>
                    <div class='panel-body'>
                      <form
                        id='register-form'
                        role='form'
                        autocomplete='off'
                        class='form'
                        method='post'>
                        <div class='form-group'>
                          <div class='input-group'>
                            <span class='input-group-addon'>
                              <i class='glyphicon glyphicon-envelope color-blue'></i>
                            </span>
                            <input
                              id='oldPassword'
                              name='oldPassword'
                              placeholder='Old Password'
                              class='form-control'
                              type='password'
                            />
                          </div>
                        </div>
                        <div class='form-group'>
                          <div class='input-group'>
                            <span class='input-group-addon'>
                              <i class='glyphicon glyphicon-envelope color-blue'></i>
                            </span>
                            <input
                              id='newPassword'
                              name='newPassword'
                              placeholder='New Password'
                              class='form-control'
                              type='password'
                            />
                          </div>
                        </div>
                        <div class='form-group'>
                          <div class='input-group'>
                            <span class='input-group-addon'>
                              <i class='glyphicon glyphicon-envelope color-blue'></i>
                            </span>
                            <input
                              id='newPassword'
                              name='newPassword'
                              placeholder='Confirm New Password'
                              class='form-control'
                              type='password'
                            />
                          </div>
                        </div>
                        <div class='form-group'>
                          <input
                            name='recover-submit'
                            class='btn btn-lg btn-primary btn-block'
                            value='Reset Password'
                            type='submit'
                            style={{
                              background:
                                'rgb(63, 71, 204) none repeat scroll 0% 0%',
                            }}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='col-md-4 col-md-offset-4'></div>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPasswordPage;
