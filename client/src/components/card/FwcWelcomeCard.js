import React, { Fragment, useEffect, useState, useContext } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import {
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  Avatar,
  Divider,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FwcTabs from '../tabs/FwcTabs';
import HomeContext from '../../context/home-page/homeContext';

const useStyles = makeStyles((theme) =>
  createStyles({
    welcomeMessage: {
      fontSize: 25,
      fontWeight: 400,
    },

    onboardingMessage: {
      fontSize: 15,
      fontWeight: 400,
    },
    paySlipMessage: {
      fontSize: 13,
      fontWeight: 'bolder',
    },

    paper: {
      padding: theme.spacing(3),
      // textAlign: 'center',
      height: '100%',
      color: theme.palette.text.secondary,
      borderRadius: 0,
      // marginTop: 100,
    },

    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    buttonStyle: {
      padding: theme.spacing(0, 8, 0, 8),
    },
  })
);

const FwcWelcomeCard = () => {
  const classes = useStyles();
  const { userData } = useContext(HomeContext);

  const playSlipData = [
    {
      message: 'Pay Slips, Time Sheets and Reimbursements',
      class: false,
    },
    {
      message:
        'Click view to download Pay Slips, Time Sheets and Upload Reimbursement.',
    },
  ];

  return (
    // <Container maxWidth='lg'>
    <Box component='div' mt={14} ml={8} mr={8}>
      <Grid
        container
        spacing={2}
        direction='row'
        justify='center'
        alignItems='center'>
        <Grid item sm={6}>
          <Paper className={classes.paper}>
            <Grid container wrap='nowrap' spacing={2}>
              <Grid item>
                <Avatar className={classes.large} src={userData.photo}>
                  AP
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant='h4' className={classes.welcomeMessage}>
                  Hi <b>{userData.name}</b>
                </Typography>
                <Typography variant='h4' className={classes.welcomeMessage}>
                  Welcome to Future World!
                </Typography>
                {(() => {
                  if (userData.isFormComplete) {
                    return (
                      <div className='col'>
                        {Object.entries({
                          Department: userData?.department ?? 'N/A',
                          Designation: userData?.designation ?? 'N/A',
                          'Joining Date': userData?.joiningDate ?? 'N/A',
                          FWID: userData?.empNo ?? 'N/A',
                        }).map(([key, value], index) => (
                          <div key={index}>
                            {' '}
                            <b>{key.toString()}:&nbsp;&nbsp;</b>
                            {value.toString()}
                          </div>
                        ))}
                      </div>
                    );
                  } else {
                    return (
                      <Fragment>
                        <Box component='div' mt={1} p={1}>
                          <Grid container direction='row' justify='center'>
                            <Grid item sm={1}>
                              <InfoIcon fontSize='medium' color='primary' />
                            </Grid>
                            <Grid item sm={7}>
                              <Typography
                                variant='h5'
                                className={classes.onboardingMessage}>
                                Fill in your on-boarding application form and
                                submit it using the submit application button.
                              </Typography>
                            </Grid>
                            <Grid item sm={4}></Grid>
                          </Grid>
                        </Box>
                        <Box component='div' color='primary' mt={1} pl={5}>
                          {' '}
                          <Typography
                            variant='h5'
                            className={classes.onboardingMessage}
                            color='primary'>
                            We are delighted to have you!
                          </Typography>
                        </Box>
                      </Fragment>
                    );
                  }
                })()}
              </Grid>
            </Grid>
            <Box mt={2} mb={4}>
              <Divider />
            </Box>

            <Box p={1}>
              <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'>
                {playSlipData.map((data) => (
                  <Box component='div' mb={2}>
                    <Grid item>
                      <Typography
                        variant='h5'
                        className={data.class ?? classes.paySlipMessage}>
                        {data.message}
                      </Typography>
                    </Grid>
                  </Box>
                ))}

                <Grid item>
                  <Link to='/payslip' style={{ color: '#fff' }}>
                    <Button
                      color='primary'
                      variant='contained'
                      className={classes.buttonStyle}>
                      VIEW
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item sm={6}>
          <FwcTabs />
        </Grid>
      </Grid>
    </Box>
    // </Container>
  );
};

export default FwcWelcomeCard;
