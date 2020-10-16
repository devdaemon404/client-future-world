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
import OPBreadCrumb from '../../../components/form/OPBreadCrumb.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HealthInformation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    bloodGroup: '',
    height: '',
    weight: '',
    lEyePower: '',
    rEyePower: '',
    indentification1: '',
    indentification2: '',
    illnesses: '',
  });
  const {
    bloodGroup,
    height,
    weight,
    lEyePower,
    rEyePower,
    indentification1,
    indentification2,
    illnesses,
  } = formData;

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
        '/api/employee?select=bloodGroup,height,weight,lEyePower,rEyePower,indentification1,indentification2,illnesses,',
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

  const updateHealthInformation = async ({
    bloodGroup,
    height,
    weight,
    lEyePower,
    rEyePower,
    indentification1,
    indentification2,
    illnesses,
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
          bloodGroup,
          height,
          weight,
          lEyePower,
          rEyePower,
          indentification1,
          indentification2,
          illnesses,
        },
      });

      await axios.post('/api/employee', body, config).then();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateHealthInformation(formData);
  };

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
                activeIndex={1}
                crumbs={[
                  {
                    link: '/information/familyInformation',
                    label: 'Health Information'
                  },
                  {
                    link: '/information/healthInformation',
                    label: 'Family Member Information'
                  }
                ]} />
              <hr></hr>
              {isLoading ? (
                <div>
                  <h1>Loading...</h1>
                </div>
              ) : (
                  <form onSubmit={handleSubmit} className='mt-2 text-left'>
                    <div className='form-group row p-2'>
                      <label className='col-sm-3 col-form-label'>
                        <span style={{ color: 'red' }}>*</span> Blood Group
                    </label>
                      <div className='col-sm-9'>
                        <input
                          type='text'
                          className='form-control'
                          id='bloodGroup'
                          placeholder=''
                          name='bloodGroup'
                          value={bloodGroup || ''}
                          onChange={(e) => handleChange(e)}
                          required
                        />
                      </div>
                    </div>

                    <div className='form-group row p-2'>
                      <label className='col-sm-3 col-form-label'>
                        <span style={{ color: 'red' }}>*</span> Height(in cms)
                    </label>
                      <div className='col-sm-9'>
                        <input
                          type='text'
                          className='form-control'
                          id='height'
                          placeholder=''
                          name='height'
                          value={height || ''}
                          onChange={(e) => handleChange(e)}
                          required
                        />
                      </div>
                    </div>

                    <div className='form-group row p-2'>
                      <label className='col-sm-3 col-form-label'>
                        <span style={{ color: 'red' }}>*</span> Weight
                    </label>
                      <div className='col-sm-9'>
                        <input
                          type='text'
                          className='form-control'
                          id='weight'
                          placeholder=''
                          name='weight'
                          value={weight || ''}
                          onChange={(e) => handleChange(e)}
                          required
                        />
                      </div>
                    </div>

                    <div className='form-group row p-2'>
                      <label className='col-sm-4 col-form-label'>
                        <span style={{ color: 'red' }}>*</span> Power of Glass
                    </label>
                      <div className='col-sm-4'>
                        <input
                          type='text'
                          className='form-control'
                          id='lEyePower'
                          placeholder='L'
                          name='lEyePower'
                          value={lEyePower || ''}
                          onChange={(e) => handleChange(e)}
                          required
                        />
                      </div>
                      <div className='col-sm-4'>
                        <input
                          type='text'
                          className='form-control'
                          id='rEyePower'
                          placeholder='R'
                          name='rEyePower'
                          value={rEyePower || ''}
                          onChange={(e) => handleChange(e)}
                          required
                        />
                      </div>
                    </div>

                    <div className='form-group row p-2'>
                      <label className='col-sm-4 col-form-label'>
                        <span style={{ color: 'red' }}>*</span> Identification
                      marks
                    </label>
                      <div className='col-sm-4'>
                        <input
                          type='text'
                          className='form-control'
                          id='indentification1'
                          placeholder='1.'
                          name='indentification1'
                          value={indentification1 || ''}
                          onChange={(e) => handleChange(e)}
                          required
                        />
                      </div>
                      <div className='col-sm-4'>
                        <input
                          type='text'
                          className='form-control'
                          id='indentification2'
                          placeholder='2.'
                          name='indentification2'
                          value={indentification2 || ''}
                          onChange={(e) => handleChange(e)}
                          required
                        />
                      </div>
                    </div>

                    <div className='form-group row p-2'>
                      <label className='col-sm-3 col-form-label'>
                        <span style={{ color: 'red' }}>*</span> Any major surgery
                      / illness in the past / Allergies
                    </label>
                      <div className='col-sm-9'>
                        <input
                          type='text'
                          className='form-control'
                          id='illnesses'
                          placeholder=''
                          name='illnesses'
                          value={illnesses || ''}
                          onChange={(e) => handleChange(e)}
                          required
                        />
                      </div>
                    </div>

                    <div className='form-group row p-2 d-flex justify-content-center mt-4 mb-5'>
                      <div className='col-sm-10'>
                        <Link to='/information/familyInformation'>
                          <button
                            type='submit'
                            onClick={() => {
                              updateHealthInformation(formData);
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

export default HealthInformation;
