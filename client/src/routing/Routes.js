import React from 'react';
import { Route, Switch } from 'react-router-dom';
import homepage from '../pages/homepage/homepage';
import loginpage from '../pages/loginpage/loginpage';
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
import schoolandworkpage from '../pages/secondpage/schoolandworkpage';
import AcademicInformation from '../pages/formpages/workformpages/AcademicInformation';
import WorkInformation from '../pages/formpages/workformpages/WorkInformation';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={homepage} />
      <Route exact path='/login' component={loginpage} />

      <Route exact path='/personal' component={personalpage} />
      <Route exact path='/information/address' component={Address} />
      <Route exact path='/information/basicInformation-1' component={BasicInformation1} />
      <Route exact path='/information/basicInformation-2' component={BasicInformation2} />
      <Route exact path='/information/designationInformation' component={DesignationInformation} />
      <Route exact path='/information/documentalInformation' component={DocumentalInformation} />
      <Route exact path='/information/languageInformation' component={LanguageInformation} />

      <Route exact path='/work' component={schoolandworkpage} />
      <Route exact path='/information/academicInformation' component={AcademicInformation} />
      <Route exact path='/information/workInformation' component={WorkInformation} />

      <Route exact path='/health' component={healthpage} />
      <Route exact path='/information/healthInformation' component={HealthInformation} />
      <Route exact path='/information/familyInformation' component={FamilyInformation} />

      <Route exact path='/other' component={otherpage} />
      <Route exact path='/information/otherInformation' component={OtherInformation} />
      <Route exact path='/information/uploads' component={Uploads} />
    </Switch>
  );
};

export default Routes;
