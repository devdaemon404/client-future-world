import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  SideBar,
  AdminMain,
  TableContainer,
  MainWrapper,
  NotPhone,
} from './AdminPage.styles';
import { Form, Button } from 'react-bootstrap';
import LOGO from '../../assets/img/logo.png';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import OPTable from './AdminTable';
import Gears from './../../assets/img/gears.gif';
// const selectUserContext = React.createContext({});
const AdminPage = () => {
  let retrievedId = '';
  // eslint-disable-next-line
  let retrievedEmployee;
  let formattedData = [];
  const [data, setData] = useState([]);
  const [selectedEmp, setselectedEmp] = useState(false);
  const [formTable, setFormTable] = useState('Table');
  const [newUserDetails, setNewUserDetails] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });
  const [authMessage, setauthMessage] = useState('');
  const [authorized, setAuthorized] = useState(0);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const getUsers = async () => {
    const users = await axios.get('/api/admin/users');

    users.data.data.forEach((employee, i) => {
      formattedData.push({
        name: employee.name,
        email: employee.email,
        phoneNumber: !employee.phoneNumber ? '--' : employee.phoneNumber,
        status:
          employee.active === 0
            ? 'Relieved'
            : employee.active === 1
            ? 'Active'
            : 'Inactive',

        joinDate: moment(employee.createdAt).format('DD/MMM/YYYY hh:mm:ss'),
        id: employee._id,
      });
    });
    setData(formattedData);
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, [selectedEmp]);

  const columns = [
    {
      Header: '#',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Email Address',
      accessor: 'email',
    },
    {
      Header: 'Phone Number',
      accessor: 'phoneNumber',
    },
    {
      Header: `Status`,
      accessor: 'status',
    },
    {
      Header: 'Date Of Joining',
      accessor: 'joinDate',
    },

    {
      Header: 'Action',
      accessor: 'id',
    },
  ];
  const logoutHandler = async () => {
    await axios.get('/api/auth/logout');
    history.push('/login');
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setAuthorized(0);
    setLoading(true);
    try {
      const { name, email, phoneNumber } = newUserDetails;
      var result = await axios.post('/api/auth/register', {
        name,
        email,
        phoneNumber,
      });
      if (result) {
        setAuthorized(1);
        await getUsers();
        setLoading(false);
      }
    } catch (error) {
      setAuthorized(2);
      if (error.response.status === 400) {
        setLoading(false);
        setauthMessage('User Already registered');
      } else if (error.response.status === 401) {
        setauthMessage('Try Login again, Not Authorized');
      }
    }
  };

  const onClickHandler = async (e) => {
    retrievedId = e.target.children[5].innerHTML.toString().trim();

    retrievedEmployee = data.find((o) => o.id === retrievedId);
    if (e.target.value === '0') {
      window.open(`/api/ejs/pdf-gen?employeeId=${retrievedId}`);
    }

    if (e.target.value === '1') {
      await axios.post('/api/admin/change-activity', {
        employeeId: retrievedId,
        active: 0,
      });

      setselectedEmp(!selectedEmp);
    } else if (e.target.value === '2') {
      await axios.post('/api/admin/change-activity', {
        employeeId: retrievedId,
        active: 1,
      });
    } else if (e.target.value === '3') {
      await axios.post('/api/admin/change-activity', {
        employeeId: retrievedId,
        active: 2,
      });
    }
    setselectedEmp(!selectedEmp);
  };

  return (
    <React.Fragment>
      <MainWrapper>
        {/* <selectUserContext.Provider value={retrievedEmployee} /> */}
        <SideBar>
          <div className='logoContainer'>
            <img alt='logo' src={LOGO}></img>
          </div>
          <div className='SideBarCompMain'>Dashboard</div>
          <div
            className='SideBarCompItem'
            style={formTable === 'Table' ? { color: 'yellow' } : {}}
            onClick={(e) => setFormTable('Table')}
            id='Table'
          >
            Employees
          </div>
          <div
            className='SideBarCompItem'
            id='Form'
            style={formTable === 'Form' ? { color: 'yellow' } : {}}
            onClick={(e) => setFormTable('Form')}
          >
            Add an Employee
          </div>
          <div className='Logout' onClick={logoutHandler}>
            <span>LOGOUT</span>
          </div>
        </SideBar>
        <AdminMain>
          <div className='Admin'>Admin Panel</div>
          <div className='EmpInfo'>
            {formTable === 'Table' ? 'Employee Information' : ''}
          </div>

          <TableContainer>
            {formTable === 'Table' ? (
              <OPTable
                data={data}
                columns={columns}
                onClickHandler={onClickHandler}
                getCellProps={() => ({})}
              />
            ) : (
              <React.Fragment>
                <Form className='addEmployeeForm' onSubmit={onFormSubmit}>
                  <h4 className='addEmpHead'>Add a new Employee</h4>
                  <Form.Group>
                    <Form.Control
                      type='text'
                      className='FormInputs'
                      placeholder='Employee Name'
                      required
                      name='Name'
                      onChange={(e) =>
                        setNewUserDetails({
                          ...newUserDetails,
                          name: e.target.value,
                        })
                      }
                    />

                    <Form.Control
                      type='email'
                      className='FormInputs'
                      placeholder='Employee Email'
                      name='Email'
                      required
                      onChange={(e) =>
                        setNewUserDetails({
                          ...newUserDetails,
                          email: e.target.value,
                        })
                      }
                    />

                    <Form.Control
                      type='number'
                      className='FormInputs'
                      placeholder='Employe PhoneNo. (without country code)'
                      min={1000000000}
                      max={9999999999}
                      name='phoneNumber'
                      required
                      onChange={(e) =>
                        setNewUserDetails({
                          ...newUserDetails,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Button
                    variant='secondary'
                    type='submit'
                    className='ButtonForm'
                  >
                    {!loading ? 'Add Employee' : 'Loading'}
                  </Button>
                  {authorized === 1 ? (
                    <p
                      id='confirm'
                      style={{
                        color: 'green',
                        width: '100%',
                        textAlign: 'Center',
                        fontWeight: 500,
                      }}
                    >
                      New User Added (Confirmation Mail has been sent){' '}
                    </p>
                  ) : authorized === 2 ? (
                    <p
                      id='confirm'
                      style={{
                        color: 'red',
                        width: '100%',
                        textAlign: 'Center',
                        fontWeight: 500,
                      }}
                    >
                      {authMessage}
                    </p>
                  ) : (
                    <p
                      id='confirm'
                      style={{
                        color: 'red',
                        width: '100%',
                        height: '24px',
                        textAlign: 'Center',
                        fontWeight: 500,
                      }}
                    >
                      {'    '}
                    </p>
                  )}
                </Form>
              </React.Fragment>
            )}
          </TableContainer>
        </AdminMain>
      </MainWrapper>
      <NotPhone>
        <div className='NotPhone-Main'>
          <div className='ErrorContainer'>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={Gears} className='gears' alt="Loading..." />
            </div>
            <br />
            <p className='PhoneError'>Sorry, We Don't Support Mobile View</p>
            <p className='PhoneError'> Please Switch to Landscape </p>
          </div>
        </div>
      </NotPhone>
    </React.Fragment>
  );
};

export default AdminPage;
