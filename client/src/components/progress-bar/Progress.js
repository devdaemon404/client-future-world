import React from 'react';
import './progress.styles.scss';

const Progress = ({iconClass, percentage}) => {
  return (
    <div class="container p-5">
      <div class="progress" data-percentage={percentage}>
        <span class="progress-left">
          <span class="progress-bar"></span>
        </span>
        <span class="progress-right">
          <span class="progress-bar"></span>
        </span>
        <div class="progress-value">
          <div>
            <span><i className={iconClass}></i></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Progress;
