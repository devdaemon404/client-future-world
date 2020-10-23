import React, { useState } from 'react';
import { FormMain } from './ProfilePage.styles';
import { Form, Row, Col, Button } from 'react-bootstrap';

export const InpForm = (props) => {
  const [input, setInput] = useState({
    FName: '',
    LName: '',
    Phone: '',
    Address: '',
    Email: '',
    FWEmail: '',
    Manager: '',
    CustName: '',
    CustLocation: '',
  });

  const fields2 = [
    {
      fName: 'Phone',
      type: 'Number',
      min: 1000000000,
      max: 9999999999,
      required: 'required',
      defaultValue: 'Phone Number',
      name: 'Phone',
    },
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
      name: 'Email',
      required: 'required',
    },
  ];

  const fields3 = [
    {
      fName: 'FW Email',
      type: 'email',
      defaultValue: 'Email@ID.com',
      name: 'FWEmail',
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
      name: 'CustName',
      required: 'required',
    },
    {
      fName: 'Customer Location',
      as: 'textarea',
      defaultValue: 'Location',
      name: 'CustLocation',
      required: 'required',
    },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(input);
  };

  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log(input);
  };

  const set2 = fields2.map((field, i) => {
    return (
      <Form.Group as={Row}>
        <Form.Label className='form-label' column sm='4'>
          {field.fName}
        </Form.Label>
        <Col sm='6' key={i}>
          <Form.Control
            className='form-control'
            type={field.type}
            as={field.as}
            name={field.name}
            required={field.required}
            key={i}
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
      <Form.Group as={Row}>
        <Form.Label className='form-label' column sm='4'>
          {field.fName}
        </Form.Label>
        <Col sm='6 ' key={i}>
          <Form.Control
            className='form-control'
            type={field.type}
            as={field.as}
            name={field.name}
            // eslint-disable-next-line
            className='formsInp'
            key={i}
            placeholder={field.defaultValue}
            onChange={onChangeHandler}
            required={field.required}
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
            <Button type='submit'>Update Information</Button>
          </Form>
        </FormMain>
      </h4>
    </React.Fragment>
  );
};

export default InpForm;
