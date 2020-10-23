import React, { useMemo, useState } from 'react';
import { HeroContainer, MainHeader, MainPara } from './hero.styles';
import Card from '../card/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card3 from '../card/Card3';

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
    <HeroContainer className='box flex align-items-center'>
      <div className=''>
        <div className='row'>
          <div className='col-lg-6 order-1 order-lg-1 justify-content-start mb-5'>
            <div className='row'>
              <div className='col-2'>
                <img
                  className='img-fluid'
                  src={userData.photo}
                  alt='user'
                  style={{ minWidth: '60px', minHeight: '60px' }}
                />
              </div>
              <MainHeader className='col-10'>
                <span>
                  Hi {`${userData.name}`},<br /> Welcome to <b>Future World</b>.
                </span>
              </MainHeader>
              <MainPara className='col-12'>
                Please fill in your on-boarding application form. We are
                delighted to have you here
              </MainPara>
              <div className='col-12'>
                <Card3
                  className='mt-5'
                  title='Pay Slip and Time Sheet'
                  subTitle='Click view to download Payslip or view Timesheet'
                />
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className='col-lg-6 order-1 order-lg-2'>
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
