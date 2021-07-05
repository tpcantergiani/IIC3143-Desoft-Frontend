import Page from 'material-ui-shell/lib/containers/Page';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import {
  Paper,
} from '@material-ui/core';

// ! Components
import HistoryTableComponent from '../../components/entry/HistoryTableComponent';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(620 + theme.spacing(6))]: {
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3,
    )}px`,
  },
}));

const EntryHistory = () => {
  const intl = useIntl();
  const history = useHistory();
  const classes = useStyles();
  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'entry_history',
        defaultMessage: 'Entries',
      })}
      onBackClick={() => {
        history.goBack();
      }}
    >
      <HistoryTableComponent />

    </Page>
  );
};

export default EntryHistory;
