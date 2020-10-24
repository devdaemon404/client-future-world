import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import homepage from '../pages/homepage/homepage';
import LoginPage from '../pages/loginpage/loginpage';
import personalpage from '../pages/secondpage/personalpage';
// import formpage from '../pages/formpages/formpage';
import Address from '../pages/formpages/personalformpages/Address';
import BasicInformation1 from '../pages/formpages/personalformpages/BasicInformation1';
import BasicInformation2 from '../pages/formpages/personalformpages/BasicInformation2';
import DesignationInformation from '../pages/formpages/personalformpages/DesignationInformation';
import DocumentalInformation from '../pages/formpages/personalformpages/DocumentalInformation';
import LanguageInformation from '../pages/formpages/personalformpages/LanguageInformation';

import healthpage from '../pages/secondpage/healthpage';
import HealthInformation from '../pages/formpages/healthformpages/HealthInformation';
import FamilyInformation from '../pages/formpages/healthformpages/FamilyInformation';
import otherpage from '../pages/secondpage/otherpage';
import OtherInformation from '../pages/formpages/otherformpages/OtherInformation';
import Uploads from '../pages/formpages/otherformpages/Uploads';
import Profilepage from '../pages/profilepage/Profilepage';
import AdminPage from '../pages/adminpage/AdminPage';
import schoolandworkpage from '../pages/secondpage/schoolandworkpage';
import AcademicInformation from '../pages/formpages/workformpages/AcademicInformation';
import WorkInformation from '../pages/formpages/workformpages/WorkInformation';
import axios from 'axios';
import Payslippage from '../pages/secondpage/Payslippage';

const Routes = () => {
  let history = useHistory();
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get('/api/auth/validate-token').then();
        console.log(res.data.role);
        if (res.data.role === 'admin') {
          history.push('/admin');
        } else {
          history.push('/');
        }
      } catch (error) {
        history.push('/login');
      }
    };

    if (process.env.NODE_ENV === 'production') checkLogin();
    // eslint-disable-next-line
  }, []);
  return (
    <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className='switch-wrapper'
    >
      <Route exact path='/' component={homepage} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/payslip' component={Payslippage} />
      <Route exact path='/personal' component={personalpage} />
      <Route exact path='/information/address' component={Address} />
      <Route
        exact
        path='/information/basicInformation-1'
        component={BasicInformation1}
      />
      <Route
        exact
        path='/information/basicInformation-2'
        component={BasicInformation2}
      />
      <Route
        exact
        path='/information/designationInformation'
        component={DesignationInformation}
      />
      <Route
        exact
        path='/information/documentalInformation'
        component={DocumentalInformation}
      />
      <Route
        exact
        path='/information/languageInformation'
        component={LanguageInformation}
      />

      <Route exact path='/work' component={schoolandworkpage} />
      <Route
        exact
        path='/information/academicInformation'
        component={AcademicInformation}
      />
      <Route
        exact
        path='/information/workInformation'
        component={WorkInformation}
      />

      <Route exact path='/health' component={healthpage} />
      <Route
        exact
        path='/information/healthInformation'
        component={HealthInformation}
      />
      <Route
        exact
        path='/information/familyInformation'
        component={FamilyInformation}
      />

      <Route exact path='/other' component={otherpage} />
      <Route
        exact
        path='/information/otherInformation'
        component={OtherInformation}
      />
      <Route exact path='/information/uploads' component={Uploads} />

      <Route exact path='/admin' component={AdminPage} />

      <Route exact path='/profile' component={Profilepage} />
    </AnimatedSwitch>
  );
};

export default Routes;
