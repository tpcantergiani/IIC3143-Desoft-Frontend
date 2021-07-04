/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import {
  Typography, InputLabel, Select, FormControl, MenuItem,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';

import {
  getContactsThunk,
} from '../../store/slices/featuresSlice';

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
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
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
    justifyContent: 'space-between',
    height: '305px',
    width: '100%',
    padding: '30px',
    background: '#f1f6fc',
    borderRadius: 10,
    boxShadow: '0 3px 5px 2px rgba(241, 246, 252, .3)',
  },
  error: {
    color: 'red',
  },
  textContainer: {
    flexDirection: 'column',
  },
}));

const ContactSelectComponent = ({ contactValue, action }) => {
  const classes = useStyles();
  const intl = useIntl();
  const dispatch = useDispatch();

  const { contactList } = useSelector((state) => state.features);

  useEffect(async () => {
    await dispatch(getContactsThunk());
  }, []);

  const handleChange = (event) => {
    action(event.target.value);
  };

  return (
    <div className={classes.container}>
      <Typography component="h1" variant="h5">
        {intl.formatMessage({ id: 'registration' })}
      </Typography>
      <div className={classes.textContainer}>
        <Typography component="body1" variant="body1">
          {intl.formatMessage({ id: 'saved_invitation' })}
        </Typography>
        <FormControl
          variant="outlined"
          fullWidth
          margin="normal"
          className={classes.formControl}
        >
          <InputLabel htmlFor="outlined-age-native-simple">{intl.formatMessage({ id: 'select_contact' })}</InputLabel>
          <Select
            native
            value={contactValue}
            onChange={handleChange}
            fullWidth
            label={intl.formatMessage({ id: 'select_contact' })}
            displayEmpty
            inputProps={{
              name: 'age',
              id: 'outlined-age-native-simple',
            }}
          >
            <option value={undefined}>
              {null}
            </option>
            {contactList?.map((elem, index) => (
              <option value={index}>
                {elem.name}
                {' '}
                {elem.last_name}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default ContactSelectComponent;
