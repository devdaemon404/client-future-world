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
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import axios from 'axios';
import { OPLoader } from '../../util/LoaderUtil';
import moment from 'moment';
const AddListing = () => {
  let formattedData = [];
  const [Selected, setSelected] = useState({});
  const [Jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState({
    experience: '',

    salary: '',
    deadline: '',
    imageUrl: '',
    createdAt: '',
    createdBy: '',
    location: '',
    shiftType: '',
    type: '',
    longDescription: '',
    shortDescription: '',
    title: '',
  });

  const [rawData, setRawData] = useState({});
  const [action, setAction] = useState(); // add , update
  const [a, setA] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const onClickHandler2 = (e) => {
    setSelected(e);
    console.log(Selected);
    handleShow();
    setAction('update');
  };

  useEffect(() => {
    (async () => {
      let selectedJobData = await axios.get(`/api/job-posting/${Selected}`);
      selectedJobData = selectedJobData.data.data;
      setSelectedJob(selectedJobData);
    })();
  }, [Selected]);

  useEffect(() => {
    let jobs;
    setIsLoading(true);
    (async () => {
      try {
        jobs = await axios.get('/api/job-posting', selectedJob);

        jobs = jobs.data;
        setRawData(jobs.data);

        jobs.data.forEach((job, i) => {
          formattedData.push({
            experience: job.experience || '-',
            salary: job.salary || '-',
            deadline: moment(job.deadline).format('DD/MM/YYYY') || '-',
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
  }, [a]);

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

  const handleDelete = async () => {
    await axios.delete(`/api/job-posting/${Selected}`);
    setIsLoading(true);
    handleClose();
  };
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);

    setTimeout(function () {
      setA(a + 4);
      setIsLoading(false);
    }, 2000);
  };
  const handleShow = () => {
    setShow(true);
    console.log(rawData);
  };

  const onJobSubmit = (e) => {
    e.preventDefault();
    handleClose();
    console.log(selectedJob);

    if (action === 'add') {
      addJob();
    } else {
      // call update api
      updateJob();
    }
  };

  // add job Api

  const addJob = async () => {
    try {
      setIsLoading(true);
      let jobToBePosted = await axios.post('/api/job-posting', selectedJob);
      setA(...(a + 1));
      setIsLoading(false);
    } catch (error) {}
  };
  // update job Api
  const updateJob = async () => {
    try {
      let newJobUpdated = await axios.put(
        `/api/job-posting/${Selected}`,
        selectedJob
      );
      setIsLoading(true);
    } catch (error) {}
  };

  let modalJsx = (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {action === 'add' ? 'Add New Job' : 'Edit Job'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={onJobSubmit}>
          <Modal.Body>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder={'JAVA Developer W/ 5 years of experience '}
                value={selectedJob.title}
                required
                onChange={(e) => {
                  setSelectedJob({ ...selectedJob, title: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>Job Type</Form.Label>
              <Form.Control
                type='text'
                placeholder={'JAVA Developer / Node Developer '}
                value={selectedJob.type}
                required
                onChange={(e) => {
                  setSelectedJob({ ...selectedJob, type: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>Shift Type</Form.Label>
              <Form.Control
                placeholder={'Full-Time / Part-Time'}
                type='text'
                value={selectedJob.shiftType}
                required
                onChange={(e) => {
                  setSelectedJob({ ...selectedJob, shiftType: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>Job Location</Form.Label>
              <Form.Control
                placeholder={'City / WFH'}
                value={selectedJob.location}
                type='text'
                required
                onChange={(e) => {
                  setSelectedJob({ ...selectedJob, location: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>Created At</Form.Label>
              <Form.Control
                value={moment(selectedJob.createdAt).format('DD/MMM/YYYY')}
                type='text'
                disabled
                defaultValue={moment().format('DD/MM/YYYY')}
                required
                onChange={(e) => {
                  setSelectedJob({ ...selectedJob, createdAt: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>Company Image URL</Form.Label>
              <Form.Control
                type='text'
                placeholder={'https://www.company.com/logo.jpg'}
                value={selectedJob.imageUrl}
                required
                onChange={(e) => {
                  setSelectedJob({ ...selectedJob, imageUrl: e.target.value });
                }}
              />
            </Form.Group>{' '}
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>CTC Offered</Form.Label>
              <Form.Control
                type='text'
                placeholder={'Rs. 3,00,000'}
                value={selectedJob.salary}
                required
                onChange={(e) => {
                  setSelectedJob({ ...selectedJob, salary: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type='date'
                placeholder={'DD/MM/YYYY'}
                value={selectedJob.deadline}
                required
                onChange={(e) => {
                  setSelectedJob({ ...selectedJob, deadline: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1'></Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>Relevent Experience (Years)</Form.Label>
              <Form.Control
                placeholder={'2 Years'}
                type='text'
                value={selectedJob.experience}
                required
                onChange={(e) => {
                  setSelectedJob({
                    ...selectedJob,
                    experience: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlSelect1'>
              <Form.Group controlId='exampleForm.ControlTextarea1'>
                <Form.Label>Short Description</Form.Label>
                <Form.Control
                  as='textarea'
                  value={selectedJob.shortDescription}
                  rows={2}
                  placeholder={'A brief about the job'}
                  required
                  onChange={(e) => {
                    setSelectedJob({
                      ...selectedJob,
                      shortDescription: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group controlId='exampleForm.ControlTextarea1'>
                <Form.Label>Long Description</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={5}
                  placeholder={
                    'Enter \n1. Primary Skills \n2. Secondary Skills \n3. Additional Skills \n4. Additional Job Information '
                  }
                  value={selectedJob.longDescription}
                  required
                  onChange={(e) => {
                    setSelectedJob({
                      ...selectedJob,
                      longDescription: e.target.value,
                    });
                  }}
                />
              </Form.Group>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {action === 'add' ? (
              <Button variant='danger' onClick={handleClose}>
                Close
              </Button>
            ) : (
              <Button variant='danger' onClick={handleDelete}>
                Delete Job
              </Button>
            )}
            <Button variant='primary' type='submit'>
              {action === 'add' ? 'Save Job' : 'Save Changes'}
            </Button>
          </Modal.Footer>{' '}
        </Form>
      </Modal>
    </>
  );

  // Modal End

  return (
    <>
      <OPLoader isLoading={isLoading} />

      <br />
      <div>
        {' '}
        <div>
          <div style={{ float: 'left', left: 220 }}>
            <Button
              size='sm'
              style={{ background: '#3f46cc' }}
              onClick={(e) => {
                handleShow();
                setSelectedJob({});
                setAction('add');
              }}>
              {' '}
              Add Job
            </Button>
          </div>
          <br />
          <br />
        </div>
        <TableContainer>
          <OPTable
            data={Jobs}
            columns={columns}
            onClickHandler2={onClickHandler2}
            getCellProps={() => ({})}
            adminId={''}
          />
        </TableContainer>{' '}
      </div>

      {modalJsx}
    </>
  );
};

export default AddListing;
