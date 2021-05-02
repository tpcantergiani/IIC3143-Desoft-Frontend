/* eslint-disable react/prop-types */
import 'date-fns';
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useIntl } from 'react-intl';

const DatesComponent = ({ selectedDate, setSelectedDate }) => {
  // The first commit of Material-UI
  // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const intl = useIntl();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label={intl.formatMessage({
            id: 'date_str',
            defaultMessage: 'Date',
          })}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DatesComponent;
