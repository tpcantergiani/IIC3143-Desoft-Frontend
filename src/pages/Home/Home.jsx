import Page from 'material-ui-shell/lib/containers/Page';
import React from 'react';
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar';
import { useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
} from '@material-ui/core';
import HomeComponent from '../../components/home/HomeComponent';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 'auto',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(620 + theme.spacing(6))]: {
      width: '60%',
      height: '40%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing(8),
  },
}));
const HomePage = () => {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })}>
      <Paper className={classes.paper} elevation={2}>
        <HomeComponent />
      </Paper>
    </Page>
  );
};
export default HomePage;
