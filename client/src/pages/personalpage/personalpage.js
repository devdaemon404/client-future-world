import React from 'react';
import Body from '../../components/hero/Hero2'
import Header from '../../components/header/Header';
import {Container} from './personalpage.styles';



function personalpage() {
  return (
    <Container>
      <Header />
      <Body />
    </Container>
  );
}

export default personalpage;