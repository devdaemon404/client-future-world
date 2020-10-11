import React from 'react';
import {HomeContainer} from './homepage.styles';
import Header from '../../components/header/Header';
import Body from '../../components/hero/Hero'


function homepage() {
  return (
    <HomeContainer>
      <Header />
      <Body />
    </HomeContainer>
  );
}

export default homepage;
