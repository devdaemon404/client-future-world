import React, { Fragment } from 'react';
import Routes from './routing/Routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import UserState from './context/userState';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

function App() {
  return (
    <UserState>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Fragment>
            <Switch>
              <Route component={Routes} />
            </Switch>
          </Fragment>
        </Router>
      </ThemeProvider>
    </UserState>
  );
}

export default App;
