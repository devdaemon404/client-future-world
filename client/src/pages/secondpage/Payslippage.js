import React, { useState } from 'react';
import {
  Container,
  HeroContainer,
  MainHeader,
  //  MainPara, CardHeader, CardPara
} from '../formpages/formpage.styles.js';

import Header from '../../components/header/Header';
import FormPageComponent from '../../components/form/FormPageComponent';
// import OPBreadCrumb from '../../../components/form/OPBreadCrumb.js';

// import axios from 'axios';
import { OPLoader } from '../../util/LoaderUtil.js';

const Payslippage = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [formData, setFormData] = useState({
  //   presentAddress: '',
  //   phoneNumber: '',
  //   permanentAddress: '',
  //   phoneNumberPermAdd: '',
  //   contactPersonName: '',
  //   contactPersonPhone: '',
  //   contactPersonAddress: '',
  // });
  // const {
  //   presentAddress,
  //   phoneNumberPresAdd,
  //   permanentAddress,
  //   phoneNumberPermAdd,
  //   contactPersonName,
  //   contactPersonPhone,
  //   contactPersonAddress,
  // } = formData;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     const result = await axios.get(
  //       '/api/employee?select=presentAddress,phoneNumberPresAdd,permanentAddress,phoneNumberPermAdd,contactPersonName,contactPersonPhone,contactPersonAddress,'
  //     );

  //     console.log(result.data.data);
  //     setFormData({ ...result.data.data });
  //     setIsLoading(false);
  //   };

  //   fetchData();
  // }, []);

  // const handleChange = (e) => {
  //   const target = e.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;

  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // const updateAddress = async ({
  //   presentAddress,
  //   phoneNumberPresAdd,
  //   permanentAddress,
  //   phoneNumberPermAdd,
  //   contactPersonName,
  //   contactPersonPhone,
  //   contactPersonAddress,
  // }) => {
  //   try {
  //     const body = JSON.stringify({
  //       postParams: {
  //         presentAddress,
  //         phoneNumberPresAdd,
  //         permanentAddress,
  //         phoneNumberPermAdd,
  //         contactPersonName,
  //         contactPersonPhone,
  //         contactPersonAddress,
  //       },
  //     });

  //     setIsLoading(true);
  //     await axios.post('/api/employee', body);
  //     history.push('/information/languageInformation');
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   updateAddress(formData);
  // };

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
              Select A Month
            </div>
            <div className='col-sm-4'>
              <select class='form-control' id='exampleFormControlSelect1'>
                <option selected>Select A Month</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>

          <div className='form-group row p-2'>
            <div className='col-sm-3'>
              <span className='text-danger'>*</span>
              Select A year
            </div>
            <div className='col-sm-4'>
              <select class='form-control' id='exampleFormControlSelect1'>
                <option selected> Select A Year</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>

          <div className='form-group row p-2 d-flex justify-content-start mt-4 mb-5'>
            <div className='col-sm-7'>
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
              Select A Month
            </div>
            <div className='col-sm-4'>
              <select class='form-control' id='exampleFormControlSelect1'>
                <option selected>Select A Month</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>

          <div className='form-group row p-2'>
            <div className='col-sm-3'>
              <span className='text-danger'>*</span>
              Select A year
            </div>
            <div className='col-sm-4'>
              <select class='form-control' id='exampleFormControlSelect1'>
                <option selected> Select A Year</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>

          <div className='form-group row p-2 d-flex justify-content-start mt-4 mb-5'>
            <div className='col-sm-7'>
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
