/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const TimeComponent = ({ prueba, defaultTime }) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="time"
        label={intl.formatMessage({
          id: prueba,
          defaultMessage: 'Time',
        })}
        type="time"
        defaultValue={defaultTime}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
    </form>
  );
};

export default TimeComponent;
