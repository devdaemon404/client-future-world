import React, { useState, useEffect } from 'react';
import { SideBar, AdminMain, TableContainer } from './adminpage.styles';

import LOGO from '../../assets/img/logo.png';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import OPTable from './Table';
const selectUserContext = React.createContext({});
const AdminPage = () => {
  let retrievedId = '';
  let retrievedEmployee;
  let formattedData = [];
  const [data, setData] = useState([]);
  const [selectedEmp, setselectedEmp] = useState(false);
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
        height: '120vh',
      }}
    >
      <selectUserContext.Provider value={retrievedEmployee} />
      <SideBar>
        <div className='logoContainer'>
          <img alt='logo' src={LOGO}></img>
        </div>
        <div className='SideBarCompMain'>Dashboard</div>
        <div className='SideBarCompItem'>Employees</div>
        <div className='Logout' onClick={logoutHandler}>
          <span>LOGOUT</span>
        </div>
      </SideBar>
      <AdminMain>
        <div className='Admin'>Admin</div>
        <div className='EmpInfo'>Employee Information</div>

        <TableContainer>
          <OPTable
            data={data}
            columns={columns}
            onClickHandler={onClickHandler}
            getCellProps={() => ({})}
          />
        </TableContainer>
      </AdminMain>
    </div>
  );
};

export default AdminPage;
