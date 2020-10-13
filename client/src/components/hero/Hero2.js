import React from 'react';
import { Container, HeroContainer, MainHeader, MainPara, CardHeader, CardPara} from './hero.styles';
import Card2 from '../card/Card2';



function homepage() {
  return (
    <Container>
     
      <HeroContainer class='box d-flex align-items-center'>
      <div className='container'>
          <div className='row'>
            <div class='col-lg-5 order-1 order-lg-1 d-flex flex-column justify-content-start mt-5 mb-5'>
              <MainHeader>My Application</MainHeader>
              <MainPara>
                It is a long established fact that a reader will be distracted by
                the readable content of a page when looking at its layout.
              </MainPara>
            </div>
            <div class='col-lg-7 order-1 order-lg-2'>
              <Card2 
              title='Personal Information'
              subTitle='2/4 Sections Completed'
              iconClass='fas fa-address-card fa-2x'
              percentage='50' />

            </div>
          </div>
        </div>
      </HeroContainer>
    </Container>
  );
}

export default homepage;