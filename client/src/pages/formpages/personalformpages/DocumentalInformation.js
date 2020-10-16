import React, { useState, useEffect } from 'react';
import {
  Container,
  HeroContainer,
  MainHeader,
  //  MainPara, CardHeader, CardPara
} from '../formpage.styles.js';
import { Link } from 'react-router-dom';
import Header from '../../../components/header/Header';
import Progressbar from '../../../components/progress-bar/Progress';
import OPBreadCrumb from '../../../components/form/OPBreadCrumb.js';

import axios from 'axios';

const DocumentalInformation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    panNo: '',
    passportNo: '',
    issue: '',
    validity: '',
  });
  const { panNo, passportNo, issue, validity } = formData;

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
        '/api/employee?select=panNo,passportNo,issue,validity',
        config
      );

      console.log(result.data.data);
      setFormData({ ...result.data.data });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateDocumentalInformation = async ({
    panNo,
    passportNo,
    issue,
    validity,
  }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      const body = JSON.stringify({
        postParams: {
          panNo,
          passportNo,
          issue,
          validity,
        },
      });

      await axios.post('/api/employee', body, config).then();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateDocumentalInformation(formData);
  };

  return (
    <Container>
      <Header pathname='/personal' />
      <HeroContainer className='box d-flex align-items-center justify-content-center'>
        <MainHeader className='text-center'>Personal Information</MainHeader>
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
                activeIndex={3}
                crumbs={[
                  {
                    link: '/information/basicInformation-1',
                    label: 'Basic Information - 1',
                  },
                  {
                    link: '/information/basicInformation-2',
                    label: 'Basic Information - 2',
                  },
                  {
                    link: '/information/designationInformation',
                    label: 'Designation Information',
                  },
                  {
                    link: '/information/documentalInformation',
                    label: 'Documental Information',
                  },
                  {
                    link: '/information/address',
                    label: 'Address',
                  },
                  {
                    link: '/information/languageInformation',
                    label: 'Language Information',
                  },
                ]}
              />
              <hr></hr>
              {isLoading ? (
                <div>
                  <h1>Loading...</h1>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className='mt-2 text-left'>
                  <div className='form-group row p-2'>
                    <label className='col-sm-3 col-form-label'>
                      <span style={{ color: 'red' }}>*</span> PAN number
                    </label>
                    <div className='col-sm-9'>
                      <input
                        type='text'
                        className='form-control'
                        id='panNo'
                        placeholder=''
                        name='panNo'
                        value={panNo || ''}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                  </div>

                  <div className='form-group row p-2'>
                    <label className='col-sm-3 col-form-label'>
                      <span style={{ color: 'red' }}>*</span> Passport number
                    </label>
                    <div className='col-sm-9'>
                      <input
                        type='text'
                        className='form-control'
                        id='passportNo'
                        placeholder=''
                        name='passportNo'
                        value={passportNo || ''}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                  </div>

                  <div className='form-group row p-2'>
                    <label className='col-sm-3 col-form-label'>
                      <span style={{ color: 'red' }}>*</span> Issue date and
                      place
                    </label>
                    <div className='col-sm-9'>
                      <input
                        type='text'
                        className='form-control'
                        id='issue'
                        placeholder='location of issue dd/mm/yyyy'
                        name='issue'
                        value={issue || ''}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                  </div>

                  <div className='form-group row p-2'>
                    <label className='col-sm-3 col-form-label'>
                      <span style={{ color: 'red' }}>*</span> Validity
                    </label>
                    <div className='col-sm-9'>
                      <input
                        type='text'
                        className='form-control'
                        id='validity'
                        placeholder=''
                        name='validity'
                        value={validity || ''}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                  </div>

                  <div className='form-group row p-2 d-flex justify-content-center mt-4 mb-5'>
                    <div className='col-sm-10'>
                      <Link to='/information/address'>
                        <button
                          type='submit'
                          onClick={() => {
                            updateDocumentalInformation(formData);
                          }}
                          className='btn btn-primary w-100 font-weight-bold'
                        >
                          <i className='far fa-check-circle'></i> Save and
                          Continue
                        </button>
                      </Link>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DocumentalInformation;
