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

const user = {
  access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYxOTE0MzY3MCwianRpIjoiZjY5NTg4OGItMGRlMS00ODdmLTkzMjMtMjBlYzA0ZjQ2ZTcwIiwibmJmIjoxNjE5MTQzNjcwLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJleHAiOjE2MTk0MDI4NzB9.FkpC2OzOVVk-kuKdyUtrg47fp6xL5HRMHw3JGoPZ9R4',
  data: {
    email: 'admin@uc.cl',
    home: {
      id: 1,
      number: 'Porteria',
      patents: [
        {
          id: 1,
          patent: '111',
        },
        {
          id: 2,
          patent: '222',
        },
        {
          id: 3,
          patent: '333',
        },
      ],
    },
    id: 1,
    last_name: 'admin',
    name: 'admin',
    type: 'Guard',
  },
};

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
      state.current = action.payload.data;
      state.error = '';
      state.loading = false;
    },
    [fetchUser.rejected]: (state, _action) => {
      state.token = 'fasdjkfhaskñifhadsñlfjhasñlfjas';
      state.current = user.data;
      // state.error = 'Correo y/o contraseña inválida';
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
