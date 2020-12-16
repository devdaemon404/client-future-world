import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { DatePicker, Space, Select } from 'antd';
import { Container, Row, Col, Form } from 'react-bootstrap';

import { downloadAndZip } from '../../util/DownloadUtil';
import { config } from '../../util/RequestUtil';
import { toast } from '../../util/ToastUtil';

const { Option } = Select;

const UploadDownloadReport = () => {
  const [reimburseMonth, setReimburseMonth] = useState('');
  const [timeSheetMonth, setTimeSheetMonth] = useState('');
  const [fileList, setFileList] = useState([]);
  const [fileType, setFileType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleUpload = (e) => {
    setFileList([...e.target.files]);
  };

  const handleOptionChange = (value) => {
    setFileType(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = selectedDate;

    const splitDate = selectedDate.split('-');

    try {
      for (let file of fileList) {
        const formData = new FormData();
        formData.append('file', file);

        const employeeNo = file.name.split('.').slice(0, -1).join('.');
        const body = JSON.stringify({
          employeeNo,
          date,
          fileType,
          fileExtension: 'pdf',
        });
        let res;

        try {
          res = await axios.post('/api/file/financial-document', body, config);
        } catch (error) {
          console.log(error.response.data.error);
          toast(error.response.data.error);
          continue;
        }

        const { fileKey, url, userId } = res.data;
        const res2 = await axios.put(url, formData);

        if (res2.status === 200) {
          await axios.put(
            '/api/admin/register',
            JSON.stringify({
              userId,
              financialDocument: {
                documentType: fileType,
                fileKey,
                documentedDate: {
                  month: splitDate[1],
                  year: splitDate[0],
                },
              },
            }),
            config
          );
          toast(`File uploaded successfully for empNo: ${employeeNo}`);
          console.log(file.name.split('.').slice(0, -1).join('.'));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDownloadZip = async (documentType) => {
    try {
      let documentedMonth;
      if (documentType === 'reimburse') {
        if (reimburseMonth === '') return;
        documentedMonth = reimburseMonth.split('-')[1];
      } else if (documentType === 'timeSheet') {
        if (timeSheetMonth === '') return;
        documentedMonth = timeSheetMonth.split('-')[1];
      }
      const res = await axios.post(
        '/api/admin/all-fin-docs',
        {
          documentType,
          documentedYear: new Date().getFullYear().toString(),
          documentedMonth,
          current: 'month',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      const { downloadUrls } = res.data.data;
      downloadAndZip(downloadUrls);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <Container>
        <Row>
          <Col lg={12}>
            <div>
              <span className='info-type'>
                Download All Reimbursement Documents
              </span>
              <div className='select'>
                <b>Select Month </b>{' '}
                <Space direction='vertical'>
                  <DatePicker
                    onChange={(_, dateString) => {
                      setReimburseMonth(dateString);
                      console.log('DATE STRING', _, dateString);
                    }}
                    picker='month'
                  />
                </Space>
                <Button onClick={async (e) => handleDownloadZip('reimburse')}>
                  Download
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col lg={12}>
            <div>
              <span className='info-type'>
                Download All Timesheet Documents
              </span>
              <div className='select'>
                <b>Select Month </b>
                <Space direction='vertical'>
                  <DatePicker
                    onChange={(_, dateString) => {
                      setTimeSheetMonth(dateString);
                    }}
                    picker='month'
                  />
                </Space>
                <Button onClick={async (e) => handleDownloadZip('timeSheet')}>
                  Download
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col lg={12}>
            <span className='info-type'>Upload documents to all employees</span>
            <br />
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>
                  <b>Select File Type:</b>
                </Form.Label>
                <Select
                  defaultValue={fileType}
                  style={{ width: 120 }}
                  onChange={handleOptionChange}>
                  <Option value='disabled' disabled>
                    Select the filetype
                  </Option>
                  <Option value='timeSheet'>Timesheet</Option>
                  <Option value='paySlip'>Payslip</Option>
                </Select>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>
                  <b>Select Date:</b>
                </Form.Label>
                <DatePicker
                  onChange={(_, dateString) => {
                    console.log('DATE STRING', dateString);
                    setSelectedDate(dateString);
                  }}
                  picker='month'
                />
              </Form.Group>
              <input
                id='file-input'
                type='file'
                multiple
                onChange={handleUpload}
              />
              <Button type='submit'>Upload File</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default UploadDownloadReport;
