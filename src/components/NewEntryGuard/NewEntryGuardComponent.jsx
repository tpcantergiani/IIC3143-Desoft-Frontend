/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  Button, Paper, TextField, Input, Typography, CircularProgress, makeStyles,
} from '@material-ui/core';
import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';

import firebase from 'firebase';
import firebaseConfig from '../../firebase/firebase';
import dateToStr from '../../utils/datetime';
import InvitationComponent from '../invitation/InvitationComponent';
import { verifyPlateThunk } from '../../store/slices/featuresSlice';
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

firebase.initializeApp(firebaseConfig);

const NewEntryGuardComponent = () => {
  const classes = useStyles();
  const intl = useIntl();
  const storage = firebase.storage();
  const [rut, setRut] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [registeredVisit, setRegisteredVisit] = useState(false);
  const [isFulfilled, setIsFulfilled] = useState(true);
  const [uploadValue, setUploadValue] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [rutError, setRutError] = useState(false);
  const dispatch = useDispatch();
  const {
    visitLoading, isPlateValid,
  } = useSelector((state) => state.features);

  useEffect(() => {
    if (fileUploaded && rut.length > 0) {
      setIsFulfilled(false);
    } else setIsFulfilled(true);
  }, [fileUploaded, rut]);

  const handleFileChange = (event) => {
    const inputFile = event.target.files[0];

    if (inputFile?.name?.length > 0) {
      const name = `images/picture_${dateToStr(inputFile.name)}`;
      const storageRef = storage.ref(name);
      const task = storageRef.put(inputFile);
      task.on('state_changed', (snapshot) => {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadValue(percentage);
      }, (error) => {
        console.error(error.message);
      });
      setFileUploaded(true);
      setFileUrl(name);
    } else {
      setFileUploaded(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateRut(rut)) {
      setRutError(false);
      const response = await dispatch(verifyPlateThunk({
        rut,
        plate_string: fileUrl,
      }));

      console.log(response?.payload);
      if (response?.payload?.isValid) {
        enqueueSnackbar('Usuario registrado correctamente', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
      } else {
        setRegisteredVisit(true);
      }
    } else {
      setRutError(true);
    }
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      {!registeredVisit
        ? (
          <div className={classes.container}>
            <Typography component="h1" variant="h5">
              {intl.formatMessage({ id: 'registration' })}
            </Typography>
            <TextField
              value={rut}
              onInput={(e) => {
                setRut(e.target.value);
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="rut"
              label={intl.formatMessage({
                id: 'rut',
                defaultMessage: 'Rut',
              })}
              name="rut"
              autoComplete="rut"
              autoFocus
              helperText="12.345.678-k"
            />
            <form className={classes.form} onSubmit={handleSubmit}>

              <Input type="file" variant="outlined" onChange={handleFileChange} />

              <Typography component="h5" className={classes.error}>
                {rutError && intl.formatMessage({ id: 'rutError', defaultMessage: 'Revise que el rut es correcto' })}
              </Typography>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isFulfilled}
              >
                {visitLoading ? <CircularProgress color="white" /> : intl.formatMessage({ id: 'save', defaultMessage: 'Sign up' })}
              </Button>
            </form>
          </div>
        )
        : <InvitationComponent rut={rut} isInvitation />}
    </Paper>
  );
};

export default NewEntryGuardComponent;
