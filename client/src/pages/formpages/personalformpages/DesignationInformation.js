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

const DesignationInformation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    joiningDate: '',
    designation: '',
    department: '',
    reporting: '',
    jobLevel: '',
    officeLocation: '',
    entryVia: '',
    nomination: '',
  });
  const {
    joiningDate,
    designation,
    department,
    reporting,
    jobLevel,
    officeLocation,
    entryVia,
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
        '/api/employee?select=joiningDate,designation,department,reporting,jobLevel,officeLocation,entryVia,,nomination,',
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
    officeLocation,
    entryVia,
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
          officeLocation,
          entryVia,
          nomination,
        },
      });

      await axios.post('/api/employee', body, config).then();
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
                    className='nav-link'
                    href='/information/basicInformation-2'
                  >
                    Basic Information - 2
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='nav-link active'
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
                      <span style={{ color: 'red' }}>*</span> Joining Date
                    </label>
                    <div className='col-sm-9'>
                      <input
                        type='date'
                        className='form-control'
                        id='joiningDate'
                        name='joiningDate'
                        value={joiningDate || ''}
                        onChange={(e) => handleChange(e)}
                        required
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
                        onChange={(e) => handleChange(e)}
                        required
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
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                  </div>

                  <div className='form-group row p-2'>
                    <label className='col-sm-3 col-form-label'>
                      <span style={{ color: 'red' }}>*</span> Reporting to
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
                      <span style={{ color: 'red' }}>*</span> Location
                    </label>
                    <div className='col-sm-9'>
                      <input
                        type='text'
                        className='form-control'
                        id='officeLocation'
                        placeholder=''
                        name='officeLocation'
                        value={officeLocation || ''}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                  </div>

                  <fieldset className='form-group p-2'>
                    <div className='row'>
                      <legend className='col-form-label col-sm-3 pt-0'>
                        <span style={{ color: 'red' }}>*</span> Manner of Entry
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
                          <label className='form-check-label'>Placement</label>
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
                        <div className='form-check'>
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
                        </div>
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
                      <Link to='/information/documentalInformation'>
                        <button
                          type='submit'
                          onClick={() => {
                            updateDesignationInformation(formData);
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

export default DesignationInformation;
