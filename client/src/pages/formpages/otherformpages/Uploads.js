import React from 'react';
import {
  Container,
  HeroContainer,
  MainHeader,
  //  MainPara, CardHeader, CardPara
} from '../formpage.styles.js';
// import { Link } from 'react-router-dom';
import Header from '../../../components/header/Header';
import FormPageComponent from '../../../components/form/FormPageComponent';
import OPBreadCrumb from '../../../components/form/OPBreadCrumb';
import axios from 'axios';
import { toast } from '../../../util/ToastUtil.js';
import { config } from '../../../util/RequestUtil';

const Uploads = () => {
  const onFileChange = async (e) => {
    const { files, name } = e.target;
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post(
      '/api/file/upload-url',
      {
        fileName: name,
        fileType: 'doc',
        fileExtension: 'pdf',
      },
      config
    );
    const { fileKey, url } = res.data;
    const res2 = await axios.put(url, formData);
    if (res2.status === 200) {
      await axios.post(
        '/api/employee',
        {
          postParams: {
            name: fileKey,
          },
        },
        config
      );
      console.log('Uploaded successfully');
      toast(`File uploaded successfully`);
    }
  };
  return (
    <Container>
      <Header pathname='/other' />
      <HeroContainer className='box d-flex align-items-center justify-content-center'>
        <MainHeader className='text-center'>
          Uploads and Other Information
        </MainHeader>
      </HeroContainer>
      <div className=''>
        <FormPageComponent>
          <div className='container-fluid mt-5'>
            {/* <h2>Current Address</h2> */}
            <OPBreadCrumb
              crumbs={[
                {
                  link: '/information/otherInformation',
                  label: 'Other Information',
                },
                {
                  link: '/information/uploads',
                  label: 'Uploading Documents',
                },
              ]}
              activeIndex={1}
            />
            <hr></hr>
            <form className='mt-2 text-left'>
              <p>Files once uploaded, need not be uploaded again</p>
              <div className='form-row p-2'>
                <div className='col-sm-12 col-lg-6 col-md-6 p-2'>
                  <label>
                    <h3>Optional Uploads</h3>
                  </label>
                  {[
                    {
                      label: 'Bio Data',
                      name: 'bioDataForm',
                    },
                    {
                      label: 'Joining Report / Company Application Form',
                      name: 'joiningReportU',
                    },
                    {
                      label: 'Mediclaim Declaration',
                      name: 'mediclaimDeclarationU',
                    },
                  ].map((form, i) => (
                    <div key={i} className='form-group p-3'>
                      <label>
                        <h5>{form.label}</h5>
                      </label>
                      <input
                        type='file'
                        name={form.name}
                        onChange={onFileChange}
                        className='form-control-file'
                        id='exampleFormControlFile1'
                        accept='application/pdf'
                      />
                    </div>
                  ))}
                </div>

                <div className='col-sm-12 col-lg-6 col-md-6 p-2'>
                  <label>
                    {' '}
                    <h3></h3>
                  </label>
                  {[
                    {
                      label: 'PF Nomination Form',
                      name: 'pfNominationU',
                    },
                    {
                      label: 'ESI Nomination Form',
                      name: 'esiNominationU',
                    },
                    {
                      label: 'Gratuity Nomination Form',
                      name: 'gratuityNominationU',
                    },
                    // {
                    //   label: 'Other Document',
                    //   name: 'otherDocsU',
                    // },
                  ].map((form, i) => (
                    <div key={i} className='form-group p-3'>
                      <label>
                        <h5>{form.label}</h5>
                      </label>
                      <input
                        type='file'
                        name={form.name}
                        onChange={onFileChange}
                        className='form-control-file'
                        id='exampleFormControlFile1'
                        accept='application/pdf'
                      />
                    </div>
                  ))}
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
          </div>
        </FormPageComponent>
      </div>
    </Container>
  );
};

export default Uploads;
