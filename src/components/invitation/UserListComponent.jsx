/* eslint-disable max-len */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Delete, Edit } from '@material-ui/icons';
import {
  getUsersThunk, deleteUsersThunk,
} from '../../store/slices/featuresSlice';

// ! Components
import SignUpComponent from '../auth/SignUpComponent';

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

const UserListComponent = () => {
  const classes = useStyles();
  const intl = useIntl();
  const dispatch = useDispatch();
  const { usersList } = useSelector((state) => state.features);
  const [source, setSource] = useState(usersList);
  const [reload, setReload] = useState(false);
  const [edit, setEdit] = useState(false);
  const [aux, setAux] = useState(undefined);

  const handleClick = async (email) => {
    const payload = {
      data: {
        email,
      },
    };
    const r = await dispatch(deleteUsersThunk(payload));
    setReload(!reload);
    return r;
  };

  const handleEdit = (data) => {
    setEdit(true);
    setAux(data);
  };

  useEffect(async () => {
    await dispatch(getUsersThunk());
  }, [reload, edit]);

  useEffect(async () => {
    const info = await usersList.map((elem) => ({
      id: elem.id,
      email: elem.email,
      home: elem.home.number,
      name: elem.name,
      lastName: elem.last_name,
      patent: elem.patent,
    }));
    setSource(info);
  }, [usersList]);

  return (
    <div>
      { !edit
        ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} size="medium" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">{intl.formatMessage({ id: 'homeN' })}</TableCell>
                  <TableCell align="left">{intl.formatMessage({ id: 'email' })}</TableCell>
                  <TableCell align="left">{intl.formatMessage({ id: 'name' })}</TableCell>
                  <TableCell align="left">{intl.formatMessage({ id: 'last_name' })}</TableCell>
                  <TableCell align="left">{intl.formatMessage({ id: 'action' })}</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {source.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.home}
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.lastName}</TableCell>
                    <TableCell align="left">
                      <Button onClick={() => handleClick(row.email)}><Delete /></Button>
                      <Button onClick={() => handleEdit({
                        // eslint-disable-next-line max-len
                        firstName: row.name, lastName: row.lastName, email: row.email, home: row.home,
                      })}
                      >
                        <Edit />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
        : (
          <SignUpComponent firstName={aux.firstName} lastName={aux.lastName} email={aux.email} home={aux.home} seter={() => setEdit(false)} update />
        )}
    </div>
  );
};

export default UserListComponent;
