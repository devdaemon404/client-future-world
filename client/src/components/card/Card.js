import React from 'react';
import { CardHeader, CardContainer } from './card.styles';
// import '../../index.css';
import ProgressBar from '../progress-bar/Progress';
// import { Link } from 'react-router-dom';

const Card = ({ title, subTitle, iconClass, percentage }) => {
  return (
    <CardContainer className='card h-100'>
      <div className='card-body'>
        <CardHeader>{title}</CardHeader>
        <div className='d-flex justify-content-center'>
          <ProgressBar iconClass={iconClass} percentage={percentage} />
        </div>
        <div className='text-center'>
          <p><em>{subTitle}</em></p>
        </div>
      </div>
    </CardContainer>
  );
};

export default Card;
