/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendInvitationThunk, setInvitationError, setInvitationLoading, setInvitationErrorMsj,
} from '../../store/slices/featuresSlice';
import DatesComponent from '../dates/DatesComponent';
import TimeComponent from '../dates/TimeComponent';
import { validateRut } from '../../utils/functions';

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

const InvitationComponent = ({
  auxName = '', auxLastName = '', rut = '', plate = '', isInvitation = false,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const [name, setName] = useState(auxName ?? '');
  const [lastName, setLastName] = useState(auxLastName ?? '');
  const [userRut, setUserRut] = useState(rut ?? '');
  const [userPlate, setUserPlate] = useState(plate ?? '');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [invTimeStart, SetInvTimeStart] = useState('00:00');
  const [invTimeEnd, SetInvTimeEnd] = useState('23:59');
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { invitationLoading } = useSelector((state) => state.features);

  useEffect(() => {
    dispatch(setInvitationError(false));
    dispatch(setInvitationErrorMsj(''));
    dispatch(setInvitationLoading(''));
  }, []);

  useEffect(() => {
    setName(auxName);
    setLastName(auxLastName);
    setUserRut(rut);
    setUserPlate(plate);
  }, [auxName, auxLastName, rut, plate]);

  const clearFields = () => {
    setName('');
    setLastName('');
    setUserRut('');
    setUserPlate('');
    SetInvTimeStart('00:00');
    SetInvTimeEnd('23:59');
  };

  const validate = () => {
    if (validateRut(userRut) && name.length > 0 && lastName.length > 0) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      console.log('entre acaa si que si');
      const r = await dispatch(
        sendInvitationThunk({
          name,
          lastname: lastName,
          rut: userRut,
          plate: userPlate,
          date: selectedDate.toISOString().replace('-', '-').split('T')[0].replace('-', '-'),
          start_time: invTimeStart,
          end_time: invTimeEnd,
          isInvitation,
        }),
      );
      if (r.payload?.msg) {
        clearFields();
        enqueueSnackbar(intl.formatMessage({ id: 'visit_regist' }), {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
      }
    } else {
      dispatch(setInvitationErrorMsj('wrongData'));
    }
  };

  return (
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
        <Grid container justify="space-around">

          <DatesComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <TimeComponent fullWidth strTime="start_time" defaultTime={invTimeStart} setInvTime={SetInvTimeStart} />
          <TimeComponent strTime="end_time" defaultTime={invTimeEnd} setInvTime={SetInvTimeEnd} />
        </Grid>
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
  );
};

export default InvitationComponent;
