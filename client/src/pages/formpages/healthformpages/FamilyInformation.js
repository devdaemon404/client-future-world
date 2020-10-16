import React from 'react';
import {
  Container,
  HeroContainer,
  MainHeader,
  //  MainPara, CardHeader, CardPara
} from '../formpage.styles.js';
// import { Link } from 'react-router-dom';
import Header from '../../../components/header/Header';
import Progressbar from '../../../components/progress-bar/Progress';
import ComplexComponent from '../../../components/form/ComplexComponent';

const FamilyInformation = () => {
  return (
    <Container>
      <Header pathname='/health' />
      <HeroContainer className='box d-flex align-items-center justify-content-center'>
        <MainHeader className='text-center'>
          Health and Family Information
        </MainHeader>
      </HeroContainer>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 order-1 order-lg-1 d-flex flex-column justify-content-start mt-5'>
            <div className='d-flex justify-content-center'>
              <Progressbar
                iconClass='fas fa-address-card fa-2x'
                percentage='50'
              />
            </div>
            <p className='text-muted text-center'>
              <em>5/10 sections completed</em>
            </p>
          </div>
          <div className='col-lg-8 order-1 order-lg-2 d-flex flex-column justify-content-start mt-5'>
            <div>
              <p>
                Enter your contact information in this section. Keep this
                information up-to-date throughout the application process.
              </p>
            </div>
            <div>
              <p>
                You can edit this section after you submit your application.
              </p>
            </div>
            <div>
              <p>
                <span style={{ color: 'red' }}>*</span> Indicates required field
              </p>
            </div>

            <div className='container-fluid mt-5'>
              {/* <h2>Current Address</h2> */}
              <ul className='nav nav-pills nav-fill'>
                <li className='nav-item'>
                  <a className='nav-link' href='/information/healthInformation'>
                    Health Information
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='nav-link active'
                    href='/information/familyInformation'
                  >
                    Family Member Information
                  </a>
                </li>
              </ul>
              <hr></hr>
              <h3 className='mt-3 mb-4'>Add at max five members of your family<span style={{ color: 'red' }}>*</span></h3>
              <ComplexComponent
                buttonName='Add Family Member'
                onSubmit={(data) => {
                  /// Make your API call here
                  console.log(data);
                }}
                tableColumns={['Name', 'Relationship','DOB', 'Blood Group' ,'Occupation',]}
                essentialFieldKeys={[
                  'name',
                  'relationship',
                  'familyDob',
                  'bloodGroup',
                  'occupation',
                ]}
                textFieldDetails={[
                  {
                    label: 'Family Member Name',
                    key: 'name',
                    isRequired: true,
                  },
                  {
                    label: 'Relationship',
                    key: 'relationship',
                    isRequired: true,
                  },
                  {
                    label: 'DOB',
                    key: 'familyDob',
                    isRequired: true,
                    type: 'date',

                  },
                  {
                    label: 'Blood Group',
                    key: 'bloodGroup',
                    isRequired: true,
                  },
                  {
                    label: 'Occupation',
                    key: 'occupation',
                    isRequired: true,
                  },
                ]}
                defaultData={[
                
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FamilyInformation;
