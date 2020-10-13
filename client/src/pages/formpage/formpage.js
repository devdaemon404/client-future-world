import React from 'react';
import { Container, HeroContainer, MainHeader, MainPara, CardHeader, CardPara } from './formpage.styles';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';

const formpage = () => {
  return (
    <Container>
      <Header />
      <HeroContainer className='box d-flex align-items-center'>
        <MainHeader>Personal Information</MainHeader>
      </HeroContainer>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 order-1 order-lg-1 d-flex flex-column justify-content-start mt-5'>
            <div className='d-flex justify-content-center'>
              <div className='progress-circle p50'>
                <span>
                  <i className='fas fa-address-card'></i>
                </span>
                <div className='left-half-clipper'>
                  <div className='first50-bar'></div>
                  <div className='value-bar'></div>
                </div>
                <span>

                </span>
              </div>
            </div>
            <p className='text-muted text-center'><em>5/10 sections completed</em></p>
          </div>
          <div className='col-lg-8 order-1 order-lg-2 d-flex flex-column justify-content-start mt-5'>
            <div><p>Enter your contact information in this section. Keep this information up-to-date throughout the application process.</p></div>
            <div><p>You can edit this section after you submit your application.</p></div>
            <div><p><span style={{ color: 'red' }}>*</span>{' '}Indicates required field</p></div>

            <div className='container-fluid mt-5'>
              <h2>Current Address</h2>
              <hr></hr>
              <form className='mt-2 text-left'>
                <div className="form-group row p-2">
                  <label for="" className="col-sm-3 col-form-label"><span style={{ color: 'red' }}>*</span>{' '}Street Address</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" id="" value="" placeholder="" />
                  </div>
                </div>
                <div className="form-group row p-2">
                  <label for="" className="col-sm-3 col-form-label"><span style={{ color: 'red' }}>*</span>{' '}City</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" id="" value="" placeholder="" />
                  </div>
                </div>
                <div className="form-group row p-2">
                  <label for="" className="col-sm-3 col-form-label"><span style={{ color: 'red' }}>*</span>{' '}Country / Territory</label>
                  <div className="col-sm-9">
                    <select id="country" name="country" className="custom-select mr-sm-2">
                      <option selected>Choose the country you currently staying in...</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
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

export default formpage;
