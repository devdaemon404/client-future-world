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
import Progressbar from '../../../components/progress-bar/Progress';
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
              <OPBreadCrumb
                activeIndex={0}
                crumbs={[
                  {
                    link: '/information/familyInformation',
                    label: 'Health Information',
                  },
                  {
                    link: '/information/healthInformation',
                    label: 'Family Member Information',
                  },
                ]}
              />
              <hr></hr>
              <h3 className='mt-3 mb-4'>
                Add at max five members of your family
                <span style={{ color: 'red' }}>*</span>
              </h3>
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
                tableColumns={[
                  'Name',
                  'Relationship',
                  'DOB',
                  'Blood Group',
                  'Occupation',
                ]}
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
                defaultData={[...formData]}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FamilyInformation;
