import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../features/axios';

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (params) => {
    const { data } = await axios.post('/auth/signin', params);

    return data;
  }
);

export const fetchSignUp = createAsyncThunk(
  'auth/fetchSignUp',
  async (params) => {
    const { data } = await axios.post('/auth/signup', params);

    return data;
  }
);

export const fetchUserDataMe = createAsyncThunk(
  'auth/fetchUserDataMe',
  async () => {
    const { data } = await axios.get('/auth/me');

    return data;
  }
);

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signout: (state) => {
      state.data = null;
    }
  },
  extraReducers: {
    [fetchUserData.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchUserData.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchUserDataMe.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchUserDataMe.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchUserDataMe.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchSignUp.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchSignUp.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchSignUp.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { signout } = authSlice.actions;
export const isUserAuth = (state) => state.auth.data;
