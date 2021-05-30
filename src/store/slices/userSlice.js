/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { login, register } from '../../api/user';
import { parseError } from '../../utils/functions';

const initialState = {
  current: null,
  error: '',
  token: '',
  loading: false,
  createError: false,
  createLoading: false,
  createErrorMsj: '',
};

const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (payload, _thunkAPI) => {
    const response = await login(payload);
    return response.data;
  },
);

const createUser = createAsyncThunk(
  'user/createUser',
  async (payload, _thunkAPI) => {
    const response = await register(payload);
    return response.data;
  },
);

const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (payload, _thunkAPI) => {
    const response = await register(payload);
    return response.data;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, _action) => {
      state.current = null;
      state.token = '';
    },
    setErrorMsg: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.error = action.payload;
    },
    setCreateError: (state, action) => {
      state.createError = action.payload;
    },
    setCreateLoading: (state, action) => {
      state.createLoading = action.payload;
    },
    setCreateErrorMsj: (state, action) => {
      state.createErrorMsj = action.payload;
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.token = action.payload.access_token;
      state.current = action.payload.data;
      state.error = '';
      state.loading = false;
    },
    [fetchUser.rejected]: (state, action) => {
      state.error = 'Correo y/o contraseña inválida';
      state.loading = false;
    },
    [fetchUser.pending]: (state, action) => {
      state.loading = true;
      state.error = '';
    },

    [createUser.fulfilled]: (state, _action) => {
      state.createLoading = false;
      state.createErrorMsj = '';
    },
    [createUser.pending]: (state, _action) => {
      state.createLoading = true;
      state.createErrorMsj = 'NoError';
    },
    [createUser.rejected]: (state, action) => {
      if (parseError(action.error?.message) === '406') {
        state.createErrorMsj = 'wrongData';
      } else if (parseError(action.error?.message) === '409') {
        state.createErrorMsj = 'userExists';
      }
      state.createLoading = false;
      state.createError = true;
    },
  },
});

export const {
  logoutUser, setErrorMsg, setLoading, setCreateLoading, setCreateError, setCreateErrorMsj,
} = userSlice.actions;
export const fetchUserThunk = fetchUser;
export const createUserThunk = createUser;
export const userReducer = userSlice.reducer;
