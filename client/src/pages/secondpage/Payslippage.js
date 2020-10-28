import React, { useState, useEffect } from 'react';
import {
  Container,
  HeroContainer,
  MainHeader,
} from '../formpages/formpage.styles.js';

import Header from '../../components/header/Header';
import axios from 'axios';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import { config } from '../../util/RequestUtil';
import { toast } from '../../util/ToastUtil.js';
import { OPLoader } from '../../util/LoaderUtil.js';
import moment from 'moment';

// import { OPLoader } from '../../util/LoaderUtil.js';

const Payslippage = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [payMonth, setPayMonth] = useState('');
  const [payYear, setPayYear] = useState('');
  const [timeMonth, setTimeMonth] = useState('');
  const [timeYear, setTimeYear] = useState('');

  function onPayChange(date, dateString) {
    console.log(date, dateString);
    let dateArray = dateString.split('-');
    setPayMonth(dateArray[1]);
    setPayYear(dateArray[0]);
  }

  function onTimeChange(date, dateString) {
    console.log(date, dateString);
    let dateArray = dateString.split('-');
    setTimeMonth(dateArray[1]);
    setTimeYear(dateArray[0]);
  }

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

        setIsLoading(true);
        await axios
          .post('/api/employee/financial-docs', body, config)
          .then((res) => {
            let url = res.data.data.url;
            window.open(url);
          });
      } catch (error) {
        console.log(error);
        toast('Pay Slip not available for the selected month');
      } finally {
        setIsLoading(false);
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

        setIsLoading(true);
        await axios
          .post('/api/employee/financial-docs', body, config)
          .then((res) => {
            let url = res.data.data.url;
            window.open(url);
          });
      } catch (error) {
        toast('Time Sheet not available for the selected month');
        console.log(error);
      } finally {
        setIsLoading(false);
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
          Pay Slip and Time Stamp Information
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
          <div className='col-lg-6 col-md-12'>
            {/* <div className='d-flex flex-column right justify-content-center ml-5 mt-5'> */}
            <div className='row'>
              <div className='col-12 text-left mb-3'>
                <h1>Generate Pay Slip</h1>
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
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className='col-lg-6 col-md-12'>
            {/* <div className='d-flex flex-column right justify-content-center ml-5 mt-5'> */}
            <div className='row'>
              <div className='col-12 text-left mb-3'>
                <h1>Time Sheet</h1>
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
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Payslippage;
