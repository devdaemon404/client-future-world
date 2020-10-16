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

const BasicInformation1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    empNo: '',
    fullName: '',
    nameHRIS: '',
    fatherName: '',
  });
  const { companyName, empNo, fullName, nameHRIS, fatherName } = formData;

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
        '/api/employee?select=companyName,empNo,fullName,nameHRIS,fatherName,',
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

  const updateBasicInformation = async ({
    companyName,
    empNo,
    fullName,
    nameHRIS,
    fatherName,
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
          companyName,
          empNo,
          fullName,
          nameHRIS,
          fatherName,
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
                    className='nav-link active'
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
                      <span style={{ color: 'red' }}>*</span> Company Name
                    </label>
                    <div className='col-sm-9'>
                      <input
                        type='text'
                        className='form-control'
                        id='companyName'
                        placeholder=''
                        name='companyName'
                        value={companyName || ''}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className='form-group row p-2'>
                    <label className='col-sm-3 col-form-label'>
                      <span style={{ color: 'red' }}>*</span> Emp no.
                    </label>
                    <div className='col-sm-9'>
                      <input
                        type='text'
                        className='form-control'
                        id='empNo'
                        placeholder=''
                        name='empNo'
                        value={empNo || ''}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className='form-group row p-2'>
                    <label className='col-sm-3 col-form-label'>
                      <span style={{ color: 'red' }}>*</span> Name in full
                    </label>
                    <div className='col-sm-9'>
                      <input
                        placeholder='initial|First Name|Middle Name|Last Name'
                        type='text'
                        className='form-control'
                        id='fullName'
                        name='fullName'
                        value={fullName || ''}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className='form-group row p-2'>
                    <label className='col-sm-3 col-form-label'>
                      <span style={{ color: 'red' }}>*</span> Name on HRIS
                    </label>
                    <div className='col-sm-9'>
                      <input
                        type='text'
                        className='form-control'
                        id='nameHRIS'
                        name='nameHRIS'
                        value={nameHRIS || ''}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className='form-group row p-2'>
                    <label className='col-sm-3 col-form-label'>
                      <span style={{ color: 'red' }}>*</span> Father's Name
                    </label>
                    <div className='col-sm-9'>
                      <input
                        type='text'
                        className='form-control'
                        id='fatherName'
                        name='fatherName'
                        value={fatherName || ''}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                  </div>

                  {/* <div class='input-group mb-3'>
                  <div class='input-group-prepend'>
                    <span class='input-group-text' id='inputGroupFileAddon01'>
                      Upload
                    </span>
                  </div>
                  <div class='custom-file'>
                    <input
                      type='file'
                      class='custom-file-input'
                      id='inputGroupFile01'
                      aria-describedby='inputGroupFileAddon01'
                    />
                    <label class='custom-file-label' for='inputGroupFile01'>
                      Passport Size Photo
                    </label>
                  </div>
                </div> */}

                  <div className='form-group row p-2 d-flex justify-content-center mt-4 mb-5'>
                    <div className='col-sm-10'>
                      <Link to='/information/basicInformation-2'>
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

export default BasicInformation1;
