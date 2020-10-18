import React, { useState, useEffect } from 'react';
import {
  Container,
  HeroContainer,
  MainHeader,
  //  MainPara, CardHeader, CardPara
} from '../formpage.styles.js';
import ImageUploading from 'react-images-uploading';
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
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;

  const onImageAdd = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

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
        '/api/employee?select=companyName,empNo,fullName,nameHRIS,fatherName,upload,photo',
        config
      );

      const { data } = result.data;
      console.log(data);
      setFormData({ ...data });
      if (data && data.photo && data.photo !== '')
        setImages([
          {
            data_url: result.data.data.photo,
            file: { name: 'photo.jpg' },
          },
        ]);
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    let postParams = {};
    const formFieldData = {
      companyName,
      empNo,
      fullName,
      nameHRIS,
      fatherName,
      upload,
    };
    if (images.length !== 0)
      postParams = { ...formFieldData, photo: images[0]['data_url'] };
    else postParams = { ...formFieldData, photo: '' };
    try {
      const body = JSON.stringify({
        postParams,
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

                  <label className='col-sm-3 col-form-label'>
                    <span style={{ color: 'red' }}>*</span> Passport Sized Photo
                </label>

                  <ImageUploading
                    multiple
                    value={images}
                    onChange={onImageAdd}
                    maxNumber={maxNumber}
                    dataURLKey='data_url'
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                        <div className='upload__image-wrapper'>
                          {images.length === 0 ? (
                            <div
                              className='btn selected-crumb'
                              style={isDragging ? { color: 'red' } : undefined}
                              onClick={async () => {
                                onImageUpload();
                              }}
                              {...dragProps}
                            >
                              Click or Drop here
                            </div>
                          ) : (
                              <div />
                            )}
                      &nbsp;
                          {imageList.map((image, index) => (
                            <div key={index} className='row ml-5'>
                              <img src={image['data_url']} alt='' width='100' />
                              <div className='ml-5 col'>
                                <div className='row mb-5'>
                                  <div
                                    className='btn selected-crumb'
                                    onClick={() => onImageUpdate(index)}
                                  >
                                    Update
                              </div>
                                </div>
                                <div className='row'>
                                  <div
                                    className='btn selected-crumb'
                                    onClick={() => onImageRemove(index)}
                                  >
                                    Remove
                              </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                  </ImageUploading>

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

export default BasicInformation1;
