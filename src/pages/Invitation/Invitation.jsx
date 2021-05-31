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

const Invitation = () => {
  const intl = useIntl();
  const history = useHistory();
  const classes = useStyles();
  const [contactIndex, setContactIndex] = useState(null);
  const { contactList } = useSelector((state) => state.features);
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

        <ContactSelectComponent contactValue={contactIndex} action={setContactIndex} />
        <InvitationComponent
          auxName={contactIndex ? contactList[contactIndex]?.name : ''}
          auxLastName={contactIndex ? contactList[contactIndex]?.last_name : ''}
          rut={contactIndex ? contactList[contactIndex]?.rut : ''}
          plate={contactIndex ? contactList[contactIndex]?.patent : ''}
        />
      </Paper>
    </Page>
  );
};

export default Invitation;
