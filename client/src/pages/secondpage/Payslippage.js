import React, { useState, useEffect } from 'react';
import moment from 'moment';

import {
  Container,
  HeroContainer,
  MainHeader,
} from '../formpages/formpage.styles.js';
import axios from 'axios';
import { DatePicker, Space, Modal } from 'antd';
import Header from '../../components/header/Header';
import { config } from '../../util/RequestUtil';
import { toast } from '../../util/ToastUtil.js';
import { OPLoader } from '../../util/LoaderUtil.js';
import { UploadContainer } from './paySlipPage.styles';

const PaySlipPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [payMonth, setPayMonth] = useState('');
  const [payYear, setPayYear] = useState('');
  const [timeMonth, setTimeMonth] = useState('');
  const [timeYear, setTimeYear] = useState('');
  const [reimbursmentDate, setReimbursmentDate] = useState('');
  const [enabledDates, setEnabledDates] = useState({
    paySlip: [],
    timeSheet: [],
    reimbursement: [],
  });

  const reimburseMonthUpdater = (date, dateString) => {
    setReimbursmentDate(dateString);
  };

  useEffect(() => {
    const fetchDates = async () => {
      const paySlipEnabledDates = [],
        timeSheetEnabledDates = [],
        reimbursementEnabledDates = [];

      await apiCall('paySlip', paySlipEnabledDates);
      await apiCall('timeSheet', timeSheetEnabledDates);
      await apiCall('reimburse', reimbursementEnabledDates);
      setEnabledDates({
        paySlip: [...paySlipEnabledDates],
        timeSheet: [...timeSheetEnabledDates],
        reimbursement: [...reimbursementEnabledDates],
      });
    };

    const apiCall = async (fileType, resArr) => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `/api/employee/financial-docs?documentType=${fileType}`,
          config
        );
        const tempArr = res.data.data;
        // console.log(tempArr);
        tempArr.forEach((o) => {
          resArr.push(`${o.documentedDate.year}-${o.documentedDate.month}`);
        });
      } catch (error) {
        toast('Error fetching upload-dates');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDates();
  }, []);

  const reimburseAPIcall = async (fileKey, reimburseDate, documentType) => {
    try {
      setIsLoading(true);
      const body = JSON.stringify({
        documentType,
        fileKey,
        documentedDate: {
          month: reimburseDate[1],
          year: reimburseDate[0],
        },
      });

      await axios.put('/api/employee/financial-docs', body, config);
      toast(`File Uploaded for Reimbursment, admin will get back to you`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onUploadHandler1 = async (e) => {
    if (reimbursmentDate === '') {
      toast('Select the month for reimbursement');
      return;
    }
    try {
      setIsLoading(true);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post(
        '/api/file/upload-url',
        JSON.stringify({
          fileName: file.name,
          fileType: 'doc',
          fileExtension: 'pdf',
        }),
        config
      );
      const { fileKey, url } = res.data;
      const res2 = await axios.put(url, formData);
      if (res2.status === 200) {
        const documentType = 'reimburse';
        const reimburseDate = reimbursmentDate.split('-');
        await reimburseAPIcall(fileKey, reimburseDate, documentType);
        setReimbursmentDate('');
      } else {
        toast('Error uploading your file. Try again');
      }
    } catch (e) {
      toast('Error uploading your file. Try again');
    } finally {
      setIsLoading(false);
    }
  };

  function onPayChange(date, dateString) {
    let dateArray = dateString.split('-');
    setPayMonth(dateArray[1]);
    setPayYear(dateArray[0]);
  }

  function onTimeChange(date, dateString) {
    let dateArray = dateString.split('-');
    setTimeMonth(dateArray[1]);
    setTimeYear(dateArray[0]);
  }

  function disabledDate(current, fileType) {
    // Can not select days before today and today
    const formatted = current.format('YYYY-MM');
    if (fileType === 'paySlip') {
      return !enabledDates.paySlip.includes(formatted);
    }
    return !enabledDates.timeSheet.includes(formatted);
  }

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    let list = document.getElementById('viewTimeSheet');

    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
    setVisible(false);
  };

  const handleCancel = (e) => {
    let list = document.getElementById('viewTimeSheet');

    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
    setVisible(false);
  };

  const showTimeSheet = async (pdfUrl) => {
    showModal();

    const drawPdf = async (pdfUrl) => {
      const loadingTask = window.PDFJS.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;

      // Load information from the first page.
      let canvas;
      for (let i = 1; i <= pdf.numPages; i++) {
        canvas = document.createElement('canvas');
        canvas.setAttribute('id', `canvas${i}`);

        document.getElementById('viewTimeSheet').appendChild(canvas);

        const page = await pdf.getPage(i);
<<<<<<< HEAD
        const scale = 1.25;
=======
        const scale = 1.2;
>>>>>>> 53aacb9a56514c2220244ef9be12db49706b812e
        const viewport = page.getViewport(scale);

        // Apply page dimensions to the <canvas> element.
        // const canvas = document.getElementById("pdf");
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render the page into the <canvas> element.
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext);
        console.log('Page rendered!' + i);
      }
    };

    pdfUrl = pdfUrl.replaceAll('&amp;', '&');
    await drawPdf(pdfUrl);
  };

  const updateChange = async (e) => {
    let documentType = e.target.name;
    if (documentType === 'paySlip') {
      try {
        const body = JSON.stringify({
          documentType,
          documentedDate: {
            month: payMonth,
            year: payYear,
          },
        });

        await axios
          .post('/api/employee/financial-docs', body, config)
          .then((res) => {
            let pdf_url = res.data.data.url;
            window.open(pdf_url);
          });
      } catch (error) {
        console.log(error);
        toast('Pay Slip not available for the selected month');
      } finally {
        setPayMonth('');
        setPayYear('');
      }
    } else if (documentType === 'timeSheet') {
      try {
        const body = JSON.stringify({
          documentType,
          documentedDate: {
            month: timeMonth,
            year: timeYear,
          },
        });

        await axios
          .post('/api/employee/financial-docs', body, config)
          .then((res) => {
            let pdf_url = res.data.data.url;
            // window.open(pdf_url);
            showTimeSheet(pdf_url);
          });
      } catch (error) {
        toast('Time Sheet not available for the selected month');
        console.log(error);
      } finally {
        setTimeMonth('');
        setTimeYear('');
      }
    }
  };

  return (
    <Container>
      <Header pathname='/' />
      <HeroContainer className='box d-flex align-items-center justify-content-center'>
        <MainHeader className='text-center'>
          Pay Slip, Time Sheet and Reimbursement
        </MainHeader>
      </HeroContainer>
      <div className='jumbotron jumbotron-fluid'>
        <div className='container'>
          <p className='lead'>
            Select a month and year to generate a pay slip. In order to view a
            time sheet select a month and year and click view time sheet. <br />
            <br /> The pay slip will be downloaded in a pdf format.<br></br>
            <span className='float-right'>
              <span className='text-danger'>*</span>Indicates required field
            </span>
          </p>
        </div>
      </div>
      <OPLoader isLoading={isLoading} />
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 col-md-12 '>
            <div className='row'>
              <div className='col-12 text-left mb-3'>
                <h2>Generate Pay Slip</h2>
              </div>
            </div>

            <div className='form-group row p-2'>
              <div className='col-sm-3'>
                <span className='text-danger'>*</span>
                Select Month and Year
              </div>
              <div className='col-sm-9'>
                <Space direction='vertical'>
                  <DatePicker
                    onChange={onPayChange}
                    disabledDate={(current) => disabledDate(current, 'paySlip')}
                    picker='month'
                    value={
                      payMonth === undefined || payMonth.trim() === ''
                        ? undefined
                        : moment(`${payYear}-${payMonth}`, 'YYYY-MM')
                    }
                    placeholder='2020-01'
                  />
                </Space>
              </div>
            </div>

            <div className='form-group row p-2 d-flex justify-content-start mt-4 mb-5'>
              <div className='col-sm-8'>
                <button
                  type='submit'
                  className='btn selected-crumb submit-button crumb-item w-100 font-weight-bold'
                  name='paySlip'
                  disabled={
                    payMonth === '' ||
                    payMonth === undefined ||
                    payMonth === null
                  }
                  onClick={updateChange}>
                  <i className='fas fa-download'></i> Download
                </button>
                <div className='text-muted mt-1'>
                  (Select the month and year and your Pay Slip will be
                  downloaded)
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-md-12'>
            <div className='row'>
              <div className='col-12 text-left mb-3'>
                <h2>Time Sheet</h2>
              </div>
            </div>

            <div className='form-group row p-2'>
              <div className='col-sm-3'>
                <span className='text-danger'>*</span>
                Select Month and Year
              </div>
              <div className='col-sm-9'>
                <Space direction='vertical'>
                  <DatePicker
                    onChange={onTimeChange}
                    disabledDate={(current) =>
                      disabledDate(current, 'timeSheet')
                    }
                    picker='month'
                    value={
                      timeMonth === undefined || timeMonth.trim() === ''
                        ? undefined
                        : moment(`${timeYear}-${timeMonth}`, 'YYYY-MM')
                    }
                    placeholder='2020-01'
                  />
                </Space>
              </div>
            </div>

            <div className='form-group row p-2 d-flex justify-content-start mt-4 mb-5'>
              <div className='col-sm-8'>
                <button
                  type='submit'
                  className='btn selected-crumb submit-button crumb-item w-100 font-weight-bold'
                  name='timeSheet'
                  disabled={
                    timeMonth === '' ||
                    timeMonth === undefined ||
                    timeMonth === null
                  }
                  onClick={updateChange}>
                  <i className='fas fa-eye'></i> View
                </button>
                <div className='text-muted mt-1'>
                  (Select the month and year and your Time Sheet will Pop-up)
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className='col-lg-4 col-md-12'>
            <UploadContainer>
              <div
              // className='heading'
              >
                <h2>Reimbursement</h2>
              </div>

              <div className='form-group row p-2'>
                <div className='col-sm-3'>
                  <span className='text-danger'>*</span>
                  Select Month and Year
                </div>
                <div className='col-sm-9'>
                  <Space direction='vertical'>
                    <DatePicker
                      onChange={reimburseMonthUpdater}
                      monthCellRender={(dateMoment) => {
                        const date = moment(dateMoment, 'YYYY-MM');
                        const month = date.format('MMM');
                        const formattedDate = date.format('YYYY-MM');
                        let style = {
                          backgroundColor: 'rgba(138,189,224,0.25)',
                          borderRadius: 5,
                        };
                        if (!enabledDates.reimbursement.includes(formattedDate))
                          style = {};

                        return (
                          <span
                            style={{
                              padding: 10,
                              ...style,
                            }}>
                            {month}
                          </span>
                        );
                      }}
                      value={
                        reimbursmentDate === '' ||
                        reimbursmentDate.trim() === ''
                          ? undefined
                          : moment(reimbursmentDate, 'YYYY-MM')
                      }
                      picker='month'
                      placeholder='2020-01'
                    />
                  </Space>
                </div>
                <button
                  className='col-sm-8 p-2 mt-5 btn selected-crumb submit-button crumb-item w-100 font-weight-bold'
                  disabled={
                    reimbursmentDate === '' ||
                    reimbursmentDate === undefined ||
                    reimbursmentDate === null
                  }
                  onClick={(e) => {
                    document.getElementById('FileUpload1').click();
                  }}>
                  <i class='fas fa-cloud-upload-alt'></i> {'Upload'}
                </button>
                <input
                  type='file'
                  className='realupload'
                  accept='application/pdf'
                  id='FileUpload1'
                  style={{ opacity: 0 }}
                  disabled={
                    reimbursmentDate === '' || reimbursmentDate.trim() === ''
                  }
                  onChange={onUploadHandler1}
                />
                <div className='text-muted col-sm-9 mt-1'>
                  (Select the month and year for which you want to be
                  reimbursed)
                </div>
              </div>
            </UploadContainer>
          </div>
        </div>
      </div>

      <Modal
        title='Time Sheet'
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1500}>
        <div className='container text-center' id='viewTimeSheet'></div>
      </Modal>
    </Container>
  );
};

export default PaySlipPage;
