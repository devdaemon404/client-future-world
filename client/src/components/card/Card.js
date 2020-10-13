import React from 'react';
import { CardHeader, CardContainer } from './card.styles';
// import '../../index.css';
import ProgressBar from '../progress-bar/Progress';
import { Link } from 'react-router-dom';

const Card = ({ title, subTitle, iconClass, percentage }) => {
  return (
    <CardContainer className='card h-100 w-100'>
      <div className='card-body'>
        <CardHeader>{title}</CardHeader>
        <div class='d-flex justify-content-center'>
          <ProgressBar iconClass={iconClass} percentage={percentage} />
        </div>
        <div className='text-center'>
          <p><em>{subTitle}</em></p>
        </div>
      
                 
                
                      {/* <ul class="list-group list-group-flush text-center">
                      <Link to='/form' className='form-link'><li class="list-group-item">Contact Information <i class="fas fa-caret-right fa-md"></i></li></Link>
                      <Link to='/form' className='form-link'><li class="list-group-item">Address Information <i class="fas fa-caret-right fa-md"></i></li></Link>
                      <Link to='/form' className='form-link'><li class="list-group-item">Family Members Information <i class="fas fa-caret-right fa-md"></i></li></Link>
                      <Link to='/form' className='form-link'><li class="list-group-item">Language Information <i class="fas fa-caret-right fa-md"></i></li></Link>
                      </ul> */}
                    
                  </div>
      
    </CardContainer>
  );
};

export default Card;
