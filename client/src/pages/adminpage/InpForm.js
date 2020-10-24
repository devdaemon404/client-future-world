import React, { useState } from 'react';
import { FormMain } from './AdminPage.styles';
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import { toast } from '../../util/ToastUtil';
import { OPLoader } from '../../util/LoaderUtil';
export const InpForm = ({ getUsers }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    FName: '',
    LName: '',
    phoneNumber: '',
    Address: '',
    email: '',
    FWEmail: '',
    Manager: '',
    custName: '',
    custLoc: '',
    BillingPH: '',
    annualCTC: '',
    designation: '',
    increment: '',
    lwd: '',
    comments: '',
  });

  let {
    FName,
    LName,
    designation,
    phoneNumber,
    Address,
    email,
    FWEmail,
    Manager,
    custLoc,
    custName,
    BillingPH,
    annualCTC,
    increment,
    lwd,
    comments,
  } = input;
  const name = FName + '' + LName;
  if (!FName) {
    FName = 'X';
  }
  if (!LName) {
    LName = 'X';
  }
  var resu = '';
  var joiningDate = moment();
  let FWiD = `FW-${FName[0]}${LName[0]}${Math.round(Math.random() + Date.now())
    .toString()
    .slice(-5)}`;
  const addUser = async () => {
    setIsLoading(true);
    try {
      resu = await axios.post('/api/auth/register', {
        email,
        name,
        phoneNumber,
        empNo: FWiD,
        extraFields: {
          email,
          FName,
          LName,
          designation,
          phoneNumber,
          Address,
          FWEmail,
          Manager,
          custLoc,
          custName,
          BillingPH,
          annualCTC,
          increment,
          lwd,
          empNo: FWiD,
          comments,
          joiningDate,
        },
      });
      setIsLoading(false);

      toast('Added a new User');
      getUsers();
    } catch (error) {
      if (error.response.status === 400) toast('User Already Exists');
      else toast('Error : Please Login Again');
    }

    console.log(resu);
  };

  const fields1 = [
    {
      fName: 'First Name',
      type: 'text',
      defaultValue: 'First Name',
      name: 'FName',
      required: 'required',
    },
    {
      fName: 'Last Name',
      type: 'text',
      defaultValue: 'Last Name',
      name: 'LName',
      required: 'required',
    },
    {
      fName: 'Phone Number',
      type: 'tel',
      min: 10,
      max: 10,
      required: 'required',
      defaultValue: 'Phone Number',
      name: 'phoneNumber',
    },
  ];
  const fields2 = [
    {
      fName: 'Address',
      as: 'textarea',
      defaultValue: 'Address',
      name: 'Address',
      required: 'required',
    },

    {
      fName: 'Email Id',
      type: 'email',
      defaultValue: 'Email@ID.com',
      name: 'email',
      required: 'required',
    },
  ];

  const fields3 = [
    {
      fName: 'FW Email',
      type: 'email',
      defaultValue: 'Email@ID.com',
      name: 'FWEmail',
      required: '',
    },
    {
      fName: 'Designation  ',
      type: 'text',
      defaultValue: 'Designation',
      name: 'designation',
      required: 'required',
    },
    {
      fName: 'Reporting Manager ',
      type: 'text',
      defaultValue: 'Reporting Manager',
      name: 'Manager',
      required: 'required',
    },
    {
      fName: 'Customer Name  ',
      type: 'text',
      defaultValue: 'Customer Name',
      name: 'custName',
      required: 'required',
    },
    {
      fName: 'Customer Location',
      as: 'textarea',
      defaultValue: 'Location',
      name: 'custLoc',
      required: 'required',
    },
    {
      fName: 'Billing Per Hour  ',
      type: 'text',
      defaultValue: ' Enter Amount',
      name: 'BillingPH',
      required: 'required',
    },
    {
      fName: 'Annual CTC ',
      type: 'text',
      defaultValue: ' Enter Amount',
      name: 'annualCTC',
      required: 'required',
    },
    {
      fName: 'Increment  ',
      type: 'text',
      defaultValue: ' Enter Amount',
      name: 'increment',
      required: '',
    },
    {
      fName: 'LWD ',
      type: 'text',
      defaultValue: ' ',
      name: 'lwd',
      required: '',
    },
    {
      fName: 'Comments ',
      type: 'text',
      defaultValue: 'Comments',
      name: 'comments',
      required: 'required',
    },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    addUser();
  };

  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const set1 = fields1.map(
    ({ type, name, required, defaultValue, min, max, fName }, i) => {
      return (
        <Form.Group key={i} as={Row}>
          <Form.Label className='form-label text-right' column sm='4'>
            {fName}
          </Form.Label>
          <Col sm='6'>
            <Form.Control
              className='form-control'
              type={type}
              key={i}
              pattern={type === 'tel' ? '[0-9]*' : undefined}
              // eslint-disable-next-line
              className='formsInp'
              name={name}
              placeholder={defaultValue}
              minLength={min}
              maxLength={max}
              required={required}
              onChange={onChangeHandler}
            />
          </Col>{' '}
        </Form.Group>
      );
    }
  );

  const set2 = fields2.map((field, i) => {
    return (
      <Form.Group key={i} as={Row}>
        <Form.Label className='form-label text-right' column sm='4'>
          {field.fName}
        </Form.Label>
        <Col sm='6'>
          <Form.Control
            className='form-control'
            type={field.type}
            key={i}
            minlength={field.min}
            maxlength={field.max}
            as={field.as}
            name={field.name}
            required={field.required}
            // eslint-disable-next-line
            className='formsInp'
            placeholder={field.defaultValue}
            onChange={onChangeHandler}
          />
        </Col>{' '}
      </Form.Group>
    );
  });
  const set3 = fields3.map((field, i) => {
    return (
      <Form.Group key={i} as={Row}>
        <Form.Label className='form-label  text-right' column sm='4'>
          {field.fName}
        </Form.Label>
        <Col sm='6'>
          <Form.Control
            className='form-control'
            type={field.type}
            as={field.as}
            name={field.name}
            // eslint-disable-next-line
            className='formsInp'
            placeholder={field.defaultValue}
            onChange={onChangeHandler}
            required={field.required}
            key={i}
          />
        </Col>{' '}
      </Form.Group>
    );
  });
  return (
    <React.Fragment>
      <OPLoader isLoading={isLoading} />
      <h4>
        <FormMain>
          <Form onSubmit={submitHandler}>
            <div className='info-type'>Basic Information</div>
            {set1}
            <div className='info-type'>Contact Information</div>
            {set2}
            <div className='info-type'>Work Information</div>
            {set3}
            <br />
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
              Add Employee
            </button>
          </Form>
        </FormMain>
      </h4>
    </React.Fragment>
  );
};

export default InpForm;
