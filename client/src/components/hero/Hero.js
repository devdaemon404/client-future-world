import React from 'react';
import { HeroContainer, MainHeader, MainPara} from './hero.styles';
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
          <div class='col-lg-7 order-1 order-lg-2'>
            <div class='d-flex flex-column p-2'>
              <div class='m-2'>
                <div class='d-flex flex-row justify-content-around mb-2'>
                  <div class='m-1'>
                    <Link className='link' 
                                      to={{
                                        pathname: '/personal',
                                        state: {
                                        
                                        },
                                      }}
>
                      <Card
                        title='Personal Information'
                        subTitle='2/4 Sections Completed'
                        iconClass='fas fa-address-card fa-2x'
                        percentage='50'
                      ></Card>
                    </Link>
                  </div>
                  <div className='m-1'>
                    <Card
                      title='Academic Information'
                      subTitle='3/4 Sections Completed'
                      iconClass='fas fa-user-graduate fa-2x'
                      percentage='75'
                    ></Card>
                  </div>
                </div>
              </div>
              <div className='m-2'>
                <div className='d-flex flex-row justify-content-around'>
                  <div className='m-1'>
                    <Card
                      title='Professional Experience'
                      subTitle='1/4 Sections Completed'
                      iconClass='fas fa-briefcase fa-2x'
                      percentage='25'
                    ></Card>
                  </div>
                  <div className='m-1'>
                    <Card
                      title='Health Information'
                      subTitle='4/4 Sections Completed'
                      iconClass='fas fa-briefcase-medical fa-2x'
                      percentage='100'
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
