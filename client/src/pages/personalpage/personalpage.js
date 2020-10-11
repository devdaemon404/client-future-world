import React from 'react';
import { Container, HeroContainer, MainHeader, MainPara, CardHeader, CardPara } from './personalpage.styles';
import Header from '../../components/header/Header';
import { Link } from 'react-router-dom';



function personalpage() {
  return (
    <Container>
      <Header />
      <HeroContainer class='box d-flex align-items-center'>
        <div className='container'>
          <div className='row'>
            <div class='col-lg-5 order-1 order-lg-1 d-flex flex-column justify-content-start mt-5 mb-5'>
              <MainHeader>My Application</MainHeader>
              <MainPara>
                It is a long established fact that a reader will be distracted by
                the readable content of a page when looking at its layout.
            </MainPara>
            </div>
            <hr></hr>
            <hr></hr>
            <div class='col-lg-7 order-1 order-lg-2'>
              <div class="card h-100">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <div class='d-flex justify-content-center'>
                      <div class='progress-circle p50'>
                        <span>
                          <i class='fas fa-address-card'></i>
                        </span>
                        <div class='left-half-clipper'>
                          <div class='first50-bar'></div>
                          <div class='value-bar'></div>
                        </div>
                      </div>
                    </div>
                    <div className='text-center'>
                      <p><em>Sections 2/4 completed</em></p>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <CardHeader>Personal Information</CardHeader>
                      <ul class="list-group list-group-flush text-center">
                      <Link to='/form' className='form-link'><li class="list-group-item">Contact Information <i class="fas fa-caret-right fa-md"></i></li></Link>
                      <Link to='/form' className='form-link'><li class="list-group-item">Address Information <i class="fas fa-caret-right fa-md"></i></li></Link>
                      <Link to='/form' className='form-link'><li class="list-group-item">Family Members Information <i class="fas fa-caret-right fa-md"></i></li></Link>
                      <Link to='/form' className='form-link'><li class="list-group-item">Language Information <i class="fas fa-caret-right fa-md"></i></li></Link>
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