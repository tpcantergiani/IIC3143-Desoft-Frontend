/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';

import Delete from '@material-ui/icons/Delete';
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question';
import { useHistory } from 'react-router-dom';

import { useAuth } from 'base-shell/lib/providers/Auth';
import AddPlateComponent from './AddPlateComponent';
import {
  deletePlateThunk, getHomePlatesThunk,
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
  const { openDialog } = useQuestions();
  const history = useHistory();
  const [reload, setReload] = useState(false);
  const { plateList } = useSelector((state) => state.features);
  const [source, setSource] = useState(plateList);

  useEffect(async () => {
    await dispatch(getHomePlatesThunk());
  }, [reload]);

  useEffect(async () => {
    const info = await plateList;
    setSource(info);
  }, [plateList]);

  const handleDelete = async (plate) => {
    const r = await dispatch(
      deletePlateThunk({
        data: {

          data: {
            plate,
          },
        },
      }),
    );
    setReload(!reload);
    return r;
  };

  return (
    <div>
      <AddPlateComponent reload={reload} action={() => setReload()} />
      <Table className={classes.table} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">{intl.formatMessage({ id: 'plate' })}</TableCell>
            <TableCell align="left">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {source?.map((row) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
              <TableCell align="left">
                <Fab
                  size="medium"
                  onClick={() => handleDelete(row)}
                  color="secondary"
                  aria-label="delete"
                >
                  <Delete />
                </Fab>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  );
};

export default HomePlatesComponent;
