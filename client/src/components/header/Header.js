import React from 'react';
import { HeaderContainer } from './header.styles';

function Header({pathname}) {
  return (
    <HeaderContainer>
      <div>
        <nav className='navbar navbar-expand-lg'>
          <a className='navbar-brand ml-5' href='/'>
            <img src='http://www.futureworldconsultancy.com/images/logo2.png' alt='' className='img-fluid' height='30px' width='80px' />
     
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'

          >
            <span className='navbar-toggler-icon'><i className="fas fa-bars"></i></span>
          </button>
          <div
            className='flex justify-content-xl-end justify-content-lg-end justify-content-md-center   mr-5 collapse navbar-collapse'
            id='navbarNav'
          >
            <ul className='navbar-nav'>
              <li className='nav-item active mr-3'>
                <a className='nav-link' href={pathname}>
                  My Application <span className='sr-only'>(current)</span>
                </a>
              </li>
              <li className='nav-item mr-3'>
                <a className='nav-link' href='/login'>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </HeaderContainer>
  );
}

export default Header;
