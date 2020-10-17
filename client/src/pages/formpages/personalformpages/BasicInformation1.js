import React, { useState, useEffect } from 'react';
import {
  Container,
  HeroContainer,
  MainHeader,
  //  MainPara, CardHeader, CardPara
} from '../formpage.styles.js';
import Header from '../../../components/header/Header';
import FormPageComponent from '../../../components/form/FormPageComponent';
import axios from 'axios';
import OPBreadCrumb from '../../../components/form/OPBreadCrumb.js';

const BasicInformation1 = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    empNo: '',
    fullName: '',
    nameHRIS: '',
    fatherName: '',
    upload: '',
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
        '/api/employee?select=companyName,empNo,fullName,nameHRIS,fatherName,upload',
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
    upload,
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
          upload,
        },
      });

      await axios.post('/api/employee', body, config);
      history.push('/information/basicInformation-2');
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
              activeIndex={0}
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
            {/* <h2>Current Address</h2> */}

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
                        Upload Passport Size Photo
                      </span>
                    </div>
                    <div class='custom-file'>
                      <input
                        type='file'
                        class='custom-file-input'
                        id='upload'
                        aria-describedby='inputGroupFileAddon01'
                        name='upload'
                        // value={upload || ''}
                        onChange={(e) => handleChange(e)}
                      />
                      <label
                        class='custom-file-label'
                        for='inputGroupFile01'
                      ></label>
                    </div>
                  </div> */}

                <div className='form-group row p-2 d-flex justify-content-center mt-4 mb-5'>
                  <div className='col-sm-10'>
                    <button
                      type='submit'
                      onClick={() => {
                        updateBasicInformation(formData);
                      }}
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

export default BasicInformation1;
