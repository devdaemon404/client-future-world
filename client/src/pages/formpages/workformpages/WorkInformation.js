import React, { useState, useEffect } from 'react';
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
import OPBreadCrumb from '../../../components/form/OPBreadCrumb';
import axios from 'axios';

const WorkInformation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      const result = await axios.get(
        '/api/employee?select=workInformation,',
        config
      );
      if (result.data.data !== null && result.data.data.workInformation != undefined)
        setFormData([...result.data.data.workInformation]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

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
              <OPBreadCrumb activeIndex={1} crumbs={[
                {
                  link: '/information/academicInformation',
                  label: 'Academic Information'
                },
                {
                  link: '/information/workInformation',
                  label: 'Work Experience'
                }
              ]} />
              <hr></hr>
              <h3 className='mt-3 mb-4'>
                Please specify all the previous companies you have worked at.
                <span style={{ color: 'red' }}>*</span>
              </h3>
              <ComplexComponent
                buttonName='Add Professional Experiences'
                onSubmit={async (data) => {
                  /// Make your API call here
                  setFormData([...data])
                  const config = {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                  };
                  await axios.post('/api/employee', JSON.stringify({
                    postParams: {
                      workInformation: data
                    }
                  }), config)
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
                  'Professional Achievments',
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
                  'achievments',
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
                    key: 'achievments',
                    isRequired: true,
                  },
                ]}
                // defaultData={[
                //   { "company ": "asdsad", "fromDate ": "2020-10-27", "toDate ": "2020-11-07", "designation": "asd", "salary": "asd", "typeOfIndustry": "asd", "reasonForLeaving": "asd", "skills": "asd", "achievments": "asd" }
                // ]}
                defaultData={[...formData]}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WorkInformation;
