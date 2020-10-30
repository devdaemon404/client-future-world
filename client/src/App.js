import React, { Fragment } from 'react';
import Routes from './routing/Routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
