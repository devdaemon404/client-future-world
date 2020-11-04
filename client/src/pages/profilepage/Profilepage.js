import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { DatePicker, Space, Button, Tabs } from 'antd';
import { config } from '../../util/RequestUtil';
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

import PHONE from '../../assets/img/phone.png';
import { uploadFinancialDocument } from '../../util/UploadFile';
import { toast } from '../../util/ToastUtil';
import { OPLoader } from '../../util/LoaderUtil';

const { TabPane } = Tabs;

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
    } catch (err) { }
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
    } catch (error) { }
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
    } catch (error) { }

    getAllPaySlips();

    //eslint-disable-next-line
  }, [loading]);

  const timeSheetMonthUpdater = (_, dateString) => {
    setTSheetDate(dateString);
  };

  const getUserData = async () => {
    try {
      setLoading(1);
      const res = await axios.get(
        `/api/admin/employee-info/${retrievedId}?select=FName,increments,photo,isFormComplete,empNo,LName,email,joiningDate,designation,phoneNumber,Address,FWEmail,Manager,custLoc,custName,BillingPH,annualCTC,increment,lwd,comments`
      );
      let { data } = res.data;
      if (!data) data = {};
      setUserData({ ...data });
      const tempIsFormComplete = data.isFormComplete;
      if (tempIsFormComplete) {
        setIsFormComplete(true)
      }
    }
    catch (e) {
      toast("Error fetching employee data")
    }
    finally {
      setLoading(0);
    }

  };

  const downloadFile = () => {
    window.open(`/api/ejs/pdf-gen?employeeId=${retrievedId}`);
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, [toggle]);
  const getFileDownloaded = async (_, datestring) => {
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
      setLoading(1);
      await axios.post('/api/admin/toggle-form-completion', {
        userId: retrievedId,
        isFormComplete: !isFormComplete,
      }, config);
      setIsFormComplete(!isFormComplete);
      if (!isFormComplete) {
        toast('Form Unlocked');
      } else {
        toast('Form Locked');
      }
      await getUserData();
    } catch (error) {
      toast('Server Error Try Again');
    }
    finally {
      setLoading(0)
    }
  };

  const selectedMenuStyle = { backgroundColor: 'rgba(17, 21, 76, 0.8)', color: 'white', borderRadius: 10, paddingTop: 7, paddingBottom: 7 };

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
                    <b className='sidebar-item'> {userData.phoneNumber}</b>
                  </p>
                  <p>
                    <span>
                      <b>Date Of Joining: {' '}</b>
                      {moment(userData.joiningDate).format('DD/MM/YYYY')}{' '}
                    </span>
                  </p>
                  <p>
                    {' '}
                    <span><b>FW-ID: </b>{userData.empNo} </span>
                  </p>
                  <p>
                    <span><b>Designation:</b> {userData.designation}</span>
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
                    <div>
                      <Button
                        type="secondary" shape="round"
                        onClick={downloadFile}
                      >
                        ⤓ Download Profile
                  </Button>{' '}
                      <Button
                        type="secondary" shape="round"
                        onClick={toggleFormComplete}
                      >
                        {userData.isFormComplete ? 'Lock Onboarding Application' : 'Unlock Onboarding Application'}
                      </Button>
                    </div>
                  </div>
                </div>

                <Tabs defaultActiveKey="1" onChange={console.log} color='red'>
                  <TabPane tab="Employee Information" key="data">
                    <InpForm
                      userData={userData}
                      retrievedId={retrievedId}
                      toggle={toggle}
                      setToggle={setToggle}
                    />
                  </TabPane>
                  <TabPane tab="Employee Documents" key="upload">
                    <React.Fragment>
                      <UploadContainer>
                        <div className='info-type'>Upload Payslip</div>
                        <div className='select'>
                          <p className="text-right">Select Month </p>{' '}
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
                            {' UPLOAD'}
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
                        <span className='info-type'>Upload Time Sheet</span>
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
                            {' UPLOAD'}
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
                      <br />
                      <UploadContainer>
                        <span className='info-type'>Download Reimbursement Documents</span>
                        <div className='select'>
                          <p>Select Month </p>{' '}
                          <Space direction='vertical'>
                            <DatePicker
                              onChange={timeSheetMonthUpdater}
                              disabledDate={(current) => disabledDate(current)}
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
                              document.getElementById('FileUpload3').click();
                            }}
                          >
                            {' DOWNLOAD'}
                          </div>
                          <input
                            type='submit'
                            id='FileUpload3'
                            // disabled={
                            //   tSheetDate === 'end' || pSlipDate.trim() === ''
                            // }
                            style={{ opacity: 0, width: 0, height: 0 }}
                          // onClick={reimburseHandler}
                          />
                        </div>
                      </UploadContainer>
                    </React.Fragment>
                  </TabPane>
                  <TabPane tab="Add Reportee" key="Add Reportee">
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
                            {/* <input
                            as='select'
                            required
                            size='md'
                            className='form-control'
                            onChange={(e) => setSubAdminId(e.target.value)}>
                            {adminList}
                          </input> */}
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
                              fontWeight: 600
                            }}
                            type='submit'
                          >
                            CONTINUE
                        </button>
                        </form>
                      </FormMain>
                    </>
                  </TabPane>
                </Tabs>
              </NameSection>
            </RightCol>
          </ProfContainer>
        )}
    </React.Fragment>
  );
};
export default Profilepage;

/*https://random-bucket-1234.s3.ap-south-1.amazonaws.com/5f94ed69f3db28001749190d/doc/reimburse01-2020.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5VFN6YBMBX5CMK6T%2F20201103%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20201103T123431Z&X-Amz-Expires=3600&X-Amz-Signature=4784ae76a4d2bb3b51c946dfeab3c84b7350a9a238f64453633add6d1a3c94a0&X-Amz-SignedHeaders=host */
