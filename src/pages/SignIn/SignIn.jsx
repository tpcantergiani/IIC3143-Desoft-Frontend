import Button from '@material-ui/core/Button';
import Page from 'material-ui-shell/lib/containers/Page';
import Paper from '@material-ui/core/Paper';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from 'base-shell/lib/providers/Auth';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useMenu } from 'material-ui-shell/lib/providers/Menu';

// ! Components
import SignInComponent from '../../components/auth/SignInComponent';

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
  avatar: {
    margin: theme.spacing(1),
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const intl = useIntl();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toggleThis } = useMenu();
  const { setAuth } = useAuth();

  function handleSubmit(event) {
    event.preventDefault();
    authenticate({
      displayName: 'User',
      email: username,
    });
  }

  const authenticate = (user) => {
    setAuth({ isAuthenticated: true, ...user });
    toggleThis('isAuthMenuOpen', false);

    const _location = history.location;
    let _route = '/home';

    if (_location.state && _location.state.from) {
      _route = _location.state.from.pathname;
      history.push(_route);
    } else {
      history.push(_route);
    }
  };

  return (
    <Page pageTitle={intl.formatMessage({ id: 'sign_in' })}>
      <SignInComponent />
    </Page>
  );
};

export default SignIn;
