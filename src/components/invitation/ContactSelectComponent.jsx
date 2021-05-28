/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import {
  Typography, InputLabel, Select, FormControl,
} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

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
    width: '100%',
  },
  error: {
    color: 'red',
  },
}));

const ContactSelectComponent = ({ contactValue, action }) => {
  const classes = useStyles();
  const intl = useIntl();
  //   const {
  //     contacts,
  //   } = useSelector((state) => state.features);

  const contacts = [{ name: 'manu', lastName: 'aguirre' }, { name: 'manu2', lastName: 'aguirre2' }];

  const handleChange = (event) => {
    action(event.target.value);
  };

  return (
    <div className={classes.container}>
      <Typography component="h1" variant="h5">
        {intl.formatMessage({ id: 'registration' })}
      </Typography>
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
          value={contactValue}
          onChange={handleChange}
          fullWidth
          label="Tipo de usuario "
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
          <option value={contacts[0].name}>
            {contacts[0].name}
            {' '}
            {contacts[0].lastName}
          </option>
          <option value={contacts[1].name}>
            {contacts[1].name}
            {' '}
            {contacts[1].lastName}
          </option>
        </Select>
      </FormControl>
    </div>
  );
};

export default ContactSelectComponent;
