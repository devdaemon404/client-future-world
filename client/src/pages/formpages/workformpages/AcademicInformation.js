import React, { useState, useEffect } from 'react';
import {
  Container,
  HeroContainer,
  MainHeader,
  //  MainPara, CardHeader, CardPara
} from '../formpage.styles.js';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../components/header/Header';
import FormPageComponent from '../../../components/form/FormPageComponent';
import ComplexComponent from '../../../components/form/ComplexComponent';
import OPBreadCrumb from '../../../components/form/OPBreadCrumb.js';

const AcademicInformation = () => {
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
        '/api/employee?select=academicInformation,',
        config
      );
      if (
        result.data.data !== null &&
        result.data.data.academicInformation !== undefined
      )
        setFormData([...result.data.data.academicInformation]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Header pathname='/work' />
      <HeroContainer className='box d-flex align-items-center justify-content-center'>
        <MainHeader className='text-center'>
          Academic Information and Work Experience
        </MainHeader>
      </HeroContainer>
      <FormPageComponent>
        <div className='container-fluid mt-5'>
          {/* <h2>Current Address</h2> */}
          <OPBreadCrumb
            activeIndex={0}
            crumbs={[
              {
                link: '/information/academicInformation',
                label: 'Academic Information',
              },
              {
                link: '/information/workInformation',
                label: 'Work Experience',
              },
            ]}
          />

          <hr></hr>
          <h5 className='mt-3 mb-4'>
            Please specify from Secondary Education onwards.
            <span style={{ color: 'red' }}>*</span>
          </h5>
          <ComplexComponent
            buttonName='Add School/College Information'
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
                    academicInformation: data,
                  },
                }),
                config
              );
            }}
            tableColumns={[
              'Qualification Description',
              'Subject / Specialisation',
              'Name of the School / College / Institute',
              'Name of the Board / University',
              'Location of the Board / University',
              'Marks %',
              'Full time/ Part time',
              'Year of Passing',
            ]}
            essentialFieldKeys={[
              'qualiDesc',
              'sub',
              'schoolCollegeName',
              'boardUniversityName',
              'location',
              'marks',
              'fullPartTime',
              'yOfPassing',
            ]}
            textFieldDetails={[
              {
                label: 'Qualification Description',
                key: 'qualiDesc',
                isRequired: true,
              },
              {
                label: 'Subject / Specialisation',
                key: 'sub',
                isRequired: true,
              },
              {
                label: 'Name of the School / College/ Institute',
                key: 'schoolCollegeName',
                isRequired: true,
              },
              {
                label: 'Name of the Board/ University',
                key: 'boardUniversityName',
                isRequired: true,
              },
              {
                label: 'Location of the Board / University',
                key: 'location',
                isRequired: true,
              },
              {
                label: 'Marks%',
                key: 'marks',
                isRequired: true,
              },
              {
                label: 'Full time/ Part time',
                key: 'fullPartTime',
                isRequired: true,
              },
              {
                label: 'Year of Passing',
                key: 'yOfPassing',
                isRequired: true,
              },
            ]}
            defaultData={[...formData]}
          />
        </div>
      </FormPageComponent>
    </Container>
  );
};

export default AcademicInformation;