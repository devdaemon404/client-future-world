import React from 'react';
import './progress.styles.scss';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Progress = ({ iconClass, percentage }) => {
  return (
    <div className="container p-5">
      <CircularProgressbar value={percentage} strokeWidth={12}>
      </CircularProgressbar>
    </div>
  )
}

export default Progress;
