/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { getCondominiumThunk } from '../../store/slices/featuresSlice';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    height: '100%',
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '30px',

    // alignItems: 'center',
    justifyContent: 'center',
    // height: '100%',
  },
}));

const HomeComponent = () => {
  const classes = useStyles();
  const { actualCondominium } = useSelector((state) => state.features);
  const dispatch = useDispatch();
  const intl = useIntl();
  const [nameCondominium, setNameCondominium] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [nameHome, setNameHome] = useState('');
  const [userEmail, seUserEmail] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(async () => {
    await dispatch(getCondominiumThunk());
  }, []);

  useEffect(async () => {
    setNameCondominium(actualCondominium.data[0].condominium);
    setNameUser(actualCondominium.data[0].user.name);
    setNameHome(actualCondominium.data[0].home);
    seUserEmail(actualCondominium.data[0].user.email);
    setUserType(actualCondominium.data[0].user.type);
  }, [actualCondominium.data[0].condominium]);

  return (
    <div className={classes.container}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: 18,
          marginBottom: 18,
        }}
      >
        <Typography
          variant="h6"
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {nameUser}

        </Typography>
        <Typography variant="h6">{userEmail}</Typography>
      </div>

      <div className={classes.infoBox}>
        <Typography component="paragraph">
          {intl.formatMessage({ id: 'condominium' })}
          {': '}
          {nameCondominium}
        </Typography>
      </div>
      <div className={classes.infoBox}>
        <Typography component="paragraph">
          {intl.formatMessage({ id: 'condominium' })}
          {': '}
          {nameCondominium}
        </Typography>
      </div>

      <div className={classes.infoBox}>
        <Typography component="h1" variant="caption" style={{ fontWeight: 600 }}>
          {intl.formatMessage({ id: 'condominium' })}
        </Typography>
        {`: ${nameCondominium}`}
      </div>

      <div className={classes.infoBox}>
        <Typography component="h1" variant="caption" style={{ fontWeight: 600 }}>
          {intl.formatMessage({ id: 'homeN' })}
        </Typography>
        {`: ${nameHome}`}
      </div>

      <div className={classes.infoBox}>
        <Typography component="h1" variant="caption" style={{ fontWeight: 600 }}>
          {intl.formatMessage({ id: 'user_type' })}
        </Typography>
        {`: ${userType}`}
      </div>
    </div>

  );
};

export default HomeComponent;
