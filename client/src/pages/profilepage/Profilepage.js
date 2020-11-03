import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
import axios from 'axios';

import InpForm from './InpForm';
import {
  LeftCol,
  RightCol,
  ProfContainer,
  DisplayPic,
  SidebarDetails,
  NameSection,
  NavSection,
  UploadContainer,
  BodySection,
  FormMain,
} from './ProfilePage.styles';
import IMGDEFAULT from '../../assets/img/imgplaceholder.png';

import GPS from '../../assets/img/placeholder.png';
import PHONE from '../../assets/img/phone.png';
import { uploadFinancialDocument } from '../../util/UploadFile';
import { toast } from '../../util/ToastUtil';
import { OPLoader } from '../../util/LoaderUtil';
const Profilepage = ({ retrievedId }) => {
  const [subAdminId, setSubAdminId] = useState();
  const [userData, setUserData] = useState({});
  const [pSlipDate, setPSlipDate] = useState('end');
  const [tSheetDate, setTSheetDate] = useState('end');

  const [toggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(1);
  const [view, setview] = useState('data');
  const [role, setRole] = useState('sub-admin');
  const [subAdmins, setSubAdminList] = useState([]);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [enabledDates, setEnabledDates] = useState([]);
  const [reimburseURL, setReimburseURL] = useState('');
  const checkLogin = async () => {
    try {
      const res = await axios.get('/api/auth/validate-token').then();
      setRole(res.data.role);
    } catch (err) {}
  };

  const addRepor = async (e) => {
    e.preventDefault();

    try {
      let reqqres = await axios.post('/api/admin/add-reportee', {
        reporteeId: subAdminId,
        userId: retrievedId,
      });
      toast(reqqres.data.message);
    } catch (error) {
      toast(error);
    }
  };

  let temp;

  const paySlipMonthUpdater = (date, dateString) => {
    setPSlipDate(dateString);
  };

  const getSubAdmins = async () => {
    try {
      let res = await axios.get('/api/admin/users?role=sub-admin');
      setSubAdminList(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPaySlips = async () => {
    try {
      let res = await axios.post('/api/admin/financial-documents', {
        userId: retrievedId,
        documentType: 'reimburse',
      });
      res = res.data.data;
      console.log(res);
      let temp = [];
      res.forEach((o) => {
        temp.push(`${o.documentedDate.year}-${o.documentedDate.month}`);
      });

      setEnabledDates([...temp]);
    } catch (error) {}
  };

  function disabledDate(current) {
    // Can not select days before today and today
    const formatted = current.format('YYYY-MM');

    return !enabledDates.includes(formatted);
  }

  useEffect(() => {
    try {
      checkLogin();
      getSubAdmins();
      var body = document.documentElement;

      body.scrollTop -= 10000;
    } catch (error) {}

    getAllPaySlips();

    //eslint-disable-next-line
  }, [loading]);

  const timeSheetMonthUpdater = (_, dateString) => {
    setTSheetDate(dateString);
  };

  const getUserData = async () => {
    temp = await axios.get(
      `/api/admin/employee-info/${retrievedId}?select=FName,increments,photo,isFormComplete,empNo,LName,email,joiningDate,designation,phoneNumber,Address,FWEmail,Manager,custLoc,custName,BillingPH,annualCTC,increment,lwd,comments`
    );
    temp = temp.data.data;
    if (!temp) temp = {};
    setUserData({ ...temp });
    setLoading(0);
  };

  const downloadFile = () => {
    window.open(`/api/ejs/pdf-gen?employeeId=${retrievedId}`);
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, [toggle]);
  const GetFileDownloaded = async (_, datestring) => {
    let a = datestring.split('-');
    let res = await axios.post('/api/admin/single-fin-doc', {
      userId: retrievedId,
      documentType: 'reimburse',
      documentedDate: {
        month: a[1],
        year: a[0],
      },
    });
    res = res.data.data.url;
    setReimburseURL(res);
  };

  const onUploadHandler1 = async (e) => {
    let file = e.target.files[0];
    let time1 = pSlipDate.split('-');

    if (pSlipDate !== 'end') {
      await uploadFinancialDocument(file, pSlipDate, {
        uploadUrl: '/api/file/financial-document',
        confirmationUrl: '/api/admin/register',

        userId: retrievedId,
        fileType: 'paySlip',
        date: {
          month: time1[1],
          year: time1[0],
        },
      });
      setPSlipDate('end');
    } else {
      toast('Please Select Pay Slip Month');
    }
  };

  const onUploadHandler2 = async (e) => {
    let file = e.target.files[0];
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

  const toggleFormComplete = async () => {
    try {
      await axios.post('/api/admin/toggle-form-completion', {
        userId: retrievedId,
        isFormComplete: !isFormComplete,
      });
      setIsFormComplete(!isFormComplete);
      if (!isFormComplete) {
        toast('Form Unlocked');
      } else {
        toast('Form Locked');
      }
      getUserData();
    } catch (error) {
      toast('Server Error Try Again');
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <OPLoader isLoading={loading} />
      ) : (
        // <PopUp></PopUp>
        <ProfContainer>
          <LeftCol>
            <DisplayPic>
              <img
                alt='user profile'
                className='imageDp'
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
                  {' '}
                  <span>FW-ID:: {userData.empNo} </span>
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
                    width: '100%',
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
                      fontSize: 18,
                      color: '#707070',
                    }}
                  >
                    ⤓ Download Profile
                  </button>{' '}
                  <button
                    onClick={toggleFormComplete}
                    style={{
                      outline: 'none',
                      background: 'inherit',
                      border: 'none',
                      fontWeight: 700,
                      marginLeft: 20,
                      fontSize: 22,
                      color: '#707070',
                    }}
                  >
                    {userData.isFormComplete ? 'Lock Form' : 'UnLock Form'}
                  </button>
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
                    view === 'upload'
                      ? { textDecoration: 'underline solid blue' }
                      : {}
                  }
                  onClick={(e) => setview('upload')}
                >
                  Documents
                </span>
                {role === 'admin' ? (
                  <span
                    style={
                      view === 'Add Reportee'
                        ? { textDecoration: 'underline solid blue' }
                        : {}
                    }
                    onClick={(e) => {
                      setview('Add Reportee');
                    }}
                  >
                    Add Reportee
                  </span>
                ) : (
                  <></>
                )}
              </NavSection>
              <BodySection>
                {view === 'data' ? (
                  <InpForm
                    userData={userData}
                    retrievedId={retrievedId}
                    toggle={toggle}
                    setToggle={setToggle}
                  />
                ) : view === 'upload' ? (
                  <React.Fragment>
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
                          accept='application/pdf'
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
                              tSheetDate === 'end' || tSheetDate.trim() === ''
                                ? undefined
                                : moment(tSheetDate, 'YYYY-MM')
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
                          accept='application/pdf'
                          id='FileUpload2'
                          disabled={
                            tSheetDate === 'end' || pSlipDate.trim() === ''
                          }
                          style={{ opacity: 0, width: 0, height: 0 }}
                          onChange={onUploadHandler2}
                        />
                      </div>
                    </UploadContainer>
                    <UploadContainer>
                      <div className='heading'>
                        <h4>Download Reimbursment</h4>
                      </div>
                      <div className='select'>
                        <p>Select Month </p>{' '}
                        <Space direction='vertical'>
                          <DatePicker
                            onChange={GetFileDownloaded}
                            disabledDate={(current) => disabledDate(current)}
                            picker='month'
                            placeholder={enabledDates[enabledDates.length - 1]}
                          />
                        </Space>
                        <div
                          id='btn2'
                          onClick={(e) => {
                            window.open(reimburseURL);
                          }}
                        >
                          {'Click To Download'}
                        </div>
                      </div>
                    </UploadContainer>
                  </React.Fragment>
                ) : (
                  <>
                    <FormMain>
                      <form onSubmit={addRepor}>
                        <h4>
                          {' '}
                          <div className='info-type'>Assign to Sub Admin</div>
                        </h4>
                        <div className='form-group' style={{ paddingLeft: 70 }}>
                          <select
                            className='form-control'
                            onChange={(e) => setSubAdminId(e.target.value)}
                            defaultValue={''}
                          >
                            <option value='' disabled>
                              Select sub-admin ...
                            </option>
                            {subAdmins.map((subAdmin, key) => (
                              <option key={key} value={subAdmin._id}>
                                {subAdmin.name}
                              </option>
                            ))}
                          </select>

                          <br />
                          <div className='form-group form-check'>
                            <input
                              className='form-check-input'
                              required
                              type='checkbox'
                              id='Checkbox'
                            />
                            <label className='form-check-label'>
                              Are you sure you want to add the reportee
                            </label>
                          </div>
                        </div>
                        <button
                          className='btn'
                          style={{
                            width: '190px',
                            margin: '10px 13% ',
                            background: '#3f47cc',
                            color: 'white',
                          }}
                          type='submit'
                        >
                          Continue
                        </button>
                      </form>
                    </FormMain>
                  </>
                )}
              </BodySection>
            </NameSection>
          </RightCol>
        </ProfContainer>
      )}
    </React.Fragment>
  );
};
export default Profilepage;

/*https://random-bucket-1234.s3.ap-south-1.amazonaws.com/5f94ed69f3db28001749190d/doc/reimburse01-2020.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5VFN6YBMBX5CMK6T%2F20201103%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20201103T123431Z&X-Amz-Expires=3600&X-Amz-Signature=4784ae76a4d2bb3b51c946dfeab3c84b7350a9a238f64453633add6d1a3c94a0&X-Amz-SignedHeaders=host */
