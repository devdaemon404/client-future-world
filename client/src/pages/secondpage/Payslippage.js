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


// import { OPLoader } from '../../util/LoaderUtil.js';

const Payslippage = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [formData, setFormData] = useState({
    paySlipMonth: '',
    paySlipYear: '',
    timeStampMonth: '',
    timeStampYear: '',
  });

  const { paySlipMonth, paySlipYear, timeStampMonth, timeStampYear } = formData;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.get(
        '/api/employee?select=paySlipMonth, paySlipYear, timeStampMonth , timeStampYear'
      );

      console.log(result.data.data);
      setFormData({ ...result.data.data });
      setIsLoading(false);
    };

    fetchData();
  }, []);


  function onChange(date, dateString) {
    console.log(date, dateString);
  } 

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateMonthYear = async ({
    paySlipMonth,
    paySlipYear,
    timeStampMonth,
    timeStampYear,
  }) => {
    try {
      const body = JSON.stringify({
        postParams: {
          paySlipMonth,
          paySlipYear,
          timeStampMonth,
          timeStampYear,
        },
      });

      setIsLoading(true);
      await axios.post('/api/employee', body);
      history.push('/information/languageInformation');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateMonthYear(formData);
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
      <div className='container'>
        <div className='d-flex flex-column right justify-content-center ml-5 mt-5'>
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
            <div className='col-sm-4'>
              <Space direction='vertical'>
                <DatePicker onChange={onChange} picker='month' />
              </Space>
            </div>
          </div>

          

          <div className='form-group row p-2 d-flex justify-content-start mt-4 mb-5'>
            <div className='col-sm-5'>
              <button
                type='submit'
                className='btn selected-crumb submit-button crumb-item w-100 font-weight-bold'
              >
                <i className='fas fa-download'></i> Get Pay Slip
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='d-flex flex-column right justify-content-center ml-5 mt-5'>
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
            <div className='col-sm-4'>
            <Space direction='vertical'>
                <DatePicker onChange={onChange} picker='month' />
              </Space>
            </div>
          </div>

          <div className='form-group row p-2 d-flex justify-content-start mt-4 mb-5'>
            <div className='col-sm-5'>
              <button
                type='submit'
                className='btn selected-crumb submit-button crumb-item w-100 font-weight-bold'
              >
                <i className='fas fa-eye'></i> View Time Sheet
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Payslippage;
