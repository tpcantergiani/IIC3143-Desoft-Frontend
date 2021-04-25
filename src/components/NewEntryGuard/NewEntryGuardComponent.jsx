import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import { createUserThunk, setErrorMsg, setLoading } from '../../store/slices/userSlice';

const firebaseConfig = {
  apiKey: 'AIzaSyCV7g-Z7SLoJHfZe2_wA-bi-Jn0wAuurdI',
  authDomain: 'reguard-desoft.firebaseapp.com',
  projectId: 'reguard-desoft',
  storageBucket: 'reguard-desoft.appspot.com',
  messagingSenderId: '1026451438412',
  appId: '1:1026451438412:web:a01bb50ab7611010436de9',
  measurementId: 'G-LFRM84R26W',
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

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

const NewEntryGuardComponent = () => {
  const classes = useStyles();
  const intl = useIntl();
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [userHome, setUserHome] = useState('');
  const [pictureURL, setPictureURL] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const clearFields = () => {
    setUsername('');
    setUserEmail('');
    setUserType('');
    setPictureURL('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const r = await dispatch(
      createUserThunk({
        name: username,
        email: userEmail,
        home: '45',
        type: userType,
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
    } else {
      dispatch(setErrorMsg('Debes rellenar todos los campos'));
    }
  };

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`pictures/${file.name}`);
    const task = storageRef.put(file);
    SetPictureURL(`pictures/${file.name}`);
    // task.on('state_changed', (snapshot) => {
    //   const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //   this.setState({
    //     uploadValue: percentage,
    //   });
    // }, (error) => {
    //   console.error(error.message);
    // }, () => {
    //   // Upload complete
    //   this.setState({
    //     picture: task.snapshot.getdownloadURL,
    //   });
    // });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <div className={classes.container}>
        <Typography component="h1" variant="h5">
          {intl.formatMessage({ id: 'registration' })}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
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
            type="number"
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {intl.formatMessage({ id: 'save', defaultMessage: 'Sign up' })}
          </Button>
        </form>
      </div>
    </Paper>
  );
};

export default NewEntryGuardComponent;
