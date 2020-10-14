import React from 'react';
import './progress.styles.scss';

const Progress = ({iconClass, percentage}) => {
  return (
    <div className="container p-5">
      <div className="progress" data-percentage={percentage}>
        <span className="progress-left">
          <span className="progress-bar"></span>
        </span>
        <span className="progress-right">
          <span className="progress-bar"></span>
        </span>
        <div className="progress-value">
          <div>
            <span><i className={iconClass}></i></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Progress;
