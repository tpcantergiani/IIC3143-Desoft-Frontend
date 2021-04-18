/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { login, register } from '../../api/user';

const initialState = {
  current: null,
  error: '',
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, _action) => {
      state.current = null;
    },
    setErrorMsg: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.current = action.payload;
      state.error = '';
    },
    [fetchUser.rejected]: (state, _action) => {
      state.error = 'Correo y/o contraseña inválida';
    },
    [createUser.fulfilled]: (_state, action) => {
      console.log(action.payload);
    },
  },
});

export const { logoutUser, setErrorMsg } = userSlice.actions;
export const fetchUserThunk = fetchUser;
export const createUserThunk = createUser;
export const userReducer = userSlice.reducer;
