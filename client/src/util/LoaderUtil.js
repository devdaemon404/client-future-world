import React from 'react';

export const OPLoader = ({ isLoading }) => {
  if (!isLoading) return <div />;
  if (isLoading)
    return (
      <div>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 100,
            backgroundColor: 'rgba(0,0,0,0.6)',
            width: '100%',
            height: '100%',
          }}
        ></div>
        <div
          style={{
            display: 'block',
            position: 'absolute',
            zIndex: 1031,
            top: '50%',
            left: '50%',
          }}
        >
          <div className='col'>
            <div className='spinner-grow row' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
            <span
              className='row'
              style={{
                marginLeft: -35,
              }}
            >
              Uploading...
            </span>
          </div>
        </div>
      </div>
    );
};