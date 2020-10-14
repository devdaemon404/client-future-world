import React from 'react';
import {HomeContainer} from './homepage.styles';
import Header from '../../components/header/Header';
import Hero from '../../components/hero/Hero';


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
    <HomeContainer>
      <Header pathname="/" />
      <Hero/>
    </HomeContainer>
  );
}

export default Homepage;
