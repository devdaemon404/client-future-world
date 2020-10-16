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
import axios from 'axios';

const BasicInformation2 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    dob: '',
    originalDob: '',
    // male: 'option1',
    // female: 'option2',
    sex:'',
    birthPlace: '',
    maritalStatus: '',
    marriageDate: '',
    religion: '',
  });
  const {
    dob,
    originalDob,
    sex,
    birthPlace,
    maritalStatus,
    marriageDate,
    religion,
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
        '/api/employee?select=dob,originalDob,sex,birthPlace,maritalStatus,marriageDate,religion,',
        config
      );

      console.log(result.data.data);
      setFormData({ ...result.data.data });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    console.log(e.target);
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateBasicInformation = async ({
    dob,
    originalDob,
    sex,
    birthPlace,
    maritalStatus,
    marriageDate,
    religion,
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
          dob,
          originalDob,
          sex,
          birthPlace,
          maritalStatus,
          marriageDate,
          religion,
        },
      });

      await axios.post('/api/employee', body, config).then();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateBasicInformation(formData);
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
              <ul className='nav nav-pills nav-fill'>
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    href='/information/basicInformation-1'
                  >
                    Basic Information - 1
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='nav-link active'
                    href='/information/basicInformation-2'
                  >
                    Basic Information - 2
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    href='/information/designationInformation'
                  >
                    Designation Information
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    href='/information/documentalInformation'
                  >
                    Documental Information
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/information/address'>
                    Address
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    href='/information/languageInformation'
                  >
                    Language Information
                  </a>
                </li>
              </ul>
              <hr></hr>
              {isLoading ? (
                <div>
                  <h1>Loading...</h1>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className='mt-2 text-left'>
                  <div className='form-group row p-2'>
                    <label className='col-sm-3 col-form-label'>
                      <span style={{ color: 'red' }}>*</span> DOB
                    </label>
                    <div className='col-sm-9'>
                      <input
                        type='date'
                        className='form-control'
                        placeholder='as per records'
                        id='dob'
                        name='dob'
                        value={dob || ''}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                  </div>

                  <div className='form-group row p-2'>
                    <label className='col-sm-3 col-form-label'>
                      <span style={{ color: 'red' }}>*</span> Original DOB
                    </label>
                    <div className='col-sm-9'>
                      <input
                        type='date'
                        className='form-control'
                        id='originalDob'
                        name='originalDob'
                        value={originalDob || ''}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                  </div>

                  <fieldset className='form-group p-2'>
                    <div className='row'>
                      <legend className='col-form-label col-sm-3 pt-0'>
                        <span style={{ color: 'red' }}>*</span> Sex
                      </legend>
                      <div className='col-sm-9'>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='radio'
                            name='sex'
                            id='male'
                            value='male'
                            onClick={(e) => handleChange(e)}
                            checked={sex === 'male'}
                            

                          />
                          <label className='form-check-label'>Male</label>
                        </div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='radio'
                            name='sex'
                            id='female'
                            value='female'
                            onClick={(e) => handleChange(e)}
                            checked={sex === 'female'}
                          />
                          <label className='form-check-label'>Female</label>
                        </div>
                      </div>
                    </div>
                  </fieldset>

                  <div className='form-group row p-2'>
                    <label className='col-sm-3 col-form-label'>
                      <span style={{ color: 'red' }}>*</span> Birth Place
                    </label>
                    <div className='col-sm-9'>
                      <input
                        type='text'
                        className='form-control'
                        id='birthPlace'
                        placeholder=''
                        name='birthPlace'
                        value={birthPlace || ''}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                  </div>

                  <div className='form-group row p-2'>
                    <label className='col-sm-3 col-form-label'>
                      <span style={{ color: 'red' }}>*</span> Marital Status
                    </label>
                    <div className='col-sm-9'>
                      <input
                        type='text'
                        className='form-control'
                        id='maritalStatus'
                        placeholder=''
                        name='maritalStatus'
                        value={maritalStatus || ''}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                  </div>

                  <div className='form-group row p-2'>
                    <label className='col-sm-3 col-form-label'>
                      <span style={{ color: 'red' }}></span> Marriage Date
                    </label>
                    <div className='col-sm-9'>
                      <input
                        type='date'
                        className='form-control'
                        id='marriageDate'
                        name='marriageDate'
                        value={marriageDate || ''}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                  </div>

                  <div className='form-group row p-2'>
                    <label className='col-sm-3 col-form-label'>
                      <span style={{ color: 'red' }}>*</span> Religion
                    </label>
                    <div className='col-sm-9'>
                      <input
                        type='text'
                        className='form-control'
                        id='religion'
                        placeholder=''
                        name='religion'
                        value={religion || ''}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                  </div>

                  <div className='form-group row p-2 d-flex justify-content-center mt-4 mb-5'>
                    <div className='col-sm-10'>
                      <Link to='/information/designationInformation'>
                        <button
                          type='submit'
                          onClick={() => {
                            updateBasicInformation(formData);
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

export default BasicInformation2;
