import React, { useEffect, useMemo, useState } from 'react';
import { HeroContainer, MainHeader, MainPara } from './hero.styles';
import Card from '../card/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card3 from '../card/Card3';
import CustomModal from '../modal/CustomModal';

function Hero(...props) {
  const [userData, setUserData] = useState({ name: 'User', photo: '' });
  useEffect(() => {
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
                Hi {`${userData.name}`},<br />{' '}
                <span>
                  Welcome to <b>Future World</b>.
                </span>
              </MainHeader>
              <MainPara className='col-12'>
                {(() => {
                  if (userData.isFormComplete) {
                    return (
                      <div className='col'>
                        {
                          Object.entries({ Department: userData.department, Designation: userData.designation, 'Joining Date': userData.joiningDate, 'FWID': userData.empNo }).map(([key, value]) => (
                            <div> <b style={{ fontSize: 22 }}>{key.toString()}:&nbsp;&nbsp;</b><span className=''>{value.toString()} </span> </div>
                          ))
                        }
                        <br />
                        <br />
                      </div>
                    );
                  }
                  else {
                    return (
                      <div>
                        Please fill in your on-boarding application form.
                        <br />
                We are delighted to have you here
                      </div>)
                  }
                })()}
              </MainPara>
              <div className='col-12'>
                <Card3
                  className='mt-5'
                  title='Payslips and Time Sheet'
                  subTitle='Click view to download Payslip or view Timesheet'
                />
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className='col-lg-6 order-1 order-lg-2'>
            <div className='mt-2 mb-3'>
              {/* <button
                type='submit'
                className='btn selected-crumb submit-button crumb-item w-100 font-weight-bold'
              >
                <i className='far fa-check-circle'></i> Submmit Application
              </button> */}
              <CustomModal />
            </div>
            <div
              style={{
                width: 600,
                height: 820,
              }}
            >
              <div className='d-flex flex-column'>
                <div className='hero-row d-flex flex-row justify-content-around'>
                  <Link className='link' to={{ pathname: '/personal' }}>
                    <Card
                      title='Personal Information'
                      sectionNames={[
                        'TBasicInformation1',
                        'TBasicInformation2',
                        'TDesignationInformation',
                        'TDocumentalInformation',
                        'TAddressInformation',
                        'TLanguageInformation',
                      ]}
                    ></Card>
                  </Link>
                  <Link className='link' to={{ pathname: '/work' }}>
                    <Card
                      title='Academic Information'
                      sectionNames={[
                        'TWorkInformation',
                        'TAcademicInformation',
                      ]}
                    ></Card>
                  </Link>
                </div>
                <div className='hero-row d-flex flex-row justify-content-around '>
                  <Link className='link' to={{ pathname: '/health' }}>
                    <Card
                      title='Health & Family'
                      sectionNames={[
                        'THealthInformation',
                        'TFamilyInformation',
                      ]}
                    ></Card>
                  </Link>
                  <Link className='link' to={{ pathname: '/other' }}>
                    <Card
                      title='Other Information'
                      sectionNames={['TOtherInformation', 'TUploadInformation']}
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
