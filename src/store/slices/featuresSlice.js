/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { invite, searchVisit } from '../../api/feature';
import { parseError } from '../../utils/functions';

const initialState = {
  invitationErrorMsj: '',
  invitationError: false,
  invitationLoading: false,
  visitStatus: '',
  plate: '',
  visitLoading: false,
  isPlateValid: false,
};

const sendInvitation = createAsyncThunk(
  'feature/sendInvitation',
  async (payload, _thunkAPI) => {
    const response = await invite(payload);
    return response.data;
  },
);

const verifyPlate = createAsyncThunk(
  'feature/searchVisit',
  async (payload, _thunkAPI) => {
    const response = await searchVisit(payload);
    return response.data;
  },
);

const featureSlice = createSlice({
  name: 'features',
  initialState,
  reducers: {
    setInvitationErrorMsj: (state, action) => {
      state.invitationErrorMsj = action.payload;
    },
    setInvitationError: (state, action) => {
      state.invitationError = true;
    },
    setInvitationLoading: (state, action) => {
      state.invitationLoading = action.payload;
    },

  },
  extraReducers: {
    [sendInvitation.fulfilled]: (state, action) => {

    //   state.token = action.payload.access_token;
    //   state.current = action.payload.data;
    //   state.error = '';
    //   state.loading = false;
    },
    [sendInvitation.rejected]: (state, action) => {
    //   state.error = 'Correo y/o contraseña inválida';
    //   state.loading = false;
    },
    [sendInvitation.pending]: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    [verifyPlate.fulfilled]: (state, action) => {
      state.visitLoading = false;
      if (action.payload.isValid) {
        state.isPlateValid = true;
      } else {
        state.isPlateValid = false;
        state.plate = action.payload.plate_string;
      }
    },
    [verifyPlate.pending]: (state, action) => {
      state.isPlateValid = false;
      state.visitLoading = true;
    },
    [verifyPlate.rejected]: (state, action) => {
      state.isPlateValid = false;
      state.visitLoading = false;
    },

  },
});

export const {
  setInvitationError, setInvitationLoading, setInvitationErrorMsj,
} = featureSlice.actions;
export const sendInvitationThunk = sendInvitation;
export const verifyPlateThunk = verifyPlate;
export const featureReducer = featureSlice.reducer;
