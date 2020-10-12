import React from 'react';
import { HeroContainer, MainHeader, MainPara} from './hero.style';
import Card from '../card/Card';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <HeroContainer className='box d-flex align-items-center'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-5 order-1 order-lg-1 d-flex flex-column justify-content-start mt-5'>
            <MainHeader>My Application</MainHeader>
            <MainPara>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </MainPara>
          </div>
          <hr></hr>
          <hr></hr>
          <div className='col-lg-7 order-1 order-lg-2'>
            <div className='d-flex flex-column p-2'>
              <div className='m-2'>
                <div className='d-flex flex-row justify-content-around mb-2'>
                  <div className='m-1'>
                    <Link to='/personal' className='link'>
                      <Card
                        title='Personal Information'
                        subTitle='5/10 Sections Completed'
                        iconClass='fas fa-address-card'
                      ></Card>
                    </Link>
                  </div>
                  <div className='m-1'>
                    <Card
                      title='Academic Information'
                      subTitle='5/10 Sections Completed'
                      iconClass='fas fa-address-card'
                    ></Card>
                  </div>
                </div>
              </div>
              <div className='m-2'>
                <div className='d-flex flex-row justify-content-around'>
                  <div className='m-1'>
                    <Card
                      title='Professional Experience'
                      subTitle='5/10 Sections Completed'
                      iconClass='fas fa-address-card'
                    ></Card>
                  </div>
                  <div className='m-1'>
                    <Card
                      title='Health Information'
                      subTitle='5/10 Sections Completed'
                      iconClass='fas fa-address-card'
                    ></Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroContainer>
  );
}

export default Hero;
