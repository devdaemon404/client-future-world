import React, { Fragment } from 'react';
import { HomeContainer } from './homepage.styles';
import Header from '../../components/header/Header';
import Hero from '../../components/hero/Hero';
import { MainWrapper, NotPhone } from '../adminpage/AdminPage.styles';
import Gears from './../../assets/img/gears.gif';

const Homepage = () => {
  // const [data, setData] = useState([{
  //   data: [
  //     {
  //       title: 'Personal Information',
  //       subTitle: '2/4 Sections Completed',
  //       iconClass: 'fas fa-address-card fa-2x',
  //       percentage: '50',
  //       subForm: [
  //         'Basic Information',
  //         'Personal Information',
  //         'Designation Information',
  //         'Documental Information',
  //         'Address Information',
  //         'Language Information'
  //       ]
  //     },
  //     {
  //       title: 'Academic and Work Information',
  //       subTitle: '2/4 Sections Completed',
  //       iconClass: 'fas fa-address-card fa-2x',
  //       percentage: '50',
  //       subForm: [
  //         'Basic Information',
  //         'Personal Information',
  //         'Designation Information',
  //         'Documental Information',
  //         'Address Information',
  //         'Language Information'
  //       ]
  //     },
  //     {
  //       title: 'Health Information',
  //       subTitle: '2/4 Sections Completed',
  //       iconClass: 'fas fa-address-card fa-2x',
  //       percentage: '50',
  //       subForm: [
  //         'Basic Information',
  //         'Personal Information',
  //         'Designation Information',
  //         'Documental Information',
  //         'Address Information',
  //         'Language Information'
  //       ]
  //     }
  //   ]
  // }]);

  return (
    <Fragment>
      <MainWrapper>
        <HomeContainer>
          <Header pathname='/' />
          <Hero />
        </HomeContainer>
      </MainWrapper>
      <NotPhone>
        <div className='NotPhone-Main'>
          <h2>Future World</h2>
          <div className='ErrorContainer'>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={Gears} className='gears' alt='Loading...' />
            </div>
            <br />
            <p className='PhoneError'>Sorry, We Don't Support Mobile View</p>
            <p className='PhoneError'> Please Switch to a Desktop</p>
          </div>
        </div>
      </NotPhone>
    </Fragment>
  );
};

export default Homepage;
