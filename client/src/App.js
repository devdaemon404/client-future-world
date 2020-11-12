import React, { Fragment } from 'react';
import Routes from './routing/Routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserState from './context/userState';
import './App.css';

function App() {
  return (
    <UserState>
      <Router>
        <Fragment>
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </UserState>
  );
}

export default App;
