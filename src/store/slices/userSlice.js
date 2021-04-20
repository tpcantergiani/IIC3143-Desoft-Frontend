/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { login, register } from '../../api/user';

const initialState = {
  current: null,
  error: '',
  token: '',
  loading: false,
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
      state.token = '';
    },
    setErrorMsg: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.token = action.payload.access_token;
      state.error = '';
      state.loading = false;
    },
    [fetchUser.rejected]: (state, _action) => {
      state.error = 'Correo y/o contraseña inválida';
      state.loading = false;
    },
    [fetchUser.pending]: (state, _action) => {
      state.loading = true;
      state.error = '';
    },
    [createUser.fulfilled]: (_state, action) => {
    },
  },
});

export const { logoutUser, setErrorMsg, setLoading } = userSlice.actions;
export const fetchUserThunk = fetchUser;
export const createUserThunk = createUser;
export const userReducer = userSlice.reducer;
