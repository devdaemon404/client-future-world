import React from 'react';
import Progressbar from '../progress-bar/Progress';

const FormPageComponent = ({ children }) => {
  return (
    <>
      <div className='container'>
        
        <div className='order-1 order-lg-2 d-flex flex-column right justify-content-start mt-5'>
          {children}
        </div>
      </div>
    </>
  );
};

export default FormPageComponent;
