import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  SideBar,
  AdminMain,
  TableContainer,
  MainWrapper,
  NotPhone,
  FormWrapper,
} from './AdminPage.styles';
import ProfilePage from './../profilepage/Profilepage';
import LOGO from '../../assets/img/logo.png';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import OPTable from './AdminTable';
import Gears from './../../assets/img/gears.gif';
import InpForm from './InpForm';

import { toast } from '../../util/ToastUtil';
import { PopUp } from '../../util/DeleteConfirmUtil';
// const selectUserContext = React.createContext({});
const AdminPage = () => {
  let retrievedId = '';
  // eslint-disable-next-line
  let retrievedEmployee;
  let formattedData = [];
  const [data, setData] = useState([]);
  const [selectedEmp, setselectedEmp] = useState(false);
  const [ViewPanel, setViewPanel] = useState('Table');
  const [selectUser, setSelectUser] = useState('');
  const history = useHistory();
  const [Id, setId] = useState('');
  const [adminId, setAdminId] = useState([123456]);
  const [confirm, setConfirm] = useState(false);
  const getUsers = async () => {
    const users = await axios.get('/api/admin/users');

    users.data.data.forEach((employee, i) => {
      formattedData.push({
        role: employee.role,
        name: employee.name,
        email: employee.email,
        phoneNumber: !employee.phoneNumber ? '--' : employee.phoneNumber,
        status:
          employee.active === 0
            ? 'Relieved    ' +
            ' From - ' +
            moment(employee.lastLogin).format('DD/MMM/YYYY')
            : employee.active === 1
              ? 'Active'
              : 'Inactive' +
              ' From - ' +
              moment(employee.lastLogin).format('DD/MMM/YYYY'),
        empNo: !employee.empNo ? 'FW-----' : employee.empNo,
        joinDate: moment(employee.createdAt).format('DD/MMM/YYYY'),
        id: employee._id,
      });
    });
    setData(formattedData);
    let a = [];
    for (let i = 0; i < formattedData.length; i++) {
      if (formattedData[i].role === 'admin') {
        a.push(formattedData[i].id);
      }
      setAdminId([...a] || []);
    }
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
      Header: 'FW-ID',
      accessor: 'empNo',
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

  const DeleteUserFunction = async () => {
    try {
      await axios.delete(`/api/admin/employee/${Id}`);
      getUsers();
      toast('Employee Deleted');
    } catch (err) {
      if (err.response.status === 403) {
        toast('NOT AUTHORIZED:  Deleting employee is an admin only function');
      }
    }
  };

  const onClickHandler = async (e) => {
    retrievedId = e.target.children[6].innerHTML.toString().trim();

    retrievedEmployee = data.find((o) => o.id === retrievedId);
    setSelectUser(retrievedId);
    setId(retrievedId);
    if (e.target.value === '0') {
      // window.open(`/api/ejs/pdf-gen?employeeId=${retrievedId}`);
      // setSelectUser(retrievedId);
      // setId(retrievedId);

      setViewPanel('Profile');
    }

    if (e.target.value === '1') {
      await axios.post('/api/admin/change-activity', {
        userId: retrievedId,
        active: 0,
      });

      setselectedEmp(!selectedEmp);
    } else if (e.target.value === '2') {
      await axios.post('/api/admin/change-activity', {
        userId: retrievedId,
        active: 1,
      });
    } else if (e.target.value === '4') {
      setConfirm(true);
    } else if (e.target.value === '3') {
      await axios.post('/api/admin/change-activity', {
        userId: retrievedId,
        active: 2,
      });
    }
    setselectedEmp(!selectedEmp);
  };

  // ``` Child components starts here ```;
  var SidebarChild = (
    <SideBar>
      <div className='logoContainer'>
        <img alt='logo' src={LOGO}></img>
      </div>
      <div className='SideBarCompMain'>Dashboard</div>
      <div
        className='SideBarCompItem'
        style={ViewPanel === 'Table' ? { color: 'yellow' } : {}}
        onClick={(e) => setViewPanel('Table')}
        id='Table'
      >
        Employees
      </div>
      <div
        className='SideBarCompItem'
        id='Form'
        style={ViewPanel === 'Form' ? { color: 'yellow' } : {}}
        onClick={(e) => setViewPanel('Form')}
      >
        Add an Employee
      </div>

      <div className='Logout' onClick={logoutHandler}>
        <span>LOGOUT</span>
      </div>
    </SideBar>
  );

  var OpTableChild = (
    <OPTable
      data={data}
      columns={columns}
      onClickHandler={onClickHandler}
      getCellProps={() => ({})}
      adminId={adminId}
    />
  );

  var AddEmployeeChild = (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <span className='Admin'>Create a new employee</span>
      </div>
      <br />
      <React.Fragment>
        <FormWrapper>
          <InpForm getUsers={getUsers} />
        </FormWrapper>
      </React.Fragment>
    </div>
  );

  var NoPhoneChild = (
    <NotPhone>
      <div className='NotPhone-Main'>
        <div className='ErrorContainer'>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={Gears} className='gears' alt='Loading...' />
          </div>
          <br />
          <p className='PhoneError'>Sorry, We Don't Support Mobile View</p>
          <p className='PhoneError'> Please Switch to a Desktop</p>
        </div>
      </div>
    </NotPhone>
  );

  // ``` Child components Ends here ```;

  return (
    <React.Fragment>
      {confirm ? (
        <PopUp
          Funct={(e) => DeleteUserFunction()}
          state={confirm}
          setState={setConfirm}
        />
      ) : (
          <></>
        )}
      <MainWrapper>
        {SidebarChild}
        <AdminMain>
          {ViewPanel === 'Profile' ? (
            <ProfilePage userId={selectUser} retrievedId={Id} />
          ) : (
              <></>
            )}
          {ViewPanel === 'Table' ? (
            <div className='Admin'>Admin Panel</div>
          ) : (
              <></>
            )}

          {ViewPanel === 'Table' ? (
            <div className='EmpInfo'>Employee Information</div>
          ) : (
              <></>
            )}

          {ViewPanel === 'Form' ? AddEmployeeChild : <></>}

          <TableContainer
            style={{
              scrollDirection: 'horizontal',
            }}
          >
            {ViewPanel === 'Table' ? OpTableChild : <></>}
          </TableContainer>
        </AdminMain>
      </MainWrapper>
      {NoPhoneChild}
    </React.Fragment>
  );
};

export default AdminPage;
