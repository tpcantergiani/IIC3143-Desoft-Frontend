/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  invite, searchVisit, getUserContacts,
  getInvitationsRoute, getPosiblesHomes,
  getActualCondominium,
} from '../../api/feature';
import { parseError } from '../../utils/functions';

const initialState = {
  invitationErrorMsj: '',
  invitationError: false,
  invitationLoading: false,
  visitStatus: '',
  plate: '',
  visitLoading: false,
  isPlateValid: false,
  contactList: [],
  invitationsList: [],
  homeList: [],
  actualCondominium: {
    data: [{
      condominium: '',
      home: '',
      user: {
        email: '',
        name: '',
        type: '',
      },
    }],
  },
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

const getContacts = createAsyncThunk(
  'feature/getContacts',
  async (_thunkAPI) => {
    const response = await getUserContacts();
    return response.data;
  },
);
const getHomes = createAsyncThunk(
  'feature/getHomes',
  async (_thunkAPI) => {
    const response = await getPosiblesHomes();
    return response.data;
  },
);

const getCondominium = createAsyncThunk(
  'feature/getCondominium',
  async (_thunkAPI) => {
    const response = await getActualCondominium();
    return response.data;
  },
);

const getInvitations = createAsyncThunk(
  'feature/getInvitations',
  async (_thunkAPI) => {
    const response = await getInvitationsRoute();
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
      // console.log(action.payload);

    //   state.token = action.payload.access_token;
    //   state.current = action.payload.data;
    //   state.error = '';
    //   state.loading = false;
    },
    [sendInvitation.rejected]: (state, action) => {
      // console.log(action.error);
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

    [getContacts.fulfilled]: (state, action) => {
      state.contactList = action.payload;
    },
    [getContacts.pending]: (state, action) => {
      state.contactList = [];
    },
    [getContacts.rejected]: (state, action) => {
      state.contactList = [];
    },

    [getHomes.fulfilled]: (state, action) => {
      state.homeList = action.payload;
    },
    [getHomes.pending]: (state, action) => {
      state.homeList = [];
    },
    [getHomes.rejected]: (state, action) => {
      state.homeList = [{ name: 123, lastName: 123, id: 1 }];
    },

    [getCondominium.fulfilled]: (state, action) => {
      state.actualCondominium = action.payload;
    },
    [getCondominium.pending]: (state, action) => {
      state.actualCondominium = {
        data: [{
          condominium: '',
          home: '',
          user: {
            email: '',
            name: '',
            type: '',
          },
        }],
      };
    },
    [getCondominium.rejected]: (state, action) => {
      state.actualCondominium = {
        data: [{
          condominium: '',
          home: '',
          user: {
            email: '',
            name: '',
            type: '',
          },
        }],
      };
    },
    [getInvitations.fulfilled]: (state, action) => {
      state.invitationsList = action.payload.invitations;
    },
    [getInvitations.pending]: (state, action) => {
      state.invitationsList = [];
    },
    [getInvitations.rejected]: (state, action) => {
      state.invitationsList = [];
    },

  },
});

export const {
  setInvitationError, setInvitationLoading, setInvitationErrorMsj,
} = featureSlice.actions;
export const sendInvitationThunk = sendInvitation;
export const verifyPlateThunk = verifyPlate;
export const getContactsThunk = getContacts;
export const getHomesThunk = getHomes;
export const getCondominiumThunk = getCondominium;
export const getInvitationsThunk = getInvitations;
export const featureReducer = featureSlice.reducer;
