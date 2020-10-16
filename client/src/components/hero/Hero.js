import React from 'react';
import { HeroContainer, MainHeader, MainPara } from './hero.styles';
import Card from '../card/Card';
import { Link } from 'react-router-dom';

function Hero(...props) {
  return (
    <HeroContainer className='box d-flex align-items-center'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-5 order-1 order-lg-1 d-flex flex-column justify-content-start'>
            <MainHeader>My Application</MainHeader>
            <MainPara>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </MainPara>
          </div>
          <hr></hr>
          <hr></hr>
          <div className='col-lg-7 order-1 order-lg-2'>
            <div className='d-flex flex-column'>
              <div className='hero-row d-flex flex-row justify-content-around'>
                <Link className='link' to={{ pathname: '/personal' }}>
                  <Card
                    title='Personal Information'
                    subTitle='2/4 Sections Completed'
                    iconClass='fas fa-address-card fa-2x'
                    percentage='50'
                  ></Card>
                </Link>
                <Link className='link' to={{ pathname: '/work' }}>
                  <Card
                    title='Academic Information'
                    subTitle='3/4 Sections Completed'
                    iconClass='fas fa-user-graduate fa-2x'
                    percentage='75'
                  ></Card>
                </Link>
              </div>
              <div className='hero-row d-flex flex-row justify-content-around '>
                <Link className='link' to={{ pathname: '/health' }}>
                  <Card
                    title='Health & Family Information'
                    subTitle='4/4 Sections Completed'
                    iconClass='fas fa-briefcase-medical fa-2x'
                    percentage='10'
                  ></Card>
                </Link>
                <Link className='link' to={{ pathname: '/other' }}>
                  <Card
                    title='Other Information'
                    subTitle='4/4 Sections Completed'
                    iconClass='fas fa-clipboard fa-2x'
                    percentage='100'
                  ></Card>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroContainer>
  );
}

export default Hero;
