import React, { Fragment } from 'react';
import styles from './jobstyle.module.css';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';

const Job = ({ ...data }) => {
  const [modalShow, setModalShow] = React.useState(false);

  // month diff function

  const monthDiff = (str) => {
    const createdDate = moment(str).format('YYYY, M, DD');
    const currentDate = moment(new Date()).format('YYYY, M, DD');

    const months = moment([currentDate]).diff(
      moment([createdDate]),
      'months',
      true
    );

    // console.log(createdDate, currentDate, months);

    return months;
  };

  const {
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
          <h3 className='text-center'>{title}</h3>
        </Modal.Header>
        <Modal.Body closeButton style={{ paddingTop: '0px' }}>
          <div class={styles.employerItem1}>
            <ul>
              <li>
                <i class='fas fa-map-marker-alt'></i>
                {location}
              </li>
              <li>{monthDiff(createdAt)} months ago</li>
            </ul>
            <p>{longDescription}</p>
            <span class={styles.tag1}>Salary: {salary}</span>
            <span class={styles.tag1}>
              Experience Required: {experience} years
            </span>
            <span class={styles.tag1}>{shiftType}</span>
            <span class={styles.tag1}>Apply before: {deadline}</span>

            {/* <span class={styles.spanTwo}>{shiftType}</span> */}
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{ borderTop: 'none', display: 'block', paddingLeft: '30px' }}>
          <Button onClick={props.onHide} className={styles.button1}>
            Upload Resume
          </Button>
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
        <img
          src={imageUrl}
          className='img-fluid'
          height='50px'
          width='70px'
          alt='Employer'
        />
        <h3>{title}</h3>

        <ul>
          <li>
            <i class='fas fa-map-marker-alt'></i>
            {location}
          </li>
          <li>{monthDiff(createdAt)} months ago</li>
        </ul>
        <p>{shortDescription}</p>
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
