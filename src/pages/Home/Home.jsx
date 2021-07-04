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
      width: '95%',
      height: '70%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing(8),
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: ,
    // padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
    //  3,
    // )}px`,
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
