import React, { useMemo, useState } from 'react';
import InpForm from './InpForm';
import { Button } from 'react-bootstrap';
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
import moment from 'moment';
import PHONE from '../../assets/img/phone.png';

const Profilepage = ({ retrievedId }) => {
  const [userData, setUserData] = useState({});
  const [toggle, setToggle] = useState(true);

  const [view, setview] = useState('data');
  let temp;

  const getUserData = async () => {
    temp = await axios.get(
      `/api/admin/employee-info/${retrievedId}?select=FName,LName,email,joiningDate,designation,phoneNumber,Address,FWEmail,Manager,CustLocation,CustName,BillingPH,annualCTC,increment,lwd,comments`
    );
    temp = temp.data.data;
    if (!temp) temp = {};
    setUserData({ ...temp });
    console.log(temp);
  };
  const downloadFile = () => {
    window.open(`/api/ejs/pdf-gen?employeeId=${retrievedId}`);
  };
  useMemo(() => {
    {
      getUserData();
    }
  }, [toggle]);

  return (
    <ProfContainer>
      <LeftCol>
        <DisplayPic>
          <img alt='User Image Not uploaded' width={220} src={userData.photo} />
        </DisplayPic>
        <SidebarDetails>
          <div className='join-and-end'>
            <p>
              <img alt='altey' src={PHONE} />
              <span className='sidebar-item'> {userData.phoneNumber}</span>
            </p>
            <p>
              <span>
                Date Of Joining ::{' '}
                {moment(userData.joiningDate).format('DD/MM/YYYY')}{' '}
              </span>
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
            <div
              style={{
                display: 'flex',
                width: 800,
                justifyContent: 'space-between',
              }}
            >
              {' '}
              <h2>{userData.FName + ' ' + userData.LName}</h2>{' '}
              <Button onClick={downloadFile}>Download User Information</Button>{' '}
            </div>
            <h3>{userData.designation}</h3>
            <h3>
              <div id='Address'>
                <img alt='altey' src={GPS} />
                {userData.Address}
              </div>
            </h3>
          </div>

          <NavSection>
            <span
              style={
                view === 'data'
                  ? { textDecoration: 'underline solid blue' }
                  : {}
              }
              onClick={(e) => setview('data')}
            >
              About
            </span>{' '}
            <span
              style={
                view !== 'data'
                  ? { textDecoration: 'underline solid blue' }
                  : {}
              }
              onClick={(e) => setview('upload')}
            >
              Documents
            </span>
          </NavSection>
          <BodySection>
            {view === 'data' ? (
              <InpForm
                userData={userData}
                retrievedId={retrievedId}
                toggle={toggle}
                setToggle={setToggle}
              />
            ) : (
              <></>
            )}
          </BodySection>
        </NameSection>
      </RightCol>
    </ProfContainer>
  );

  const notMain = (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    ></div>
  );
};
export default Profilepage;
