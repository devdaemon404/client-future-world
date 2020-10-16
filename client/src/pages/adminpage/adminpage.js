import React, { useState, useEffect } from 'react';
import { SideBar, AdminMain, TableContainer } from './Adminpage.styles';
import { Form, Button } from 'react-bootstrap';
import LOGO from '../../assets/img/logo.png';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import OPTable from './AdminTable';
// const selectUserContext = React.createContext({});
const AdminPage = () => {
  let retrievedId = '';
  let retrievedEmployee;
  let formattedData = [];
  const [data, setData] = useState([]);
  const [selectedEmp, setselectedEmp] = useState(false);
  const [formTable, setFormTable] = useState('Table');
  const [newUserDetails, setNewUserDetails] = useState({ name: '', email: '' });
  const [authorized, setAuthorized] = useState(0);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const getUsers = async () => {
    const users = await axios.get('/api/admin/users');

    users.data.data.forEach((employee, i) => {
      formattedData.push({
        name: employee.name,
        email: employee.email,
        phone: !employee.phone ? '--' : employee.phone,
        status:
          employee.active === 0
            ? 'Relieved'
            : employee.active === 1
            ? 'Active'
            : 'Inactive',

        joinDate: employee.createdAt,
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
      accessor: 'phone',
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
      const { name, email } = newUserDetails;
      var result = await axios.post('/api/auth/register', { name, email });

      if (result) {
        setAuthorized(1);

        setLoading(false);
      }
    } catch (error) {
      setAuthorized(2);

      setLoading(false);
    }
  };

  const onClickHandler = async (e) => {
    retrievedId = e.target.children[4].outerText.toString();

    retrievedEmployee = data.find((o) => o.id === retrievedId);
    if (e.target.value === '0') {
      history.push('/profile');
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
    }
    setselectedEmp(!selectedEmp);
  };

  return (
    <div
      style={{
        margin: 0,
        boxSizing: 'border-box',
        padding: 0,
        backgroundColor: '#f4f4f4',
        height: '100vh',
      }}
    >
      {/* <selectUserContext.Provider value={retrievedEmployee} /> */}
      <SideBar>
        <div className='logoContainer'>
          <img alt='logo' src={LOGO}></img>
        </div>
        <div className='SideBarCompMain'>Dashboard</div>
        <div
          className='SideBarCompItem'
          style={
            formTable === 'Table' ? { color: 'yellow' } : { color: 'white' }
          }
          onClick={(e) => setFormTable('Table')}
          id='Table'
        >
          Employees
        </div>
        <div
          className='SideBarCompItem'
          id='Form'
          style={
            formTable === 'Form' ? { color: 'yellow' } : { color: 'white' }
          }
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
              <Form className='addEmployeeForm'>
                <h4 className='addEmpHead'>Add a new Employee</h4>
                <Form.Group>
                  <Form.Control
                    type='text'
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
                  <br />
                  <Form.Control
                    type='email'
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
                </Form.Group>

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
                    Not Authorized
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
                <Button
                  variant='secondary'
                  type='submit'
                  className='ButtonForm'
                  onClick={onFormSubmit}
                >
                  {!loading ? 'Add Employee' : 'Loading'}
                </Button>
              </Form>
            </React.Fragment>
          )}
        </TableContainer>
      </AdminMain>
    </div>
  );
};

export default AdminPage;
