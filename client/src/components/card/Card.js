import React from 'react';
import {CardHeader, CardContainer} from './card.styles';

const Card = ({ title, subTitle,iconClass}) => {
  return (
    <CardContainer className='card h-100'>
      <div className='card-body'>
        <CardHeader>{title}</CardHeader>
        <div className='d-flex justify-content-center'>
          <div className='progress-circle p50'>
            <span>
              <i className={iconClass}></i>
            </span>
            <div className='left-half-clipper'>
              <div className='first50-bar'></div>
              <div className='value-bar'></div>
            </div>
          </div>
        </div>
        <div className='text-center'>
          <p><em>{subTitle}</em></p>
        </div>
      </div>
    </CardContainer>
  );
};

export default Card;
