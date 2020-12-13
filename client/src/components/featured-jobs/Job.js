import React, { Fragment } from 'react';
import styles from './jobstyle.module.css';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';
import { uploadDocument } from '../../util/UploadFile';
import { OPLoader } from '../../util/LoaderUtil';
import { toast } from '../../util/ToastUtil';
import Axios from 'axios';

const Job = ({ ...data }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // month diff function

  const monthDiff = (str) => {
    const createdDate = moment(str).format('YYYY, M, DD');
    const currentDate = moment(new Date()).format('YYYY, M, DD');

    const months = moment([currentDate]).diff(
      moment([createdDate]),
      'days',
      true
    );

    // console.log(createdDate, currentDate, months);

    return months;
  };

  const {
    _id,
    title,
    shortDescription,
    longDescription,
    type,
    shiftType,
    location,
    createdAt,
    imageUrl,
    deadline,
    // salary,
    salary,
    experience,
  } = data;

  const formatSalary = (s) => {
    if (s.toString().toLowerCase().trim().startsWith('rs')) return s;
    else return `Rs. ${s}`;
  };

  const handleFileUpload = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    const fileKey = await uploadDocument(file, { confirmationUrl: null });
    if (!fileKey) {
      toast('Error uploading file. Try again');
      setIsLoading(false);
      return;
    }
    setModalShow(false);
    try {
      await Axios.post('/api/job-posting/respond', {
        jobId: _id,
        fileKey,
      });
      toast('Recommendation sent successfully');
    } catch (e) {
      toast('Error notifying admin. Try again');
    } finally {
      setIsLoading(false);
    }
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered>
        <Modal.Header closeButton className={styles.header}>
          <img
            src={imageUrl}
            style={{ paddingTop: '5px', marginRight: '25px' }}
            className='img-fluid'
            height='60px'
            width='80px'
            alt='Employer'
          />
          <h3 className='text-center' style={{ marginTop: '20px' }}>
            {title}
          </h3>
        </Modal.Header>
        <Modal.Body closeButton style={{ paddingTop: '0px' }}>
          <div class={styles.employerItem1}>
            <ul>
              <li>
                <i class='fas fa-map-marker-alt'></i>&nbsp;
                {location}
              </li>
              <li> | </li>
              <li>Posted On: {moment(createdAt).format('MM/DD/yyyy')}</li>
            </ul>
            <h5 style={{ marginTop: '20px' }}>Detailed Job Description</h5>
            <pre
              style={{
                paddingLeft: '5px',
                fontFamily: 'roboto',
                fontWeight: '500',
              }}>
              {longDescription}
            </pre>
            <span class={styles.tag1}>
              Salary: <b>{formatSalary(salary)}</b>
            </span>
            <span class={styles.tag1}>
              Experience Required:&nbsp;
              <b>{experience}</b>&nbsp; years
            </span>
            <span class={styles.tag1}>
              Shift: &nbsp;
              <b>{shiftType}</b>
            </span>
            <span class={styles.tag1}>
              Apply before: <b>{moment(deadline).format('DD/MM/yyyy')}</b>
            </span>

            {/* <span class={styles.spanTwo}>{shiftType}</span> */}
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{ borderTop: 'none', display: 'block', paddingLeft: '30px' }}>
          <input type='file' id='upload' hidden onChange={handleFileUpload} />
          <label className={styles.button1} for='upload'>
            Upload Resume
          </label>
          {/* <Button onClick={props.onHide} className={styles.button2}>
            Save
          </Button> */}
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Fragment>
      <div class={styles.employerItem} onClick={() => setModalShow(true)}>
        <OPLoader isLoading={isLoading} />
        <img
          src={imageUrl}
          className='img-fluid rounded mx-auto d-block'
          width='64px'
          alt='Employer'
        />

        <h3>{title}</h3>

        <ul>
          <li>
            <i class='fas fa-map-marker-alt'></i>&nbsp;
            {location}
          </li>
          <li> | </li>
          <li>Posted On: {moment(createdAt).format('MM/DD/yyyy')}</li>
        </ul>
        {/* <br /> */}
        <p style={{ marginTop: '5px' }}>{shortDescription}</p>
        <span class={styles.spanOne}>{type}</span>
        <span class={styles.spanTwo}>{shiftType}</span>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        {...data}
      />
    </Fragment>
  );
};

export default Job;
