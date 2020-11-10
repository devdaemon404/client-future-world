import React, { useEffect, useState, useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import homepage from '../pages/homepage/homepage';
import LoginPage2 from '../pages/loginpage/LoginPage2';
import ProfilePage from '../pages/profilepage/Profilepage';
import PersonalPage from '../pages/secondpage/personalpage';
// import formpage from '../pages/formpages/formpage';
import Address from '../pages/formpages/personalformpages/Address';
import BasicInformation1 from '../pages/formpages/personalformpages/BasicInformation1';
import BasicInformation2 from '../pages/formpages/personalformpages/BasicInformation2';
import DesignationInformation from '../pages/formpages/personalformpages/DesignationInformation';
import DocumentalInformation from '../pages/formpages/personalformpages/DocumentalInformation';
import LanguageInformation from '../pages/formpages/personalformpages/LanguageInformation';

import HealthPage from '../pages/secondpage/healthpage';
import HealthInformation from '../pages/formpages/healthformpages/HealthInformation';
import FamilyInformation from '../pages/formpages/healthformpages/FamilyInformation';
import OtherPage from '../pages/secondpage/otherpage';
import OtherInformation from '../pages/formpages/otherformpages/OtherInformation';
import Uploads from '../pages/formpages/otherformpages/Uploads';

import AdminPage from '../pages/adminpage/AdminPage';
import SchoolAndWorkPage from '../pages/secondpage/schoolandworkpage';
import AcademicInformation from '../pages/formpages/workformpages/AcademicInformation';
import WorkInformation from '../pages/formpages/workformpages/WorkInformation';
import axios from 'axios';
import Payslippage from '../pages/secondpage/Payslippage';
import LoadingGIF from '../assets/img/loading.gif';
import PrivateRoute from './PrivateRoute';
import UserContext from '../context/userContext';

const Routes = () => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, checkLogin } = useContext(UserContext);
  useEffect(() => {
    const _checkLogin = async () => {
      try {
        setIsLoading(true);
        checkLogin();
        const res = await axios.get('/api/auth/validate-token').then();
        // console.log(res.data.role);

        if (res.data.role === 'admin') {
          history.push('/admin');
        } else if (res.data.role === 'sub-admin') {
          history.push('/admin');
        } else {
          history.push('/');
        }
      } catch (error) {
        history.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    _checkLogin();
    // eslint-disable-next-line
  }, []);
  return isLoading ? (
    <div>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.9)',
          width: '100vw',
          height: '100vh',
        }}></div>
      <div
        style={{
          display: 'block',
          position: 'absolute',
          zIndex: 1051,
          top: '50%',
          left: '50%',
        }}>
        <div className='col'>
          <div>
            <img alt='Page Loading' src={LoadingGIF}></img>
          </div>
          <span
            className='row text-center'
            style={{
              marginLeft: '5px',
              fontSize: '24px',
              color: '#f8f8f8',
            }}>
            Loading ...
          </span>
        </div>
      </div>
    </div>
  ) : (
    <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className='switch-wrapper'>
      <PrivateRoute exact path='/' component={homepage} />
      <Route exact path='/login' component={LoginPage2} />
      <PrivateRoute exact path='/profile' component={ProfilePage} />

      <PrivateRoute exact path='/payslip' component={Payslippage} />
      <PrivateRoute exact path='/personal' component={PersonalPage} />
      <PrivateRoute exact path='/information/address' component={Address} />
      <PrivateRoute
        exact
        path='/information/basicInformation-1'
        component={BasicInformation1}
      />
      <PrivateRoute
        exact
        path='/information/basicInformation-2'
        component={BasicInformation2}
      />
      <PrivateRoute
        exact
        path='/information/designationInformation'
        component={DesignationInformation}
      />
      <PrivateRoute
        exact
        path='/information/documentalInformation'
        component={DocumentalInformation}
      />
      <PrivateRoute
        exact
        path='/information/languageInformation'
        component={LanguageInformation}
      />

      <PrivateRoute exact path='/work' component={SchoolAndWorkPage} />
      <PrivateRoute
        exact
        path='/information/academicInformation'
        component={AcademicInformation}
      />
      <PrivateRoute
        exact
        path='/information/workInformation'
        component={WorkInformation}
      />

      <PrivateRoute exact path='/health' component={HealthPage} />
      <PrivateRoute
        exact
        path='/information/healthInformation'
        component={HealthInformation}
      />
      <PrivateRoute
        exact
        path='/information/familyInformation'
        component={FamilyInformation}
      />

      <PrivateRoute exact path='/other' component={OtherPage} />
      <PrivateRoute
        exact
        path='/information/otherInformation'
        component={OtherInformation}
      />
      <PrivateRoute exact path='/information/uploads' component={Uploads} />

      <PrivateRoute exact path='/admin' component={AdminPage} />
    </AnimatedSwitch>
  );
};

export default Routes;
