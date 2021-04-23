import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from 'base-shell/lib/providers/Auth';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useMenu } from 'material-ui-shell/lib/providers/Menu';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

const SignUpComponent = () => {
  const classes = useStyles();
  const intl = useIntl();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toggleThis } = useMenu();

  const authenticate = (user) => {
    console.log(user);
  };

  function handleSubmit(event) {
    event.preventDefault();
    authenticate({
      displayName: 'User',
      email: username,
    });
  }

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <div className={classes.container}>
        <Typography component="h1" variant="h5">
          {intl.formatMessage({ id: 'sign_up', defaultMessage: 'Sign up' })}
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
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            required
            className={classes.formControl}
          >
            <InputLabel htmlFor="outlined-age-native-simple">Tipo de usuario</InputLabel>
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
              <option value={1}>Propietario</option>
              <option value={2}>Guardia</option>
              <option value={3}>Administrador</option>
            </Select>
          </FormControl>
          <TextField
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={intl.formatMessage({
              id: 'password',
              defaultMessage: 'Password',
            })}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            value={confirmPassword}
            onInput={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password_confirm"
            label={intl.formatMessage({
              id: 'password_confirm',
              defaultMessage: 'Confirm Password',
            })}
            type="password"
            id="password_confirm"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {intl.formatMessage({ id: 'sign_up', defaultMessage: 'Sign up' })}
          </Button>
        </form>
      </div>
    </Paper>
  );
};

export default SignUpComponent;
