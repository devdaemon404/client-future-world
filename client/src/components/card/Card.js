import React from 'react';
import {CardHeader, CardContainer} from './card.styles';

const Card = ({ title, subTitle,iconClass}) => {
  return (
    <CardContainer className='card h-100'>
      <div className='card-body'>
        <CardHeader>{title}</CardHeader>
        <div class='d-flex justify-content-center'>
          <div class='progress-circle p50'>
            <span>
              <i class={iconClass}></i>
            </span>
            <div class='left-half-clipper'>
              <div class='first50-bar'></div>
              <div class='value-bar'></div>
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
