import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  SideBar,
  AdminMain,
  TableContainer,
  MainWrapper,
  NotPhone,
  FormWrapper,
  AdminHeader,
} from './AdminPage.styles';
import ProfilePage from './../profilepage/Profilepage';
import LOGO from '../../assets/img/logo.png';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import OPTable from './AdminTable';
import Gears from './../../assets/img/gears.gif';
import InpForm from './InpForm';

import { toast } from '../../util/ToastUtil';
import { OPLoader } from '../../util/LoaderUtil';
import { PopUp } from '../../util/DeleteConfirmUtil';
// const selectUserContext = React.createContext({});
const AdminPage = () => {
  let retrievedId = '';
  // eslint-disable-next-line
  let retrievedEmployee;
  let formattedData = [];
  const [data, setData] = useState([]);
  const [selectedEmp, setselectedEmp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const deleteUser = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/admin/employee/${Id}`);
      getUsers();
      toast('Employee Deleted');
    } catch (err) {
      if (err.response.status === 403) {
        return toast('NOT AUTHORIZED:  Deleting employee is an admin only function');
      }
      toast(err.response.data.error)
    }
    finally {
      setIsLoading(false)
    }
  };

  const onClickHandler = async (optionIndex, userId) => {
    retrievedId = userId;

    retrievedEmployee = data.find((o) => o.id === retrievedId);
    setSelectUser(retrievedId);
    setId(retrievedId);
    if (optionIndex === '0') {
      setViewPanel('Profile');
    }

    const changeEmployeeStatus = async (status) => {
      try {
        setIsLoading(true)
        const url = '/api/admin/change-activity';
        await axios.post(url, {
          userId: retrievedId,
          active: status
        })
        await getUsers();
      } catch (e) {
        toast('Error changing status. Try again')
      }
      finally {
        setIsLoading(false)
      }
    }

    if (optionIndex === '1') {
      await changeEmployeeStatus(0)

      setselectedEmp(!selectedEmp);
    } else if (optionIndex === '2') {
      await changeEmployeeStatus(1);
    } else if (optionIndex === '3') {
      await changeEmployeeStatus(2);
    } else if (optionIndex === '4') {
      setConfirm(true);
      setselectedEmp(!selectedEmp);
    };
  }

  // ``` Child components starts here ```;
  var SidebarChild = (
    <SideBar>
      <div className='logoContainer' onClick={() => {
        setViewPanel('Table')
      }}>
        <img alt='logo' src={LOGO}></img>
      </div>
      <div className='SideBarCompMain'>Admin</div>
      <div
        className='SideBarCompItem'
        style={ViewPanel === 'Table' ? { backgroundColor: '#3F46CC', width: '100%' } : {}}
        onClick={(e) => setViewPanel('Table')}
        id='Table'
      >
        Employees
      </div>
      <div
        className='SideBarCompItem'
        id='Form'
        style={ViewPanel === 'Form' ? { backgroundColor: '#3F46CC', width: '100%' } : {}}
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
      <div>
        <span className='EmpInfo'>New Employee Creation</span>
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
          onDelete={deleteUser}
          state={confirm}
          setState={setConfirm}
        />
      ) : (
          <></>
        )}
      <MainWrapper>
        {SidebarChild}
        <OPLoader isLoading={isLoading} />
        <AdminHeader>
          <h2>
            Future World Consultancy<br /><span>Admin Dashboard</span>
          </h2>
        </AdminHeader>
        <AdminMain>
          {ViewPanel === 'Profile' ? (
            <ProfilePage userId={selectUser} retrievedId={Id} />
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
