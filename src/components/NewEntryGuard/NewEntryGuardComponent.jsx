/* eslint-disable max-len */
import {
  Button, Paper, TextField, Input,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import firebase from 'firebase';
import firebaseConfig from '../../firebase/firebase';
import dateToStr from '../../utils/datetime';
import InvitationComponent from '../invitation/InvitationComponent';

console.log(dateToStr('1'));

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

firebase.initializeApp(firebaseConfig);

const NewEntryGuardComponent = () => {
  const classes = useStyles();
  const intl = useIntl();
  const storage = firebase.storage();
  const [rut, setRut] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [registeredVisit, setRegisteredVisit] = useState(true);
  const [isFulfilled, setIsFulfilled] = useState(true);
  const [uploadValue, setUploadValue] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

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
    } else {
      setFileUploaded(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setRegisteredVisit(false);
    // enqueueSnackbar('', {
    //   variant: 'success',
    //   anchorOrigin: {
    //     vertical: 'top',
    //     horizontal: 'center',
    //   },
    // });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      {registeredVisit
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isFulfilled}
              >
                {intl.formatMessage({ id: 'save', defaultMessage: 'Sign up' })}
              </Button>
            </form>
          </div>
        )
        : <InvitationComponent />}
    </Paper>
  );
};

export default NewEntryGuardComponent;
