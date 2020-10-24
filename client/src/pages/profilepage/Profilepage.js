import React, { useEffect, useMemo, useState } from 'react';
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
import IMGDEFAULT from '../../assets/img/imgplaceholder.png';
import { Form, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import GPS from '../../assets/img/placeholder.png';
import moment from 'moment';
import PHONE from '../../assets/img/phone.png';
import { uploadFinancialDocument } from '../../util/UploadFile';
import { DatePicker, Space } from 'antd';
import { toast } from '../../util/ToastUtil';
import { OPLoader } from '../../util/LoaderUtil';
const Profilepage = ({ retrievedId }) => {
  const [userData, setUserData] = useState({});
  const [pSlipDate, setPSlipDate] = useState('end');
  const [tSheetDate, setTSheetDate] = useState('end');
  const [toggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(1);
  const [view, setview] = useState('data');
  let temp;

  const paySlipMonthUpdater = (date, dateString) => {
    setPSlipDate(dateString);
  };

  useEffect(() => {
    try {
      var body = document.documentElement;

      body.scrollTop -= 10000;
    } catch (error) {}
  }, [loading]);
  const timeSheetMonthUpdater = (date, dateString) => {
    setTSheetDate(dateString);
  };

  const getUserData = async () => {
    temp = await axios.get(
      `/api/admin/employee-info/${retrievedId}?select=FName,photo,LName,email,joiningDate,designation,phoneNumber,Address,FWEmail,Manager,custLoc,custName,BillingPH,annualCTC,increment,lwd,comments`
    );
    temp = temp.data.data;
    if (!temp) temp = {};
    setUserData({ ...temp });
    setLoading(0);
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

    if (pSlipDate !== 'end') {
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
      setPSlipDate('end');
    } else {
      toast('Please Select Pay Slip Month');
    }
  };
  const onUploadHandler2 = async (e) => {
    let file = e.target.files;
    let time = tSheetDate.split('-');
    if (tSheetDate === 'end') {
      toast('Please Select Time Sheet Month');
    } else if (tSheetDate !== 'end') {
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
      setTSheetDate('end');
    }
  };
  return (
    <React.Fragment>
      {loading ? (
        <OPLoader isLoading={loading} />
      ) : (
        <ProfContainer>
          <LeftCol>
            <DisplayPic>
              <img
                alt='User Image Not uploaded'
                width={220}
                src={userData.photo || IMGDEFAULT}
              />
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
                            value={
                              pSlipDate === 'end' || pSlipDate.trim() === ''
                                ? undefined
                                : moment(pSlipDate, 'YYYY-MM')
                            }
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
                          disabled={
                            pSlipDate === 'end' || pSlipDate.trim() === ''
                          }
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
                            value={
                              tSheetDate === 'end' || pSlipDate.trim() === ''
                                ? undefined
                                : moment(pSlipDate, 'YYYY-MM')
                            }
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
                          disabled={
                            tSheetDate === 'end' || pSlipDate.trim() === ''
                          }
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
      )}
    </React.Fragment>
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
