/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  getInvitationsThunk,
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3,
    )}px`,
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
}));

const HistoryTableComponent = () => {
  const classes = useStyles();
  const intl = useIntl();
  const dispatch = useDispatch();
  const { invitationsList } = useSelector((state) => state.features);
  const [source, setSource] = useState(invitationsList);

  useEffect(async () => {
    await dispatch(getInvitationsThunk());
  }, []);

  useEffect(async () => {
    const info = await invitationsList.map((elem) => ({
      id: elem.contact.id,
      home: elem.home,
      name: elem.contact.name,
      lastName: elem.contact.last_name,
      patent: elem.contact.patent,
      start: elem.start_time,
      end: elem.end_time,
      rut: elem.contact.rut,
    }));
    setSource(info);
  }, [invitationsList]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">{intl.formatMessage({ id: 'homeN' })}</TableCell>
            <TableCell align="left">{intl.formatMessage({ id: 'name' })}</TableCell>
            <TableCell align="left">{intl.formatMessage({ id: 'last_name' })}</TableCell>
            <TableCell align="left">{intl.formatMessage({ id: 'plate' })}</TableCell>
            <TableCell align="left">{intl.formatMessage({ id: 'start_time' })}</TableCell>
            <TableCell align="left">{intl.formatMessage({ id: 'end_time' })}</TableCell>
            <TableCell align="left">Rut</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {source.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.home}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.lastName}</TableCell>
              <TableCell align="left">{row.patent}</TableCell>
              <TableCell align="left">{row.start}</TableCell>
              <TableCell align="left">{row.end}</TableCell>
              <TableCell align="left">{row.rut}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTableComponent;
