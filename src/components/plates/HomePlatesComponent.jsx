/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useAuth } from 'base-shell/lib/providers/Auth';
import {
  getEntriesThunk,
} from '../../store/slices/featuresSlice';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(620 + theme.spacing(6))]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  },
  table: {
    width: '100%',
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
  title: {
    textAlign: 'center',
    padding: theme.spacing(2),
  },

}));

const HomePlatesComponent = () => {
  const { auth, updateAuth, setAuth } = useAuth();
  const classes = useStyles();
  const intl = useIntl();
  const dispatch = useDispatch();
  const { entriesList } = useSelector((state) => state.features);
  const { homeNumber } = useSelector((state) => state.features);
  const [source, setSource] = useState(entriesList);
  const [homeN, setHomeNumber] = useState(homeNumber);

  function prettyDate(timeString) {
    const time = new Date(timeString);
    const h = time.getHours();
    const min = time.getMinutes();
    const day = time.getDay();
    const month = time.getMonth();
    const year = time.getFullYear();
    return `${h}:${min}\n(${day}-${month}-${year})`;
  }

  useEffect(async () => {
    await dispatch(getEntriesThunk());
  }, []);

  useEffect(async () => {
    const dict = {
      0: 'unexpected_visit',
      1: 'visit',
      2: 'resident',
      3: 'provider',
    };

    function makeTitle(elem) {
      let title;
      if (elem.expected === 2) {
        title = `${intl.formatMessage({ id: dict[elem.expected] })} ${intl.formatMessage({ id: 'house' })}  ${elem.home.number}`;
      } else if (elem.expected === 1) {
        title = `${intl.formatMessage({ id: dict[elem.expected] })}: ${elem.contact.name} ${elem.contact.last_name}`;
      } else {
        title = `${intl.formatMessage({ id: dict[elem.expected] })}`;
      }
      return title;
    }

    const info = await entriesList.map((elem) => ({
      entry_time: elem.entry_time,
      pretty_date: prettyDate(elem.entry_time),
      patent: elem.patent,
      type_string: intl.formatMessage({ id: dict[elem.expected] }),
      home: elem.home.number,
      title: makeTitle(elem),
    }));
    info.sort((first, second) => new Date(second.entry_time) - new Date(first.entry_time));
    setSource(info);
  }, [entriesList]);

  useEffect(async () => {
    const number = await homeNumber;
    // const number = 1;
    setHomeNumber(number);
  }, [homeNumber]);

  return (
    <div>
      <Typography component="h1" variant="h5" className={classes.title}>
        {intl.formatMessage({ id: 'entry_history' })}
        {' '}
        {intl.formatMessage({ id: 'house' })}
        {' '}
        {homeN}
      </Typography>
      {
        auth.current.home.patents.map((row) => (
          <div className={classes.container}>

            <Typography component="paragraph">
              {intl.formatMessage({ id: 'plate' })}
              {': '}
              {row.patent}
            </Typography>

          </div>
        ))
      }
    </div>

  );
};

export default HomePlatesComponent;
