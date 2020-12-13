import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ProgressBar from '../progress-bar/Progress';
import axios from 'axios';
import { config } from '../../util/RequestUtil';

const useStyles = makeStyles((theme) => ({}));

export default function OnboardingItem({
  title,
  iconClass,
  sectionNames = [],
}) {
  const classes = useStyles();

  const [completedSectionsCount, setCompletedSectionsCount] = useState(0);
  useEffect(() => {
    const getState = async () => {
      try {
        const result = await axios.get(
          '/api/employee?select=' + sectionNames.join(','),
          config
        );
        const { data } = result.data;
        let count = 0;
        for (const sectionName of sectionNames) {
          if (data[sectionName]) count++;
        }
        setCompletedSectionsCount(count);
      } catch (e) {}
    };
    getState();
  });

  return (
    <Grid container direction='column' justify='center'>
      <Box mb={2}>
        <Grid item>
          <Paper>
            <Box p={1}>
              <Grid
                container
                direction='row'
                justify='center'
                alignItems='center'>
                <Grid item sm={3}>
                  <ProgressBar
                    iconClass={iconClass}
                    percentage={Math.floor(
                      (completedSectionsCount / sectionNames.length) * 100
                    ).toString()}
                  />
                </Grid>
                <Grid item sm={6}>
                  <Typography variant='h6'>{title}</Typography>
                </Grid>
                <Grid item sm={3}>
                  <em>{`${completedSectionsCount}/${sectionNames.length} sections complete`}</em>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Box>
    </Grid>
  );
}
