import React from 'react';
import { Container, HeroContainer, MainHeader, MainPara, CardHeader, CardPara } from './personalpage.styles';
import Header from '../../components/header/Header';
import { Link } from 'react-router-dom';



function personalpage() {
  return (
    <Container>
      <Header />
      <HeroContainer className='box d-flex align-items-center'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-5 order-1 order-lg-1 d-flex flex-column justify-content-start mt-5 mb-5'>
              <MainHeader>My Application</MainHeader>
              <MainPara>
                It is a long established fact that a reader will be distracted by
                the readable content of a page when looking at its layout.
            </MainPara>
            </div>
            <hr></hr>
            <hr></hr>
            <div className='col-lg-7 order-1 order-lg-2'>
              <div className="card h-100">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <div className='d-flex justify-content-center'>
                      <div className='progress-circle p50'>
                        <span>
                          <i className='fas fa-address-card'></i>
                        </span>
                        <div className='left-half-clipper'>
                          <div className='first50-bar'></div>
                          <div className='value-bar'></div>
                        </div>
                      </div>
                    </div>
                    <div className='text-center'>
                      <p><em>Sections 2/4 completed</em></p>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <CardHeader>Personal Information</CardHeader>
                      <ul className="list-group list-group-flush text-center">
                      <Link to='/form' className='form-link'><li className="list-group-item">Contact Information <i className="fas fa-caret-right fa-md"></i></li></Link>
                      <Link to='/form' className='form-link'><li className="list-group-item">Address Information <i className="fas fa-caret-right fa-md"></i></li></Link>
                      <Link to='/form' className='form-link'><li className="list-group-item">Family Members Information <i className="fas fa-caret-right fa-md"></i></li></Link>
                      <Link to='/form' className='form-link'><li className="list-group-item">Language Information <i className="fas fa-caret-right fa-md"></i></li></Link>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeroContainer>
    </Container>
  );
}

export default personalpage;