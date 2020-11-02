import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export const PopUp = ({ Funct, state, setState }) => {
  const [role, setRole] = useState('');

  const findRole = async () => {
    const res = await axios.get('/api/auth/validate-token').then();
    setRole(res.data.role);
  };
  useEffect(() => {
    findRole();
  }, []);

  return (
    <>
      <div>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 100,
            backgroundColor: 'rgba(0,0,0,0.8)',
            width: '100vw',
            height: '100vh',
          }}
        ></div>
        <div
          style={{
            display: 'block',
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            zIndex: 1031,
          }}
        >
          <div
            className='col'
            style={{
              marginTop: '50vh',
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span
              className='row text-center'
              style={{
                marginLeft: '5px',
                fontSize: '24px',
                color: '#f8f8f8',
              }}
            >
              <div style={{ width: '100vw' }}>
                Are you sure you want to delete the employee
              </div>
              <div className='col'>
                {' '}
                {role === 'admin' ? (
                  <>
                    <Button
                      onClick={(e) => {
                        Funct();
                        setState(false);
                      }}
                    >
                      YES
                    </Button>
                    <Button
                      variant='danger'
                      style={{ marginLeft: 40 }}
                      onClick={(e) => setState(false)}
                    >
                      No
                    </Button>
                  </>
                ) : (
                  <p>Sorry delete privilages are not granted to you</p>
                )}
              </div>{' '}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
