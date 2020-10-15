import React, { Fragment, useEffect } from 'react';
import Routes from './routing/Routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';

function App() {
  useEffect(() => {
    const mockLogin = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        };
        const body = JSON.stringify({
          password: '123456',
          email: 'bk@email.com',
        });

        await axios.post('/api/auth/login', body, config).then();
      } catch (error) {
        console.log(error);
      }
    };

    mockLogin();
  }, []);


  return (
    <Router>
      <Fragment>
        <Switch>
          <Route component={Routes} />
          {/* <Route component={AdminRoutes} /> */}
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
