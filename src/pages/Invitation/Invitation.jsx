import Page from 'material-ui-shell/lib/containers/Page';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';

import {
  Paper,
} from '@material-ui/core';

// ! Components
import InvitationComponent from '../../components/invitation/InvitationComponent';
import ContactSelectComponent from '../../components/invitation/ContactSelectComponent';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(620 + theme.spacing(6))]: {
      width: 400,
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

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(620 + theme.spacing(6))]: {
      width: 400,
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
const Invitation = () => {
  const intl = useIntl();
  const history = useHistory();
  const classes = useStyles();
  const [contact, setContact] = useState('');
  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'invitation_info',
        defaultMessage: 'Invitation',
      })}
      onBackClick={() => {
        history.goBack();
      }}
    >
      <Paper className={classes.paper} elevation={6}>

        <ContactSelectComponent contactValue={contact} action={setContact} />
        <InvitationComponent auxName={contact} />
      </Paper>
    </Page>
  );
};

export default Invitation;
