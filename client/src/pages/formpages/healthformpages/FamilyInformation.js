import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  HeroContainer,
  MainHeader,
  //  MainPara, CardHeader, CardPara
} from '../formpage.styles.js';
// import { Link } from 'react-router-dom';
import Header from '../../../components/header/Header';
import FormPageComponent from '../../../components/form/FormPageComponent';
import ComplexComponent from '../../../components/form/ComplexComponent';
import OPBreadCrumb from '../../../components/form/OPBreadCrumb.js';

const FamilyInformation = () => {
  // eslint-disable-next-line
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
        '/api/employee?select=familyInformation,',
        config
      );
      if (
        result.data.data !== null &&
        result.data.data.familyInformation !== undefined
      )
        setFormData([...result.data.data.familyInformation]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Header pathname='/health' />
      <HeroContainer className='box d-flex align-items-center justify-content-center'>
        <MainHeader className='text-center'>
          Employee Health and Family Information
        </MainHeader>
      </HeroContainer>
      <div className=''>
        <FormPageComponent>
          <div className='container-fluid mt-5'>
            {/* <h2>Current Address</h2> */}
            {/* <h2>Current Address</h2> */}
            <OPBreadCrumb
              activeIndex={0}
              crumbs={[
                {
                  link: '/information/familyInformation',
                  label: 'Family Member Information',
                },
                {
                  link: '/information/healthInformation',
                  label: 'Employee Health Information',
                },
              ]}
            />
            <hr></hr>
            <h5 className='mt-3 mb-4'>
              Add at max five members of your family
              <span style={{ color: 'red' }}>*</span>
            </h5>
            <ComplexComponent
              buttonName='Add Family Member'
              onSubmit={async (data) => {
                /// Make your API call here
                setFormData([...data]);
                const config = {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  withCredentials: true,
                };
                await axios.post(
                  '/api/employee',
                  JSON.stringify({
                    postParams: {
                      familyInformation: data,
                    },
                  }),
                  config
                );
              }}
              columnNames={[
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
              defaultData={[...formData]}
            />
          </div>
        </FormPageComponent>
      </div>
    </Container>
  );
};

export default FamilyInformation;
