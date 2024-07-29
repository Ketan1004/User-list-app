import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USERS_API_URL = 'https://dummyjson.com/users'; 

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page = 1) => {
  const response = await axios.get(`${USERS_API_URL}?page=${page}&limit=10`);
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
    page: 1,
    hasMore: true,
    sortField: '',
    filterGender: '',
    filterCountry: '',
  },
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
    resetUsers: (state) => {
      state.users = [];
      state.page = 1;
      state.hasMore = true;
    },
    setSortField: (state, action) => {
      state.sortField = action.payload;
    },
    setFilterGender: (state, action) => {
      state.filterGender = action.payload;
    },
    setFilterCountry: (state, action) => {
      state.filterCountry = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.length === 0) {
          state.hasMore = false;
        } else {
          state.users = [...state.users, ...action.payload];
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { incrementPage, resetUsers, setSortField, setFilterGender, setFilterCountry } = userSlice.actions;

export default userSlice.reducer;
