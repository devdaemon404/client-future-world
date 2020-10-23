import React, { useEffect, useState } from 'react';
import InpForm from './InpForm';
import {
  LeftCol,
  RightCol,
  ProfContainer,
  DisplayPic,
  SidebarDetails,
  NameSection,
  NavSection,
  BodySection,
} from './ProfilePage.styles';
import axios from 'axios';
import GPS from '../../assets/img/placeholder.png';
import HOME from '../../assets/img/home.png';
import PHONE from '../../assets/img/phone.png';
import dp from '../../assets/img/dp.png';
const Profilepage = ({ userId }) => {
  const [userData, setUserData] = useState([]);
  const temp = {};

  const getUserData = async () => {
    temp = await axios.put('/api/admin/register', {
      employeeId: userId,
      updateParams: {},
    });

    setUserData(temp);
    console.log(userData);
  };

  useEffect(() => {
    {
      getUserData();
    }
  }, []);

  return (
    <ProfContainer>
      <LeftCol>
        <DisplayPic>
          <img alt='displayPic' width={220} src={dp} />
        </DisplayPic>
        <SidebarDetails>
          <div className='join-and-end'>
            <p>
              <img alt='altey' src={HOME} />
              <span className='sidebar-item'> {userId}</span>
            </p>
            <p>
              <img alt='altey' src={PHONE} />
              <span className='sidebar-item'> 1234567890</span>
            </p>
            <p>
              <span>HUMAN RESOURCES</span>
            </p>
            <p>
              <span> Full Time</span>
            </p>
          </div>
        </SidebarDetails>
      </LeftCol>
      <RightCol>
        <NameSection>
          <div className='Head'>
            <h2>Ankit Sethi</h2>
            <h3>Senior UI/UX Designer </h3>
            <h3>
              <div id='Address'>
                <img alt='altey' src={GPS} /> Bangalore, KA
              </div>
            </h3>
          </div>

          <NavSection>
            <span>About</span> <span>Documents</span>
          </NavSection>
          <BodySection>
            <InpForm />
          </BodySection>
        </NameSection>
      </RightCol>
    </ProfContainer>
  );
};
export default Profilepage;
