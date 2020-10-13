import React from 'react';
import { Card2Header, Card2Container } from './card.styles';
import ProgressBar from '../progress-bar/Progress';
import { Link } from 'react-router-dom';

const Card = ({ title, subTitle, iconClass, percentage }) => {
  return (
    <Card2Container className='card h-100 w-100'>
      <div class="row no-gutters">
        <div class="col-md-4 col-lg-12">
          <div className='row'>
            <div className='col-md-6'>
              <ProgressBar iconClass={iconClass}
                percentage={percentage}
              />
              <div className='text-center'>
                <p><em>{subTitle}</em></p>
              </div>
            </div>
            <div className='col-md-6 d-flex align-items-center'>
              <Card2Header>{title}</Card2Header>
  
            </div>
          </div>
        </div>
        <div class="col-md-8 col-lg-12">
          <div class="card-body">
            <ul class="list-group list-group-flush text-center">
              <Link to='/form' className='form-link'><li class="list-group-item">Contact Information <i class="fas fa-caret-right fa-md"></i></li></Link>
              <Link to='/form' className='form-link'><li class="list-group-item">Address Information <i class="fas fa-caret-right fa-md"></i></li></Link>
              <Link to='/form' className='form-link'><li class="list-group-item">Family Members Information <i class="fas fa-caret-right fa-md"></i></li></Link>
              <Link to='/form' className='form-link'><li class="list-group-item">Language Information <i class="fas fa-caret-right fa-md"></i></li></Link>
            </ul>
          </div>
        </div>
      </div>
    </Card2Container>
  );
};

export default Card;