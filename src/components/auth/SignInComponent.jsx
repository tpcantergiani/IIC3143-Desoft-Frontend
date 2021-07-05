import {
  Button, Paper, TextField, Typography, CircularProgress, makeStyles,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from 'base-shell/lib/providers/Auth';
import { useIntl } from 'react-intl';
import { useMenu } from 'material-ui-shell/lib/providers/Menu';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserThunk, setErrorMsg, setLoading } from '../../store/slices/userSlice';

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
  error: {
    color: 'red',
  },
}));

const SignInComponent = () => {
  const classes = useStyles();
  const intl = useIntl();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toggleThis } = useMenu();
  const { setAuth } = useAuth();
  const dispatch = useDispatch();
  const {
    error, current, token, loading,
  } = useSelector((state) => state.user);

  const authenticate = (user) => {
    setAuth({ isAuthenticated: true, ...user });
    toggleThis('isAuthMenuOpen', true);

    const _location = history.location;
    let _route = '/invitation';

    if (_location.state && _location.state.from) {
      _route = _location.state.from.pathname;
      history.push(_route);
    } else {
      history.push(_route);
    }
  };

  useEffect(() => {
    dispatch(setLoading(false));
    if (token && token?.length > 0) {
      authenticate({
        current,
        displayName: `${current.name} ${current.last_name}`,
        email: current.email,
      });
    }
  }, []);

  useEffect(() => {
    if (token && token?.length > 0) {
      authenticate({
        current,
        displayName: current.name,
        email: current.email,
      });
    }
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username && password) {
      await dispatch(
        fetchUserThunk({
          email: username.toLowerCase(),
          password,
        }),
      );
    } else {
      dispatch(setErrorMsg('Debes rellenar todos los campos'));
    }
  };

  return (
    <Paper className={classes.paper} elevation={2}>
      <div className={classes.container}>
        <Typography component="h1" variant="h5">
          {intl.formatMessage({ id: 'sign_in' })}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            value={username}
            onInput={(e) => setUsername(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label={intl.formatMessage({ id: 'email' })}
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={intl.formatMessage({ id: 'password' })}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Typography component="h5" className={classes.error}>
            {error}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            {loading ? <CircularProgress color="white" /> : intl.formatMessage({ id: 'sign_in' })}
          </Button>
        </form>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Link to="/password_reset">
            {intl.formatMessage({ id: 'forgot_password' })}
            ?
          </Link>
        </div>
      </div>
    </Paper>
  );
};

export default SignInComponent;
