/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  invite, searchVisit, getUserContacts, getInvitationsRoute, getEntriesRoute,
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
  entryErrorMsj: '',
  entryError: false,
  entryLoading: false,
  entriesList: [],

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

const getInvitations = createAsyncThunk(
  'feature/getInvitations',
  async (_thunkAPI) => {
    const response = await getInvitationsRoute();
    return response.data;
  },
);

const getEntries = createAsyncThunk(
  'feature/getEntries',
  async (_thunkAPI) => {
    const response = await getEntriesRoute();
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

    setEntryErrorMsj: (state, action) => {
      state.entryErrorMsj = action.payload;
    },
    setEntryError: (state, action) => {
      state.entryError = true;
    },
    setEntryLoading: (state, action) => {
      state.entryLoading = action.payload;
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
      state.contactList = [{ name: 123, lastName: 123, id: 1 }];
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

    [getEntries.fulfilled]: (state, action) => {
      state.entriesList = action.payload.entries;
      state.homeNumber = action.payload.entries[0].home.number;
    },
    [getEntries.pending]: (state, action) => {
      state.entriesList = [];
    },
    [getEntries.rejected]: (state, action) => {
      state.entriesList = [
        {
          entry_time: 'Fri, 01 Jan 2021 00:00:00 GMT',
          patent: 'DYLW23',
          expected: 0,
          contact: null,
          home: {
            id: 2,
            number: 1,
          },
        },
        {
          entry_time: 'Fri, 01 Jan 2021 00:00:00 GMT',
          patent: 'BLSS26',
          expected: 1,
          home: {
            id: 2,
            number: 1,
          },
          contact: {
            id: 1,
            name: 'Pedrito',
            last_name: 'Perez',
          },
        },
        {
          entry_time: 'Fri, 01 Jan 2021 00:00:00 GMT',
          patent: 'XP2956',
          expected: 2,
          contact: null,
          home: {
            id: 2,
            number: 1,
          },
        },
        {
          entry_time: 'Fri, 01 Jan 2021 00:00:00 GMT',
          patent: 'XP2956',
          expected: 0,
          contact: null,
          home: {
            id: 2,
            number: 1,
          },
        },
        {
          entry_time: 'Fri, 01 Jan 2021 00:00:00 GMT',
          patent: 'XP2956',
          expected: 1,
          home: {
            id: 2,
            number: 1,
          },
          contact: {
            id: 2,
            name: 'Juanito',
            last_name: 'Juarez',
          },
        },
        {
          entry_time: 'Fri, 01 Jan 2021 00:00:00 GMT',
          patent: 'XP2956',
          expected: 2,
          contact: null,
          home: {
            id: 2,
            number: 1,
          },
        },
        {
          entry_time: 'Fri, 01 Jan 2021 00:00:00 GMT',
          patent: 'SC1111',
          expected: 3,
          contact: null,
          home: {
            id: 2,
            number: 1,
          },
        },
      ];
    },
  },
});

export const {
  setInvitationError, setInvitationLoading, setInvitationErrorMsj,
} = featureSlice.actions;
export const {
  setEntryError, setEntryLoading, setEntryErrorMsj,
} = featureSlice.actions;
export const sendInvitationThunk = sendInvitation;
export const verifyPlateThunk = verifyPlate;
export const getContactsThunk = getContacts;
export const getInvitationsThunk = getInvitations;
export const getEntriesThunk = getEntries;
export const featureReducer = featureSlice.reducer;
