import React, { useState } from 'react';
import { FormMain } from './ProfilePage.styles';
import { Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from '../../util/ToastUtil';
export const InpForm = (props) => {
  const [input, setInput] = useState({});

  const {
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
  const fields2 = [
    {
      fName: 'phoneNumber',
      type: 'Number',
      min: 1000000000,
      max: 9999999999,
      required: 'required',
      defaultValue: props.userData.phoneNumber,
      name: 'phoneNumber',
    },
    {
      fName: 'Address',
      as: 'textarea',
      defaultValue: props.userData.Address,
      name: 'Address',
      required: 'required',
    },

    {
      fName: 'Email Id',
      type: 'email',
      defaultValue: props.userData.email,
      name: 'email',
      required: 'required',
    },
  ];

  const fields3 = [
    {
      fName: 'FW Email',
      type: 'text',
      defaultValue: props.userData.FWEmail,
      name: 'FWEmail',
      required: 'required',
    },
    {
      fName: 'Reporting Manager ',
      type: 'text',
      defaultValue: props.userData.Manager,
      name: 'Manager',
      required: 'required',
    },
    {
      fName: 'Customer Name  ',
      type: 'text',
      defaultValue: props.userData.custName,
      name: 'custName',
      required: 'required',
    },
    {
      fName: 'Customer Location',
      as: 'textarea',
      defaultValue: props.userData.custLoc,
      name: 'custLoc',
      required: 'required',
    },
    {
      fName: 'Designation  ',
      type: 'text',
      defaultValue: props.userData.designation,
      name: 'designation',
      required: 'required',
    },
    {
      fName: 'Billing Per Hour  ',
      type: 'text',
      defaultValue: props.userData.BillingPH,
      name: 'BillingPH',
      required: 'required',
    },
    {
      fName: 'Annual CTC ',
      type: 'text',
      defaultValue: props.userData.annualCTC,
      name: 'annualCTC',
      required: 'required',
    },
    {
      fName: 'Increment  ',
      type: 'text',
      defaultValue: props.userData.increment,
      name: 'increment',
      required: 'required',
    },
    {
      fName: 'LWD ',
      type: 'text',
      defaultValue: props.userData.lwd,
      name: 'lwd',
      required: '',
    },
    {
      fName: 'Comments ',
      type: 'text',
      defaultValue: props.userData.comments,
      name: 'comments',
      required: 'required',
    },
  ];

  let temp = {};
  const putUserData = async () => {
    temp = await axios.put('/api/admin/register', {
      employeeId: [props.retrievedId],
      updateParams: {
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
      },
    });

    await console.log(temp);
    toast('User Updated');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(
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
      comments
    );
    putUserData();
    props.setToggle([!props.toggle]);
    // console.log(props.retrievedId);
  };

  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const set2 = fields2.map((field, i) => {
    return (
      <Form.Group key={i} as={Row}>
        <Form.Label className='form-label text-right' column sm='4'>
          {field.fName}
        </Form.Label>
        <Col sm='6'>
          {/* eslint-disable-next-line */}
          <Form.Control
            className='form-control'
            type={field.type}
            as={field.as}
            name={field.name}
            // eslint-disable-next-line
            className='formsInp'
            defaultValue={field.defaultValue}
            onChange={onChangeHandler}
          />
        </Col>{' '}
      </Form.Group>
    );
  });
  const set3 = fields3.map((field, i) => {
    return (
      <Form.Group as={Row} key={i}>
        <Form.Label className='form-label text-right' column sm='4'>
          {field.fName}
        </Form.Label>
        <Col sm='6 '>
          <Form.Control
            className='form-control'
            type={field.type}
            as={field.as}
            name={field.name}
            key={field.name + 'rr'}
            // eslint-disable-next-line
            className='formsInp'
            defaultValue={field.defaultValue}
            onChange={onChangeHandler}
          />
        </Col>{' '}
      </Form.Group>
    );
  });
  return (
    <React.Fragment>
      <h4>
        <FormMain>
          <Form onSubmit={submitHandler}>
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
              Update Data
            </button>
          </Form>
          <br />
        </FormMain>
      </h4>
    </React.Fragment>
  );
};

export default InpForm;
