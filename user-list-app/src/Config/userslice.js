import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the API endpoint for fetching users
const USERS_API_URL = 'https://dummyjson.com/users'; 

// Async thunk action for fetching users from the API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(`${USERS_API_URL}?limit=100`); // Fetching 100 users at once
  return response.data; // Return the data as the fulfilled action payload
});

// Create a slice for user data
const userSlice = createSlice({
  name: 'users', // Name of the slice
  initialState: {
    users: [], // Initial state for users
  },
  extraReducers: (builder) => {
    // Handle the fulfilled state of fetchUsers
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload; // Update the users state with the fetched data
    });
  },
});

export default userSlice.reducer; // Export the reducer to be used in the store
