import React, { useState, useEffect } from 'react';
import {
  Container,
  HeroContainer,
  MainHeader,
  //  MainPara, CardHeader, CardPara
} from '../formpage.styles.js';
import Header from '../../../components/header/Header';
import FormPageComponent from '../../../components/form/FormPageComponent';
import OPBreadCrumb from '../../../components/form/OPBreadCrumb.js';

import axios from 'axios';

const DesignationInformation = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    joiningDate: '',
    designation: '',
    department: '',
    reporting: '',
    jobLevel: '',
    custLoc: '',
    custSerName: '',
    entryVia: '',
    collegeName: '',
    hrName: '',
    empNameId: '',
    agencyName: '',
    consultancyName: '',
    nomination: '',
  });
  const {
    joiningDate,
    designation,
    department,
    reporting,
    jobLevel,
    custLoc,
    custSerName,
    entryVia,
    collegeName,
    hrName,
    empNameId,
    agencyName,
    consultancyName,
    nomination,
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
        '/api/employee?select=joiningDate,designation,department,reporting,jobLevel,custLoc,custSerName,entryVia,collegeName,hrName,empNameId,agencyName,consultancyName,nomination,',
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

  const updateDesignationInformation = async ({
    joiningDate,
    designation,
    department,
    reporting,
    jobLevel,
    custLoc,
    custSerName,
    entryVia,
    collegeName,
    hrName,
    empNameId,
    agencyName,
    consultancyName,
    nomination,
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
          joiningDate,
          designation,
          department,
          reporting,
          jobLevel,
          custLoc,
          custSerName,
          entryVia,
          collegeName,
          hrName,
          empNameId,
          agencyName,
          consultancyName,
          nomination,
        },
      });

      await axios.post('/api/employee', body, config);
      history.push('/information/documentalInformation');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateDesignationInformation(formData);
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
            {/* <h2>Current Address</h2> */}
            <OPBreadCrumb
              activeIndex={2}
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
                    <span style={{ color: 'red' }}></span> Date of Joining
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='date'
                      className='form-control'
                      id='joiningDate'
                      name='joiningDate'
                      value={joiningDate || ''}
                      // onChange={(e) => handleChange(e)}
                      // required
                      disabled
                    />
                  </div>
                </div>

                <div className='form-group row p-2'>
                  <label className='col-sm-3 col-form-label'>
                    <span style={{ color: 'red' }}>*</span> Designation
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='text'
                      className='form-control'
                      id='designation'
                      placeholder=''
                      name='designation'
                      value={designation || ''}
                      // onChange={(e) => handleChange(e)}
                      // required
                      disabled
                    />
                  </div>
                </div>

                <div className='form-group row p-2'>
                  <label className='col-sm-3 col-form-label'>
                    <span style={{ color: 'red' }}>*</span> Department
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='text'
                      className='form-control'
                      id='department'
                      placeholder=''
                      name='department'
                      value={department || ''}
                      // onChange={(e) => handleChange(e)}
                      // required
                      disabled
                    />
                  </div>
                </div>

                <div className='form-group row p-2'>
                  <label className='col-sm-3 col-form-label'>
                    <span style={{ color: 'red' }}>*</span> Reporting Manager
                    Name
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='text'
                      className='form-control'
                      id='reporting'
                      placeholder=''
                      name='reporting'
                      value={reporting || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                </div>

                <div className='form-group row p-2'>
                  <label className='col-sm-3 col-form-label'>
                    <span style={{ color: 'red' }}>*</span> Job Level
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='text'
                      className='form-control'
                      id='jobLevel'
                      placeholder=''
                      name='jobLevel'
                      value={jobLevel || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                </div>

                <div className='form-group row p-2'>
                  <label className='col-sm-3 col-form-label'>
                    <span style={{ color: 'red' }}>*</span> Customer Serving
                    Name
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='text'
                      className='form-control'
                      id='custSerName'
                      placeholder=''
                      name='custSerName'
                      value={custSerName || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                </div>

                <div className='form-group row p-2'>
                  <label className='col-sm-3 col-form-label'>
                    <span style={{ color: 'red' }}>*</span> Customer Location
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='text'
                      className='form-control'
                      id='custLoc'
                      placeholder=''
                      name='custLoc'
                      value={custLoc || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                </div>

                <fieldset className='form-group p-2 mb-2'>
                  <div className='row'>
                    <legend className='col-form-label col-sm-3 pt-0'>
                      <span style={{ color: 'red' }}>*</span> Mode of
                      Recruitment
                    </legend>
                    <div className='col-sm-9'>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='entryVia'
                          id='Placement'
                          value='Placement'
                          onClick={(e) => handleChange(e)}
                          checked={entryVia === 'Placement'}
                        />
                        <label className='form-check-label'>
                          Campus Placement
                        </label>
                      </div>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='entryVia'
                          id='Direct'
                          value='Direct'
                          onClick={(e) => handleChange(e)}
                          checked={entryVia === 'Direct'}
                        />
                        <label className='form-check-label'>Direct</label>
                      </div>
                      {/* <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='entryVia'
                          id='Campus'
                          value='Campus'
                          onClick={(e) => handleChange(e)}
                          checked={entryVia === 'Campus'}
                        />
                        <label className='form-check-label'>Campus</label>
                      </div> */}
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='entryVia'
                          id='Referal'
                          value='Referal'
                          onClick={(e) => handleChange(e)}
                          checked={entryVia === 'Referal'}
                        />
                        <label className='form-check-label'>Referal</label>
                      </div>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='entryVia'
                          id='ADVT'
                          value='ADVT'
                          onClick={(e) => handleChange(e)}
                          checked={entryVia === 'ADVT'}
                        />
                        <label className='form-check-label'>ADVT</label>
                      </div>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='entryVia'
                          id='Consultant'
                          value='Consultant'
                          onClick={(e) => handleChange(e)}
                          checked={entryVia === 'Consultant'}
                        />
                        <label className='form-check-label'>Consultant</label>
                      </div>
                    </div>
                  </div>

                  {(() => {
                    switch (entryVia) {
                      case 'Placement':
                        return (
                          <input
                            type='text'
                            className='form-control'
                            id='collegeName'
                            placeholder='College Name'
                            name='collegeName'
                            value={collegeName || ''}
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        );
                      case 'Direct':
                        return (
                          <input
                            type='text'
                            className='form-control'
                            id='hrName'
                            placeholder='FutureWorld HR name'
                            name='hrName'
                            value={hrName || ''}
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        );

                      case 'Referal':
                        return (
                          <input
                            type='text'
                            className='form-control'
                            id='empNameId'
                            placeholder='empNameId'
                            name='empNameId'
                            value={empNameId || ''}
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        );

                      case 'ADVT':
                        return (
                          <input
                            type='text'
                            className='form-control'
                            id='agencyName'
                            placeholder='Agency Name'
                            name='agencyName'
                            value={agencyName || ''}
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        );
                      case 'Consultant':
                        return (
                          <input
                            type='text'
                            className='form-control'
                            id='consultancyName'
                            placeholder='Company Name'
                            name='consultancyName'
                            value={consultancyName || ''}
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        );

                      default:
                        return '';
                    }
                  })()}
                </fieldset>

                <div className='form-group row p-2'>
                  <label className='col-sm-3 col-form-label'>
                    <span style={{ color: 'red' }}>*</span> Nomination
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='text'
                      className='form-control'
                      id='nomination'
                      placeholder=''
                      name='nomination'
                      value={nomination || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    />
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

export default DesignationInformation;
