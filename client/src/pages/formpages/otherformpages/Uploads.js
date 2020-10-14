import React from 'react';
import {
  Container, HeroContainer, MainHeader,
  //  MainPara, CardHeader, CardPara 
} from '../formpage.styles.js';
// import { Link } from 'react-router-dom';
import Header from '../../../components/header/Header';
import Progressbar from '../../../components/progress-bar/Progress';

const Uploads = () => {

  return (
    <Container>
      <Header pathname="/other" />
      <HeroContainer className='box d-flex align-items-center justify-content-center'>
        <MainHeader className='text-center'>Uploads and Other Information</MainHeader>
      </HeroContainer>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 order-1 order-lg-1 d-flex flex-column justify-content-start mt-3'>
            <div className='d-flex justify-content-center'>
              <Progressbar iconClass="fas fa-address-card fa-2x" percentage="50" />
            </div>
            <p className='text-muted text-center'><em>5/10 sections completed</em></p>
          </div>
          <div className='col-lg-8 order-1 order-lg-2 d-flex flex-column justify-content-start mt-5'>
            <div><p>Enter your contact information in this section. Keep this information up-to-date throughout the application process.</p></div>
            <div><p>You can edit this section after you submit your application.</p></div>
            <div><p><span style={{ color: 'red' }}>*</span>{' '}Indicates required field</p></div>

            <div className='container-fluid mt-5'>
              {/* <h2>Current Address</h2> */}
              <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                  <a className="nav-link" href="/information/otherInformation">Ohter Information</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="/uploads">Uploading Documents</a>
                </li>
              </ul>
              <hr></hr>
              <form className='mt-2 text-left'>

                <div className="form-row p-2">

                  <div className="col-sm-12 col-lg-6 col-md-6 p-2">
                    <label><h3>Upload (required)*</h3>
                    </label>
                    <div className="form-group p-3">
                      <label ><h5>10TH CLASS / SSC / SSLC</h5></label>
                      <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                    </div>
                    <div className="form-group p-3">
                      <label ><h5>INTER MEDIATE / PUC / 10+2 </h5></label>
                      <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                    </div>
                    <div className="form-group p-3">
                      <label ><h5>DEGREE Certificate</h5></label>
                      <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                    </div>
                    <div className="form-group p-3">
                      <label ><h5>PG DEGREE Certificate</h5></label>
                      <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                    </div>
                    <div className="form-group p-3">
                      <label ><h5>DIPLOMA / PG DIPLOMA Certificate </h5></label>
                      <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                    </div>
                    <div className="form-group p-3">
                      <label ><h5>PREVIOUS EXPERIENCE CERTIFICATE (S) &
                      RELIEVING LETTER (S)
                        </h5>
                      </label>
                      <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                    </div>

                  </div>

                  <div className="col-sm-12 col-lg-6 col-md-6 p-2">
                    <label>{' '}<h3>Upload (optional)</h3>
                    </label>
                    <div className="form-group p-3">
                      <label ><h5>BIO DATA</h5></label>
                      <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                    </div>
                    <div className="form-group p-3">
                      <label><h5>JOINING REPORT</h5></label>
                      <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                    </div>
                    <div className="form-group p-3">
                      <label><h5>PERSONAL / COMPANY APPLICATION FORM</h5></label>
                      <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                    </div>
                    <div className="form-group p-3">
                      <label><h5>MEDICLAIM DECLARATION </h5></label>
                      <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                    </div>
                    <div className="form-group p-3">
                      <label><h5>PF NOMINATION FORM</h5></label>
                      <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                    </div>
                    <div className="form-group p-3">
                      <label><h5>ESI NOMINATION FORM
                        </h5>
                      </label>
                      <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                    </div>
                    <div className="form-group p-3">
                      <label><h5>GRATUITY NOMINATION FORM</h5></label>
                      <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                    </div>
                    <div className="form-group p-3">
                      <label><h5>ANY OTHER DOCUMENTS</h5></label>
                      <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                    </div>
                  </div>
                </div>

                <div className="form-group row p-2 d-flex justify-content-center mt-4 mb-5">
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary w-100 font-weight-bold"><i className="far fa-check-circle"></i>{' '}Save and Continue</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </Container>
  )
}

export default Uploads;