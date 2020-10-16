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

const WorkInformation = () => {
  return (
    <Container>
      <Header pathname='/work' />
      <HeroContainer className='box d-flex align-items-center justify-content-center'>
        <MainHeader className='text-center'>
          Academic Infromation and Work Experience
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
                  <a
                    className='nav-link'
                    href='/information/academicInformation'
                  >
                    Academic Information
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='nav-link active'
                    href='/information/workInformation'
                  >
                    Work Experience
                  </a>
                </li>
              </ul>
              <hr></hr>
              <h3 className='mt-3 mb-4'>
                Please specify all the previous companies you have worked at.
                <span style={{ color: 'red' }}>*</span>
              </h3>
              <ComplexComponent
                buttonName='Add Professional Experiences'
                onSubmit={(data) => {
                  /// Make your API call here
                  console.log(data);
                }}
                tableColumns={[
                  'Company ',
                  'From date ',
                  'To date',
                  'Designation',
                  'Salary p.a.',
                  'Type of Industry',
                  'Reason for leaving',
                  'Funtional/Technical Skills',
                  'Professional Achievents',
                ]}
                essentialFieldKeys={[
                  'company ',
                  'fromDate ',
                  'toDate ',
                  'designation',
                  'salary',
                  'typeOfIndustry',
                  'reasonForLeaving',
                  'skills',
                  'achievents',
                ]}
                textFieldDetails={[
                  {
                    label: 'Company ',
                    key: 'company ',
                    isRequired: true,
                  },
                  {
                    label: 'From date ',
                    key: 'fromDate ',
                    isRequired: true,
                    type: 'date',
                  },
                  {
                    label: 'To date',
                    key: 'toDate ',
                    isRequired: true,
                    type: 'date',
                  },
                  {
                    label: 'Designation',
                    key: 'designation',
                    isRequired: true,
                  },
                  {
                    label: 'Salary p.a.',
                    key: 'salary',
                    isRequired: true,
                  },
                  {
                    label: 'Type of Industry',
                    key: 'typeOfIndustry',
                    isRequired: true,
                  },
                  {
                    label: 'Reason for leaving',
                    key: 'reasonForLeaving',
                    isRequired: true,
                  },
                  {
                    label: 'Funtional/Technical Skills',
                    key: 'skills',
                    isRequired: true,
                  },
                  {
                    label: 'Professional Achievents',
                    key: 'achievents',
                    isRequired: true,
                  },
                ]}
                defaultData={[]}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WorkInformation;
