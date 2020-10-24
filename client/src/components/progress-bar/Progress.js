import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Progress = ({ iconClass, percentage }) => {
  return (
    <div className='container p-5 '>
      <CircularProgressbar
        value={percentage}
        strokeWidth={12}
        text={`${percentage}%`}
      >
        <img
          style={{ width: 40, marginTop: -5 }}
          src='https://i.imgur.com/b9NyUGm.png'
          alt='doge'
        />
        <div style={{ fontSize: 12, marginTop: -5, color: 'red' }}>
          <strong>66%</strong> mate
        </div>
      </CircularProgressbar>
    </div>
  );
};

export default Progress;
