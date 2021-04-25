import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  createUserThunk, setCreateLoading, setCreateError, setCreateErrorMsj,
} from '../../store/slices/userSlice';

import { validateEmail } from '../../utils/functions';

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

const InvitationInformation = () => {
  const classes = useStyles();
  const intl = useIntl();
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    current, createError, createErrorMsj, createLoading,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (current.type !== 'Admin') {
      const _location = history.location;
      let _route = '/notfound';

      if (_location.state && _location.state.from) {
        _route = _location.state.from.pathname;
        history.push(_route);
      } else {
        history.push(_route);
      }
    }
  }, []);

  useEffect(() => {
    dispatch(setCreateError(false));
    dispatch(setCreateLoading(false));
  }, []);

  const clearFields = () => {
    setUsername('');
    setUserEmail('');
  };

  const validate = () => {
    if (validateEmail(userEmail) && username.length) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate) {
      const r = await dispatch(
        createUserThunk({
          data: {
            name: username,
            email: userEmail,
          },
        }),
      );

      if (r.payload?.data) {
        clearFields();
        enqueueSnackbar('Usuario invitado correctamente', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
      }
    } else {
      dispatch(setCreateErrorMsj('wrongData'));
    }
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <div className={classes.container}>
        <Typography component="h1" variant="h5">
          {intl.formatMessage({ id: 'invitation_info' })}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            value={username}
            onInput={(e) => setUsername(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label={intl.formatMessage({
              id: 'username',
              defaultMessage: 'Username',
            })}
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            value={userEmail}
            onInput={(e) => setUserEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            validators={['required']}
            required
            fullWidth
            id="email"
            label={intl.formatMessage({
              id: 'email',
              defaultMessage: 'E-Mail',
            })}
            name="email"
            autoComplete="email"
          />
          {createError && (
            <Typography component="h5" className={classes.error}>
              {intl.formatMessage({ id: createErrorMsj, defaultMessage: ' ' })}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={createLoading}
          >
            {createLoading ? <CircularProgress color="white" /> : intl.formatMessage({ id: 'save', defaultMessage: 'Sign up' })}
          </Button>
        </form>
      </div>
    </Paper>
  );
};

export default InvitationInformation;