import React from 'react';
import { Route, Switch } from 'react-router-dom';
import homepage from '../pages/homepage/homepage';
import loginpage from '../pages/loginpage/loginpage';
import personalpage from '../pages/personalpage/personalpage';
import formpage from '../pages/formpage/formpage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={homepage} />
      <Route exact path='/login' component={loginpage} />
      <Route exact path='/personal' component={personalpage} />
      <Route exact path='/form' component={formpage} />
    </Switch>
  );
};

export default Routes;
