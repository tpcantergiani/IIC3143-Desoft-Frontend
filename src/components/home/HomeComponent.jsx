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
    marginTop: '10px',

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
        <Typography component="paragraph" style={{ fontWeight: 'bold' }}>
          {intl.formatMessage({ id: 'condominium' })}
          {': '}
        </Typography>
        <Typography component="paragraph">
          {nameCondominium}
        </Typography>
      </div>
      <div className={classes.infoBox}>
        <Typography component="paragraph" style={{ fontWeight: 'bold' }}>
          {intl.formatMessage({ id: 'homeN' })}
          {': '}
        </Typography>
        <Typography component="paragraph">
          {nameHome}
        </Typography>
      </div>
      <div className={classes.infoBox}>
        <Typography component="paragraph" style={{ fontWeight: 'bold' }}>
          {intl.formatMessage({ id: 'user_type' })}
          {': '}
        </Typography>
        <Typography component="paragraph">
          {userType}
        </Typography>
      </div>
    </div>

  );
};

export default HomeComponent;
