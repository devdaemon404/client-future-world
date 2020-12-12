import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Row, Col, DatePicker, Space } from 'antd';

import { downloadAndZip } from '../../util/DownloadUtil';

const DownloadReport = () => {
  const [reimburseMonth, setReimburseMonth] = useState('');
  const [timeSheetMonth, setTimeSheetMonth] = useState('');

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
      <Row>
        <Col span={12}>
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
      <Row>
        <Col span={12}>
          <div>
            <span className='info-type'>Download All Timesheet Documents</span>
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
    </Fragment>
  );
};

export default DownloadReport;
