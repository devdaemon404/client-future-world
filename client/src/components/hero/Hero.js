import React, { useMemo, useState } from 'react';
import { HeroContainer, MainHeader, MainPara } from './hero.styles';
import Card from '../card/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Hero(...props) {
  const [userData, setUserData] = useState({ name: 'User', photo: '' });
  useMemo(() => {
    const fetchUserData = async () => {
      const result = await axios.get('/api/employee');
      setUserData({ ...result.data.data });
    };
    fetchUserData();
  }, []);
  return (
    <HeroContainer className='box d-flex align-items-center'>
      <div className=''>
        <div className='row'>
          <div className='col-lg-5 order-1 order-lg-1 d-flex flex-column justify-content-start'>
            <div className='row'>
              <div className='col-3'>
                <img className='img-fluid' src={userData.photo} />
              </div>
              <MainHeader className='col'>
                <span>
                  Welcome to <br />
                  Future World{' '}
                </span>
                <br />
                {`${userData.name}`}
              </MainHeader>
            </div>
            <MainPara>
              Welcome to <b>Future World</b>. Please fill in your on-boarding
              application form. We are delighted to have you here
            </MainPara>
          </div>
          <hr></hr>
          <hr></hr>
          <div className='col-lg-7 order-1 order-lg-2'>
            <div
              style={{
                width: 600,
                height: 1000,
              }}
            >
              <div className='d-flex flex-column'>
                <div className='hero-row d-flex flex-row justify-content-around'>
                  <Link className='link' to={{ pathname: '/personal' }}>
                    <Card
                      title='Personal Information'
                      subTitle='2/4 Sections Completed'
                      iconClass='fas fa-address-card fa-2x'
                      percentage='50'
                    ></Card>
                  </Link>
                  <Link className='link' to={{ pathname: '/work' }}>
                    <Card
                      title='Academic Information'
                      subTitle='3/4 Sections Completed'
                      iconClass='fas fa-user-graduate fa-2x'
                      percentage='75'
                    ></Card>
                  </Link>
                </div>
                <div className='hero-row d-flex flex-row justify-content-around '>
                  <Link className='link' to={{ pathname: '/health' }}>
                    <Card
                      title='Health & Family'
                      subTitle='4/4 Sections Completed'
                      iconClass='fas fa-briefcase-medical fa-2x'
                      percentage='10'
                    ></Card>
                  </Link>
                  <Link className='link' to={{ pathname: '/other' }}>
                    <Card
                      title='Other Information'
                      subTitle='4/4 Sections Completed'
                      iconClass='fas fa-clipboard fa-2x'
                      percentage='100'
                    ></Card>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroContainer>
  );
}

export default Hero;
