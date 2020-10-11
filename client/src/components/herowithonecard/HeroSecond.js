import React from 'react';
import { HeroSecondContainer, MainHeader, MainPara} from './HeroSecond.style';
import Card from '../card/Card';
import { Link } from 'react-router-dom';

function HeroSecond() {
  return (
    <HeroSecondContainer class='box d-flex align-items-center'>
      <div className='container'>
        <div className='row'>
          <div class='col-lg-5 order-1 order-lg-1 d-flex flex-column justify-content-start mt-5'>
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
                    <Link to='/form'>
                      <Card
                        title='Personal Information'
                        subTitle='5/10 Sections Completed'
                        iconClass='fas fa-address-card'
                      ></Card>
                    </Link>
                  </div>
                  <div class='m-1'>
                    <Card
                      title='Academic Information'
                      subTitle='5/10 Sections Completed'
                    ></Card>
                  </div>
                </div>
              </div>
              <div class='m-2'>
                <div class='d-flex flex-row justify-content-around'>
                  <div class='m-1'>
                    <Card
                      title='Professional Experience'
                      subTitle='5/10 Sections Completed'
                    ></Card>
                  </div>
                  <div class='m-1'>
                    <Card
                      title='Health Information'
                      subTitle='5/10 Sections Completed'
                    ></Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroSecondContainer>
  );
}

export default HeroSecond;