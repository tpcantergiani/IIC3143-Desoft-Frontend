import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  sendInvitationThunk, setInvitationError, setInvitationLoading, setInvitationErrorMsj,
} from '../../store/slices/featuresSlice';
import DatesComponent from '../dates/DatesComponent';
import TimeComponent from '../dates/TimeComponent';

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

const InvitationComponent = () => {
  const classes = useStyles();
  const intl = useIntl();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userRut, setUserRut] = useState('');
  const [userPlate, setUserPlate] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [invTimeStart, SetInvTimeStart] = useState('00:00');
  const [invTimeEnd, SetInvTimeEnd] = useState('23:59');
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    invitationErrorMsj, invitationError, invitationLoading,
  } = useSelector((state) => state.features);

  const { current } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setInvitationError(false));
    dispatch(setInvitationErrorMsj(''));
    dispatch(setInvitationLoading(''));

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
    console.log('Cambio de día', selectedDate);
  }, [selectedDate]);

  const clearFields = () => {
    setName('');
    setLastName('');
    setUserRut('');
    setUserPlate('');
  };

  const validate = () => {
    if (userRut.length > 0 && name.length > 0 && lastName.length > 0) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('handle submit');
    // TODO descomentar esto para enviar al back
    // await dispatch(
    //   sendInvitationThunk({
    //     name,
    //     lastname: lastName,
    //     rut: userRut,
    //     plate: userPlate,
    //     date: selectedDate,
    //     start_time: invTimeStart,
    //     end_time: invTimeEnd,
    //   }),
    // );
    // if (validate) {
    //   const r = await dispatch(
    //   sendInvitationThunk({
    //     name,
    //     lastname: lastName,
    //     rut: userRut,
    //     plate: userPlate,
    //     date: selectedDate,
    //     start_time: invTimeStart,
    //     end_time: invTimeEnd,
    //   }),
    // );

    //   if (r.payload?.data) {
    //     clearFields();
    //     enqueueSnackbar('Invitacion agregada correctamente', {
    //       variant: 'success',
    //       anchorOrigin: {
    //         vertical: 'top',
    //         horizontal: 'center',
    //       },
    //     });
    //   }
    // } else {
    //   dispatch(setCreateErrorMsj('wrongData'));
    // }
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <div className={classes.container}>
        <Typography component="h1" variant="h5">
          {intl.formatMessage({ id: 'invitation_info' })}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            value={name}
            onInput={(e) => setName(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label={intl.formatMessage({
              id: 'name',
              defaultMessage: 'Name',
            })}
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            value={lastName}
            onInput={(e) => setLastName(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label={intl.formatMessage({
              id: 'last_name',
              defaultMessage: 'name',
            })}
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            value={userRut}
            onInput={(e) => setUserRut(e.target.value)}
            variant="outlined"
            margin="normal"
            validators={['required']}
            required
            fullWidth
            id="rut"
            label="Rut"
            name="rut"
            autoComplete="rut"
          />
          <TextField
            value={userPlate}
            onInput={(e) => setUserPlate(e.target.value)}
            variant="outlined"
            margin="normal"
            validators={['required']}
            fullWidth
            id="plate"
            label={intl.formatMessage({
              id: 'plate',
              defaultMessage: 'License Plate',
            })}
            name="plate"
            autoComplete="plate"
          />
          <DatesComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <TimeComponent strTime="start_time" defaultTime="00:00" setInvTime={SetInvTimeStart} />
          <TimeComponent strTime="end_time" defaultTime="23:59" setInvTime={SetInvTimeEnd} />
          {/* {invitationError && (
            <Typography component="h5" className={classes.error}>
              {intl.formatMessage({ id: invitationErrorMsj, defaultMessage: ' ' })}
            </Typography>
          )} */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={invitationLoading}
          >
            {invitationLoading ? <CircularProgress color="white" /> : intl.formatMessage({ id: 'save', defaultMessage: 'Sign up' })}
          </Button>
        </form>
      </div>
    </Paper>
  );
};

export default InvitationComponent;
