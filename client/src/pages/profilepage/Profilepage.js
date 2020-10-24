import React, { useMemo, useState } from 'react';
import InpForm from './InpForm';
import {
  LeftCol,
  RightCol,
  ProfContainer,
  DisplayPic,
  SidebarDetails,
  NameSection,
  NavSection,
  DocumentUpload,
  UploadContainer,
  BodySection,
} from './ProfilePage.styles';
import axios from 'axios';
import { Form, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import GPS from '../../assets/img/placeholder.png';
import moment from 'moment';
import PHONE from '../../assets/img/phone.png';
import { uploadDocument, uploadFinancialDocument } from '../../util/UploadFile';
import { DatePicker, Space } from 'antd';

const Profilepage = ({ retrievedId }) => {
  const [userData, setUserData] = useState({});
  const [pSlipDate, setPSlipDate] = useState();
  const [tSheetDate, setTSheetDate] = useState();
  const [toggle, setToggle] = useState(true);
  const [pSlip, setPSlip] = useState({});
  const [tSheet, setTSheet] = useState({});

  const [view, setview] = useState('data');
  let temp;

  const paySlipMonthUpdater = (date, dateString) => {
    setPSlipDate(dateString);
  };

  const timeSheetMonthUpdater = (date, dateString) => {
    setTSheetDate(dateString);
  };

  const getUserData = async () => {
    temp = await axios.get(
      `/api/admin/employee-info/${retrievedId}?select=FName,photo,LName,email,joiningDate,designation,phoneNumber,Address,FWEmail,Manager,CustLocation,CustName,BillingPH,annualCTC,increment,lwd,comments`
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

  const onUploadHandler1 = async (e) => {
    let file = e.target.files[0];
    let time = pSlipDate.split('-');
    await uploadFinancialDocument(file, pSlipDate, {
      uploadUrl: '/api/file/financial-document',
      confirmationUrl: '/api/admin/register',

      userId: retrievedId,
      fileType: 'paySlip',
      date: {
        month: time[1],
        year: time[0],
      },
    });
  };
  const onUploadHandler2 = async (e) => {
    let file = e.target.files;
    let time = tSheetDate.split('-');
    await uploadFinancialDocument(file, tSheetDate, {
      uploadUrl: '/api/file/financial-document',
      confirmationUrl: '/api/admin/register',
      userId: retrievedId,
      fileType: 'timeSheet',
      date: {
        month: time[1],
        year: time[0],
      },
    });
  };
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
              <button
                onClick={downloadFile}
                style={{
                  outline: 'none',
                  background: 'inherit',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: 22,
                  color: '#707070',
                }}
              >
                ⤓ Download Profile
              </button>{' '}
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
              <React.Fragment>
                {/* <DocumentUpload>
                  <ReactDropZone />
                </DocumentUpload> */}

                <UploadContainer>
                  <div className='heading'>
                    <h4>Upload Payslip</h4>
                  </div>
                  <div className='select'>
                    <p>Select Month </p>{' '}
                    <Space direction='vertical'>
                      <DatePicker
                        onChange={paySlipMonthUpdater}
                        picker='month'
                      />
                    </Space>
                    <div
                      id='btn1'
                      onClick={(e) => {
                        document.getElementById('FileUpload1').click();
                      }}
                    >
                      {'Click To Upload'}
                    </div>
                    <input
                      type='file'
                      className='realupload'
                      id='FileUpload1'
                      style={{ opacity: 0 }}
                      onChange={onUploadHandler1}
                    />
                  </div>
                </UploadContainer>
                <UploadContainer>
                  <div className='heading'>
                    <h4>Upload Time Sheet</h4>
                  </div>
                  <div className='select'>
                    <p>Select Month </p>{' '}
                    <Space direction='vertical'>
                      <DatePicker
                        onChange={timeSheetMonthUpdater}
                        picker='month'
                      />
                    </Space>
                    <div
                      id='btn2'
                      onClick={(e) => {
                        document.getElementById('FileUpload2').click();
                      }}
                    >
                      {'Click To Upload'}
                    </div>
                    <input
                      type='file'
                      className='realupload'
                      id='FileUpload2'
                      style={{ opacity: 0, width: 0, height: 0 }}
                      onChange={onUploadHandler2}
                    />
                  </div>
                </UploadContainer>
              </React.Fragment>
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
