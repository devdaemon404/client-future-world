import React from 'react';
import {
  Container,
  HeroContainer,
  MainPara,
  MainHeader,
} from './secondpage.styles';
import Header from '../../components/header/Header';
import Card2 from '../../components/card/Card2';

function personalpage() {
  const list = [
    'Basic Information-1',
    'Basic Information-2',
    'Designation Information',
    'Documental Information',
    'Address',
    'Language Information',
  ];
  const pathname = [
    'basicInformation-1',
    'basicInformation-2',
    'designationInformation',
    'documentalInformation',
    'address',
    'languageInformation',
  ];

  return (
    <Container>
      <Header pathname='/' />
      <HeroContainer className='box d-flex align-items-center'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-5 order-1 order-lg-1 d-flex flex-column justify-content-start mt-5 mb-5'>
              <MainHeader>My Application</MainHeader>
              <MainPara>
                Please fill in your on-boarding application form. We are
                delighted to have you here!
              </MainPara>
            </div>
            <div className='col-lg-7 order-1 order-lg-2'>
              <Card2
                title='Personal Information'
                subTitle='2/4 Sections Completed'
                iconClass='fas fa-address-card fa-2x'
                percentage='50'
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

export default personalpage;
