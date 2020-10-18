import React, { useState, useEffect } from 'react';
import {
  Container,
  HeroContainer,
  MainHeader,
  //  MainPara, CardHeader, CardPara
} from '../formpage.styles.js';
import { Link } from 'react-router-dom';
import Header from '../../../components/header/Header';
import FormPageComponent from '../../../components/form/FormPageComponent';
import OPBreadCrumb from '../../../components/form/OPBreadCrumb.js';

import axios from 'axios';

const Address = ({history}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    presentAddress: '',
    phoneNumber: '',
    permanentAddress: '',
    phoneNumberPermAdd: '',
    contactPersonName: '',
    contactPersonPhone: '',
    contactPersonAddress: '',
  });
  const {
    presentAddress,
    phoneNumberPresAdd,
    permanentAddress,
    phoneNumberPermAdd,
    contactPersonName,
    contactPersonPhone,
    contactPersonAddress,
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
        '/api/employee?select=presentAddress,phoneNumberPresAdd,permanentAddress,phoneNumberPermAdd,contactPersonName,contactPersonPhone,contactPersonAddress,',
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

  const updateAddress = async ({
    presentAddress,
    phoneNumberPresAdd,
    permanentAddress,
    phoneNumberPermAdd,
    contactPersonName,
    contactPersonPhone,
    contactPersonAddress,
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
          presentAddress,
          phoneNumberPresAdd,
          permanentAddress,
          phoneNumberPermAdd,
          contactPersonName,
          contactPersonPhone,
          contactPersonAddress,
        },
      });

      await axios.post('/api/employee', body, config);
      history.push('/information/languageInformation');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateAddress(formData);
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
              activeIndex={4}
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
              <form onSubmit={handleSubmit} className='mt-2 text-left'>
                <div className='form-group row p-2'>
                  <label className='col-sm-3 col-form-label'>
                    <span style={{ color: 'red' }}>*</span> Present Address
                  </label>
                  <div className='col-sm-9'>
                    {/* <input type="text" className="form-control" id="" placeholder="" /> */}
                    <textarea
                      className='form-control'
                      rows='3'
                      id='presentAddress'
                      placeholder=''
                      name='presentAddress'
                      value={presentAddress || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className='form-group row p-2'>
                  <label className='col-sm-3 col-form-label'>
                    <span style={{ color: 'red' }}>*</span> Ph No./Mob No.
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='tel'
                      pattern='^[6-9]\d{9}$'
                      placeholder='+91 Phone Number'
                      maxLength='10'
                      minLength='10'
                      className='form-control'
                      id='phoneNumberPresAdd'
                      name='phoneNumberPresAdd'
                      value={phoneNumberPresAdd || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                </div>

                <div className='form-group row p-2'>
                  <label className='col-sm-3 col-form-label'>
                    <span style={{ color: 'red' }}>*</span> Permanent Address
                  </label>
                  <div className='col-sm-9'>
                    {/* <input type="text" className="form-control" id="" placeholder="" /> */}
                    <textarea
                      className='form-control'
                      rows='3'
                      id='permanentAddress'
                      placeholder=''
                      name='permanentAddress'
                      value={permanentAddress || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className='form-group row p-2'>
                  <label className='col-sm-3 col-form-label'>
                    <span style={{ color: 'red' }}>*</span> Ph No./Mob No.
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='tel'
                      pattern='^[6-9]\d{9}$'
                      placeholder='+91 Phone Number'
                      maxLength='10'
                      minLength='10'
                      className='form-control'
                      id='phoneNumberPermAdd'
                      name='phoneNumberPermAdd'
                      value={phoneNumberPermAdd || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                </div>

                <div className='form-group row p-2'>
                  <label className='col-sm-3 col-form-label'>
                    <span style={{ color: 'red' }}>*</span> Contact Person in
                    case of emergency
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='text'
                      className='form-control'
                      id='contactPersonName'
                      placeholder=''
                      name='contactPersonName'
                      value={contactPersonName || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                </div>

                <div className='form-group row p-2'>
                  <label className='col-sm-3 col-form-label'>
                    <span style={{ color: 'red' }}>*</span> Contact Person Ph
                    No./Mob No.
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='tel'
                      pattern='^[6-9]\d{9}$'
                      placeholder='+91 Phone Number'
                      maxLength='10'
                      minLength='10'
                      className='form-control'
                      id='contactPersonPhone'
                      name='contactPersonPhone'
                      value={contactPersonPhone || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                </div>

                <div className='form-group row p-2'>
                  <label className='col-sm-3 col-form-label'>
                    <span style={{ color: 'red' }}>*</span> Contact Person
                    Address
                  </label>
                  <div className='col-sm-9'>
                    {/* <input type="text" className="form-control" id="" placeholder="" /> */}
                    <textarea
                      className='form-control'
                      rows='3'
                      id='contactPersonAddress'
                      placeholder=''
                      name='contactPersonAddress'
                      value={contactPersonAddress || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className='form-group row p-2 d-flex justify-content-center mt-4 mb-5'>
                  <div className='col-sm-10'>
                    <button
                      type='submit'
                      className='btn selected-crumb submit-button crumb-item w-100 font-weight-bold'
                    >
                      <i className='far fa-check-circle'></i> Save and Continue
                    </button>
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

export default Address;
