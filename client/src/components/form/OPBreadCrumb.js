import React from 'react';
import { Link } from 'react-router-dom';

const OPBreadCrumb = ({ crumbs, activeIndex = 0 }) => {
  return (
    <div>
      <ul className='nav nav-pills nav-fill'>
        {crumbs.map((crumb, index) => (
          <li className='nav-item' key={index}>
            <Link
              className={index === activeIndex ? 'nav-link active' : 'nav-link'}
              to={crumb.link}
            >
              {crumb.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OPBreadCrumb;
