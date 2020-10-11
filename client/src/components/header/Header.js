import React from 'react';
import { HeaderContainer } from './header.styles';


function Header() {
  return (
    <HeaderContainer>
      <div>
        <nav class='navbar navbar-expand-lg'>
          <a class='navbar-brand ml-5' href='/home'>
            <img src='../../assets/img/logo.png' alt='' className='img-fluid' />
            Future World.
          </a>
          <button
            class='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
            
          >
            <span class='navbar-toggler-icon'><i class="fas fa-bars"></i></span>
          </button>
          <div
            class='flex justify-content-xl-end justify-content-lg-end justify-content-md-center   mr-5 collapse navbar-collapse'
            id='navbarNav'
          >
            <ul class='navbar-nav'>
              <li class='nav-item active mr-3'>
                <a class='nav-link' href='/home'>
                  My Profile <span class='sr-only'>(current)</span>
                </a>
              </li>
              <li class='nav-item mr-3'>
                <a class='nav-link' href='/login'>
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
