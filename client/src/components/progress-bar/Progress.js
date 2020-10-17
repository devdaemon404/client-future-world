import React from 'react';
import './progress.styles.scss';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Progress = ({ iconClass, percentage }) => {
  return (
    <div className='container p-5 '>
      <CircularProgressbar
        className='CircularProgressbar-trail'
        value={percentage}
        strokeWidth={12}
      >
        <i className={'fa ' + iconClass} />
      </CircularProgressbar>
    </div>
  );
};

export default Progress;
