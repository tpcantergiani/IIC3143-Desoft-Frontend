/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
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
  },
}));

const HomeComponent = () => {
  const classes = useStyles();
  const { actualCondominium } = useSelector((state) => state.features);
  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(async () => {
    await dispatch(getCondominiumThunk());
  }, []);

  return (
    <div className={classes.container}>
      <Typography component="h1" variant="h5" style={{ fontWeight: 600 }}>
        {intl.formatMessage({ id: 'information' })}
      </Typography>
      <div className={classes.infoBox}>
        <Typography component="h1" variant="caption" style={{ fontWeight: 600 }}>
          {intl.formatMessage({ id: 'condominium' })}
        </Typography>
        <Typography component="h1" variant="caption">
          {actualCondominium}
        </Typography>
      </div>
    </div>
  );
};

export default HomeComponent;
