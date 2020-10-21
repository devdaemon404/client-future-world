import React from 'react';
import {
  LeftCol,
  RightCol,
  ProfContainer,
  DisplayPic,
} from './ProfilePage.styles';
const Profilepage = () => {
  return (
    <ProfContainer>
      <LeftCol>
        <DisplayPic></DisplayPic>
      </LeftCol>
      <RightCol></RightCol>
    </ProfContainer>
  );
};
export default Profilepage;
