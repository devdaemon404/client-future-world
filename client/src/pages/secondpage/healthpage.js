import React from 'react';
import { Container, HeroContainer, MainPara, MainHeader } from './secondpage.styles'
import Header from '../../components/header/Header';
import Card2 from '../../components/card/Card2';



function healthpage() {

  const list= ['Health Information', 'Family Members Information'];
  const pathname= ['healthInformation', 'familyInformation'];
  

  return (
  
      
      <Container>
      <Header pathname="/" />
        <HeroContainer className='box d-flex align-items-center'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-5 order-1 order-lg-1 d-flex flex-column justify-content-start mt-5 mb-5'>
                <MainHeader>My Application</MainHeader>
                <MainPara>
                  It is a long established fact that a reader will be distracted by
                  the readable content of a page when looking at its layout.
              </MainPara>
              </div>
              <div className='col-lg-7 order-1 order-lg-2'>
                <Card2
                  title='Health and Family Information'
                  subTitle='1/4 Sections Completed'
                  iconClass='fas fa-briefcase-medical fa-2x'
                  percentage='25' 
                  list={list}
                  pathname={pathname}
                  />
              </div>
            </div>
          </div>
        </HeroContainer>
       </Container>
      

  );
}

export default healthpage;