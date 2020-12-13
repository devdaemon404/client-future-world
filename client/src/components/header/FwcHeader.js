import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, Typography, Button, Box } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      textAlign: 'center',
      fontWeight: 'bolder',
      color: '#fff',
      paddingLeft: 235,
    },
  })
);

const FwcHeader = ({ pathname }) => {
  const classes = useStyles();

  const headerData = [
    { label: 'HOME', toPath: { pathname } },
    { label: 'RESET PASSWORD', toPath: '/reset-password' },
    { label: 'LOGOUT', toPath: '/login' },
  ];

  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <Typography variant='h4' className={classes.title}>
          fwc
        </Typography>
        <Box>
          {headerData.map((data) => (
            <Link to={data.toPath} style={{ color: '#fff' }}>
              <Button color='inherit'>{data.label}</Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default FwcHeader;
