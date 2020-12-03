import React, { useEffect, useState } from 'react';
import { HeroContainer, MainHeader, MainPara } from './hero.styles';
import Card from '../card/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card3 from '../card/Card3';
import CustomModal from '../modal/CustomModal';
import Job from '../featured-jobs/Job';

function Hero(...props) {
  const [userData, setUserData] = useState({ name: 'User', photo: '' });
  const [featuredJobs, setFeaturedJobs] = useState();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await axios.get('/api/employee');
        setUserData({ ...result.data.data });
      } catch (e) {}
    };
    const fetchJobsData = async () => {
      try {
        const res = await axios.get('/api/job-posting');
        setFeaturedJobs(res.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUserData();
    fetchJobsData();
  }, []);

  // console.log(featuredJobs);

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
                        {Object.entries({
                          Department: userData?.department ?? 'N/A',
                          Designation: userData?.designation ?? 'N/A',
                          'Joining Date': userData?.joiningDate ?? 'N/A',
                          FWID: userData?.empNo ?? 'N/A',
                        }).map(([key, value], index) => (
                          <div key={index}>
                            {' '}
                            <b style={{ fontSize: 22 }}>
                              {key.toString()}:&nbsp;&nbsp;
                            </b>
                            <span className=''>{value.toString()} </span>{' '}
                          </div>
                        ))}
                        <br />
                        <br />
                      </div>
                    );
                  } else {
                    return (
                      <div>
                        Fill in your on-boarding application form and please
                        submit it.
                        <br />
                        using the "Submit Application" button
                        <br />
                        <br />
                        We are delighted to have you here
                        <br />
                        <br />
                      </div>
                    );
                  }
                })()}
              </MainPara>
              <div className='col-12'>
                <Card3
                  className='mt-5'
                  title='Pay Slips, Time Sheets and Reimbursements'
                  subTitle='Click view to download Pay Slips and Time Sheets. Upload Reimbursements'
                />
              </div>
            </div>
          </div>
          <br />
          <br />
          {/* <div className='col-lg-6 order-1 order-lg-2'>
            <div className='mt-2 mb-3'>
              
              <CustomModal />
            </div>
            <div
              style={{
                width: 600,
                height: 820,
              }}>
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
                      ]}></Card>
                  </Link>
                  <Link className='link' to={{ pathname: '/work' }}>
                    <Card
                      title='Academic Information'
                      sectionNames={[
                        'TWorkInformation',
                        'TAcademicInformation',
                      ]}></Card>
                  </Link>
                </div>
                <div className='hero-row d-flex flex-row justify-content-around '>
                  <Link className='link' to={{ pathname: '/health' }}>
                    <Card
                      title='Health & Family'
                      sectionNames={[
                        'THealthInformation',
                        'TFamilyInformation',
                      ]}></Card>
                  </Link>
                  <Link className='link' to={{ pathname: '/other' }}>
                    <Card
                      title='Other Information'
                      sectionNames={[
                        'TOtherInformation',
                        'TUploadInformation',
                      ]}></Card>
                  </Link>
                </div>
              </div>
            </div>
          </div> */}
          <div className='col-lg-6 order-1 order-lg-2'>
            <div
              class='card'
              style={{ padding: '20px', background: '#FEFEFE' }}>
              <h3 className='font-weight-bold mb-3'>Featured Jobs</h3>

              {featuredJobs?.map((data) => (
                <div class='card mb-3' style={{ border: 'none' }}>
                  <Job {...data} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </HeroContainer>
  );
}

export default Hero;
