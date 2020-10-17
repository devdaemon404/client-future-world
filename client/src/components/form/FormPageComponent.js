import React from 'react';
import Progressbar from '../progress-bar/Progress';

const FormPageComponent = ({ children }) => {
  return (
    <>
      <div className='row'>
        <div className='col-lg-4 order-1 order-lg-1 d-flex flex-column justify-content-start mt-5'>
          <div
            className=' d-flex justify-content-center '
            style={{ maxWidth: 350, margin: '0 auto' }}
          >
            <Progressbar
              iconClass='fas fa-address-card fa-2x'
              percentage='50'
            />
          </div>
          <p className='text-muted text-center '>
            <em>5/10 sections completed</em>
          </p>
          <div style={{ padding: '0 35px', textAlign: 'center' }}>
            <div>
              <p>
                Enter your contact information in this section. Keep this
                information up-to-date throughout the application process.
              </p>
            </div>
            <div>
              <p>
                You can edit this section after you submit your application.
              </p>
            </div>
            <div>
              <p>
                <span style={{ color: 'red' }}>*</span> Indicates required field
              </p>
            </div>
          </div>
        </div>
        <div className='col-lg-7 order-1 order-lg-2 d-flex flex-column right justify-content-start mt-5'>
          {children}
        </div>
      </div>
    </>
  );
};

export default FormPageComponent;
