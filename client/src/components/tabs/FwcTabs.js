import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Job from '../featured-jobs/Job';
import OnboardingFormsList from '../form-list/OnboardingItem';
import OnboardingItem from '../form-list/OnboardingItem';
import { Link } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FwcTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [featuredJobs, setFeaturedJobs] = useState();
  useEffect(() => {
    const fetchJobsData = async () => {
      try {
        const res = await axios.get('/api/job-posting');
        setFeaturedJobs(res.data.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchJobsData();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'>
          <Tab label='FEATURED JOBS' {...a11yProps(0)} />
          <Tab label='ONBOARDING' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel
        value={value}
        index={0}
        style={{ maxHeight: 450, overflow: 'auto' }}>
        {featuredJobs?.map((data) => (
          <div className='mb-3' style={{ border: 'none' }}>
            <Job {...data} />
          </div>
        ))}
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
        style={{ maxHeight: 450, overflow: 'auto' }}>
        <Link className='link' to={{ pathname: '/personal' }}>
          <OnboardingItem
            title='Personal Information'
            sectionNames={[
              'TBasicInformation1',
              'TBasicInformation2',
              'TDesignationInformation',
              'TDocumentalInformation',
              'TAddressInformation',
              'TLanguageInformation',
            ]}
          />
        </Link>
        <Link className='link' to={{ pathname: '/work' }}>
          <OnboardingItem
            title='Academic Information'
            sectionNames={['TWorkInformation', 'TAcademicInformation']}
          />
        </Link>
        <Link className='link' to={{ pathname: '/health' }}>
          <OnboardingItem
            title='Health & Family'
            sectionNames={['THealthInformation', 'TFamilyInformation']}
          />
        </Link>
        <Link className='link' to={{ pathname: '/other' }}>
          <OnboardingItem
            title='Other Information'
            sectionNames={['TOtherInformation', 'TUploadInformation']}
          />
        </Link>
      </TabPanel>
    </div>
  );
}
