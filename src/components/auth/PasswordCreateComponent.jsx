import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { putUserThunk, setPasswordError, setPasswordLoading } from '../../store/slices/userSlice';

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

const PasswordCreate = () => {
  const classes = useStyles();
  const intl = useIntl();
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const { passwordLoading, passwordError } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setPasswordError(false));
    dispatch(setPasswordLoading(false));
  }, []);

  useEffect(() => {
    dispatch(setPasswordError(false));
    dispatch(setPasswordLoading(false));
  }, [password, confirmPassword]);

  const validate = () => password === confirmPassword;

  async function handleSubmit(event) {
    event.preventDefault();
    if (validate()) {
      const r = await dispatch(
        putUserThunk({
          data: {
            password,
          },
        }),
      );

      if (r.payload?.msg) {
        history.replace('/signin');
      }
    } else {
      dispatch(setPasswordError(true));
    }
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <div className={classes.container}>
        <Typography component="h1" variant="h5">
          {intl.formatMessage({
            id: 'password_set',
            defaultMessage: 'Password set',
          })}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            autoFocus
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
          />
          <TextField
            value={confirmPassword}
            onInput={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label={intl.formatMessage({ id: 'password_confirm' })}
            type="password"
            id="create-password"
          />
          {passwordError && (
            <Typography component="h5" className={classes.error}>
              {intl.formatMessage({ id: 'password_error', defaultMessage: ' ' })}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {passwordLoading
              ? <CircularProgress color="white" />
              : intl.formatMessage({
                id: 'password_reset',
                defaultMessage: 'Reset Password',
              })}
          </Button>
        </form>
      </div>
    </Paper>
  );
};

export default PasswordCreate;
