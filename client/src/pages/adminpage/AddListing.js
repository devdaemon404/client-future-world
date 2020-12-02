import React, { useEffect, useState } from 'react';
import {
  SideBar,
  AdminMain,
  TableContainer,
  MainWrapper,
  NotPhone,
  FormWrapper,
  AdminHeader,
} from './AdminPage.styles';
import OPTable from './AdminTable';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { OPLoader } from '../../util/LoaderUtil';

const AddListing = () => {
  let formattedData = [];
  const [Selected, setSelected] = useState({});
  const [Jobs, setJobs] = useState([]);
  const [rawData, setRawData] = useState({});
  const [action, setAction] = useState(); // add , update

  const [isLoading, setIsLoading] = useState(false);
  const onClickHandler2 = (e) => {
    setSelected(e);
    handleShow();
    setAction('update');
  };
  useEffect(() => {
    let jobs;
    setIsLoading(true);
    (async () => {
      try {
        jobs = await axios.get('/api/job-posting');

        jobs = jobs.data;

        jobs.data.forEach((job, i) => {
          formattedData.push({
            experience: job.experience || '-',
            skills: job.skills || '-',
            salary: job.salary || '-',
            deadline: job.deadline || '-',
            imageUrl: job.imageUrl || '-',
            createdBy: job.createdBy || '-',
            createdAt: job.createdAt || '-',
            location: job.location || '-',
            shiftType: job.shiftType || '-',
            type: job.type || '-',
            longDescription: job.longDescription || '-',
            shortDescription: job.shortDescription || '-',
            title: job.title || '-',
            id: job._id || '-',
          });
        });

        console.log(formattedData);

        setJobs(formattedData);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const columns = [
    {
      Header: '#',
    },
    {
      Header: 'Job Title',
      accessor: 'title',
    },
    {
      Header: 'Job Type',
      accessor: 'type',
    },
    {
      Header: 'Shift Type',
      accessor: 'shiftType',
    },
    {
      Header: 'Job Location',
      accessor: 'location',
    },
    {
      Header: `Salary`,
      accessor: 'salary',
    },
    {
      Header: 'Application Deadline',
      accessor: 'deadline',
    },

    {
      Header: 'View',
      accessor: 'id',
    },
  ];

  // Modal Start

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let modalJsx = (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {action === 'add' ? 'Add New Job' : 'Edit Job'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='name@example.com' />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlSelect1'>
              <Form.Label>Example select</Form.Label>
              <Form.Control as='select'>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlSelect2'>
              <Form.Label>Example multiple select</Form.Label>
              <Form.Control as='select' multiple>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as='textarea' rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            {action === 'add' ? 'Save Job' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  // Modal End

  return (
    <>
      <OPLoader isLoading={isLoading} />

      <br />
      <div>
        <TableContainer>
          <OPTable
            data={Jobs}
            columns={columns}
            onClickHandler2={onClickHandler2}
            getCellProps={() => ({})}
            adminId={''}
          />
        </TableContainer>{' '}
        <div>
          <Button
            onClick={(e) => {
              handleShow();
              setAction('add');
            }}>
            {' '}
            Add a new Job
          </Button>
        </div>
      </div>

      {modalJsx}
    </>
  );
};

export default AddListing;
