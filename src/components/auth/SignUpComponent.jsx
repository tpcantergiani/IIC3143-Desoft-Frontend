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
import { getHomesThunk } from '../../store/slices/featuresSlice';

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

const SignUpComponent = () => {
  const classes = useStyles();
  const intl = useIntl();
  const [username, setUsername] = useState('');
  const [userlastname, setUserLastname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userType, setUserType] = useState('Resident');
  const [userHome, setUserHome] = useState('');
  const { homeList } = useSelector((state) => state.features);
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
  }, [username, userlastname, userEmail, userType, userHome]);

  useEffect(() => {
    dispatch(setCreateError(false));
    dispatch(setCreateLoading(false));
  }, []);

  useEffect(async () => {
    await dispatch(getHomesThunk());
    console.log('consulta hecha');
    console.log(homeList);
  }, []);

  useEffect(() => {
    console.log('casas disponibles:');
    console.log(homeList);
  }, [homeList]);

  const clearFields = () => {
    setUsername('');
    setUserLastname('');
    setUserEmail('');
    setUserHome('');
    setUserType('Resident');
  };

  const validate = () => {
    if (validateEmail(userEmail) && username.length > 0 && userHome.length > 0) {
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
            last_name: userlastname,
            email: userEmail,
            home: userHome,
            type: userType,
          },
        }),
      );

      if (r.payload?.data) {
        clearFields();
        enqueueSnackbar('Usuario agregado correctamente', {
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

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  const handleNumberChange = (event) => {
    setUserHome(event.target.value);
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <div className={classes.container}>
        <Typography component="h1" variant="h5">
          {intl.formatMessage({ id: 'registration' })}
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
            value={userlastname}
            onInput={(e) => setUserLastname(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userlastname"
            label={intl.formatMessage({
              id: 'userlastname',
              defaultMessage: 'userlastname',
            })}
            name="userlastname"
            autoComplete="userlastname"
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
          <TextField
            value={userHome}
            onInput={(e) => setUserHome(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="home"
            label={intl.formatMessage({
              id: 'homeN',
            })}
            name="home"
            autoComplete="home"
          />
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            required
            className={classes.formControl}
          >

            <InputLabel htmlFor="outlined-age-native-simple">{intl.formatMessage({ id: 'homeN' })}</InputLabel>
            <Select
              native
              value={userHome}
              onChange={handleNumberChange}
              label="Número de casa "
              inputProps={{
                name: 'age',
                id: 'outlined-age-native-simple',
              }}
            >
              <option value="1">
                {1}
              </option>
              <option value="2">
                {2}
              </option>
              <option value="3">
                {3}
              </option>
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            required
            className={classes.formControl}
          >
            <InputLabel htmlFor="outlined-age-native-simple">{intl.formatMessage({ id: 'user_type' })}</InputLabel>

            <Select
              native
              value={userType}
              onChange={handleChange}
              label="Tipo de usuario "
              inputProps={{
                name: 'age',
                id: 'outlined-age-native-simple',
              }}
            >
              <option value="Resident">
                {intl.formatMessage({
                  id: 'resident',
                })}

              </option>
              <option value="Guard">
                {intl.formatMessage({
                  id: 'guard',
                })}

              </option>
              <option value="Admin">
                {intl.formatMessage({
                  id: 'admin',
                })}

              </option>
            </Select>
          </FormControl>

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

export default SignUpComponent;
