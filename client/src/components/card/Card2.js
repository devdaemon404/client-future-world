import React from 'react';
import { Card2Header, Card2Container } from './card.styles';
import ProgressBar from '../progress-bar/Progress';
import { Link } from 'react-router-dom';

const Card = ({ title, subTitle, iconClass, percentage, list, pathname }) => {
  return (
    <Card2Container className='card h-100 w-100'>
      <div className='row no-gutters'>
        <div className='col-md-12 col-lg-12'>
          <div className='row'>
            <div className='col-md-6 d-flex align-items-center justify-content-center mt-3'>
              <Card2Header>{title}</Card2Header>
            </div>
            <div className='col-md-6'>
              <ProgressBar iconClass={iconClass} percentage={percentage} />
              <div className='text-center'>
                <p>
                  <em>{subTitle}</em>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-12 col-lg-12'>
          <div className='card-body'>
            <ul className='list-group'>
              {/* <Link to='/form' className='form-link'><li className="list-group-item">Contact Information</li></Link>
              <Link to='/form' className='form-link'><li className="list-group-item">Address Information</li></Link>
              <Link to='/form' className='form-link'><li className="list-group-item">Family Members Information </li></Link>
              <Link to='/form' className='form-link'><li className="list-group-item">Language Information </li></Link> */}
              <div>
                {list.map((item, index) => (
                  <Link
                    key={index}
                    // to={`personal/${pathname[index]}`}
                    to={{
                      pathname: `information/${pathname[index]}`,
                    }}
                    // className='form-link'
                    // list={list} pathname={pathname} subTitle={subTitle} title={title} iconClass={iconClass} percentage={percentage}
                  >
                    <li 
                    // className='list-group-item'
                    >{item}</li>
                  </Link>
                ))}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </Card2Container>
  );
};

export default Card;
