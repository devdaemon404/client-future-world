import React, { useState, useEffect } from 'react';
import {
  Container,
  HeroContainer,
  MainHeader,
  //  MainPara, CardHeader, CardPara
} from '../formpage.styles.js';
import { Link } from 'react-router-dom';
import Header from '../../../components/header/Header';
import OPBreadCrumb from '../../../components/form/OPBreadCrumb';
import axios from 'axios';
import FormPageComponent from '../../../components/form/FormPageComponent.js';

const BasicInformation2 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    dob: '',
    originalDob: '',
    // male: 'option1',
    // female: 'option2',
    sex: '',
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
      <div className=''>
        <FormPageComponent>
            <div className='container-fluid mt-5'>
              {/* <h2>Current Address</h2> */}
              <OPBreadCrumb
                activeIndex={1}
                crumbs={[
                  {
                    link: '/information/basicInformation-1',
                    label: 'Basic Info - 1',
                  },
                  {
                    link: '/information/basicInformation-2',
                    label: 'Basic Info - 2',
                  },
                  {
                    link: '/information/designationInformation',
                    label: 'Designation',
                  },
                  {
                    link: '/information/documentalInformation',
                    label: 'Documental',
                  },
                  {
                    link: '/information/address',
                    label: 'Address',
                  },
                  {
                    link: '/information/languageInformation',
                    label: 'Language',
                  },
                ]}
              />
              <hr></hr>
              {isLoading ? (
                <div>
                  <h1>Loading...</h1>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className='mt-2 text-left'
                  style={{ textAlign: 'center' }}
                >
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
                          className='btn selected-crumb submit-button crumb-item w-100 font-weight-bold'
                          onClick={() => {
                            updateBasicInformation(formData);
                          }}
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
        </FormPageComponent>
      </div>
    </Container>
  );
};

export default BasicInformation2;
