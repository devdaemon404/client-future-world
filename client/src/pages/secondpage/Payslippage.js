import React, { useState } from 'react';
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
import { uploadFinancialDocument } from '../../util/UploadFile';

const Payslippage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [payMonth, setPayMonth] = useState('');
  const [payYear, setPayYear] = useState('');
  const [timeMonth, setTimeMonth] = useState('');
  const [timeYear, setTimeYear] = useState('');
  const [pSlipDate, setPSlipDate] = useState('end');

  const paySlipMonthUpdater = (date, dateString) => {
    setPSlipDate(dateString);
  };

  const onUploadHandler1 = async (e) => {
    let file = e.target.files[0];
    let time1 = pSlipDate.split('-');

    if (pSlipDate !== 'end') {
      await uploadFinancialDocument(file, pSlipDate, {
        uploadUrl: '/api/file/financial-document',
        confirmationUrl: '/api/admin/register',

        // userId: retrievedId,
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

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  }

  function disabledReimbursmentDate(current) {
    // Can not select days before today and today
    console.log(current);
    return current && current < moment().endOf('day');
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
        const scale = 1.5;
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
    console.log(pdfUrl);
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
          Pay Slip, Time Sheet and Reimbursement Information
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
                    disabledDate={disabledDate}
                    picker='month'
                    value={
                      payMonth === undefined || payMonth.trim() === ''
                        ? undefined
                        : moment(`${payYear}-${payMonth}`, 'YYYY-MM')
                    }
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
                  onClick={updateChange}
                >
                  <i className='fas fa-download'></i> Get Pay Slip
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
                    disabledDate={disabledDate}
                    picker='month'
                    value={
                      timeMonth === undefined || timeMonth.trim() === ''
                        ? undefined
                        : moment(`${timeYear}-${timeMonth}`, 'YYYY-MM')
                    }
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
                  onClick={updateChange}
                >
                  <i className='fas fa-eye'></i> View Time Sheet
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
                <h2>Upload Payslip</h2>
              </div>

              <div className='form-group row p-2'>
                <div className='col-sm-3'>
                  <span className='text-danger'>*</span>
                  Select Month and Year
                </div>
                <div className='col-sm-9'>
                  <Space direction='vertical'>
                    <DatePicker
                      onChange={paySlipMonthUpdater}
                      value={
                        pSlipDate === 'end' || pSlipDate.trim() === ''
                          ? undefined
                          : moment(pSlipDate, 'YYYY-MM')
                      }
                      disabledDate={disabledReimbursmentDate}
                      picker='month'
                    />
                  </Space>
                </div>
                <div
                  className='col-sm-8 p-2 mt-5 btn selected-crumb submit-button crumb-item w-100 font-weight-bold'
                  onClick={(e) => {
                    document.getElementById('FileUpload1').click();
                  }}
                >
                  <i class='fas fa-cloud-upload-alt'></i>{' '}
                  {'Click To Upload Bill'}
                </div>
                <input
                  type='file'
                  className='realupload'
                  accept='application/pdf'
                  id='FileUpload1'
                  style={{ opacity: 0 }}
                  disabled={pSlipDate === 'end' || pSlipDate.trim() === ''}
                  onChange={onUploadHandler1}
                />
                <div className='text-muted col-sm-9 mt-1'>
                  (Select the month and year and your Time Sheet will Pop-up)
                </div>
              </div>
            </UploadContainer>
          </div>
        </div>
      </div>

      <Modal
        title='Basic Modal'
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <div
          className='container text-center'
          id='viewTimeSheet'
          // style={{ border: '1px solid black' }}
        ></div>
      </Modal>
    </Container>
  );
};

export default Payslippage;
