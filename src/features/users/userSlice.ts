import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../types/user';

const API_URL = '/user';

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const getUser = createAsyncThunk('users/getUser', async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

export const createUser = createAsyncThunk('users/createUser', async (user: Omit<User, 'id'>) => {
  const formData = new FormData();
  if (user.userInfo.profilePhoto instanceof File) {
    formData.append('profilePhoto', user.userInfo.profilePhoto);
    // Remove profilePhoto from user object to avoid sending it twice or as a string
    const { profilePhoto, ...userInfoWithoutPhoto } = user.userInfo;
    formData.append('userInfo', JSON.stringify(userInfoWithoutPhoto));
  } else {
    formData.append('userInfo', JSON.stringify(user.userInfo));
  }
  formData.append('userContact', JSON.stringify(user.userContact));
  formData.append('userAddress', JSON.stringify(user.userAddress));
  formData.append('userAcademics', JSON.stringify(user.userAcademics));

  const response = await axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (user: User) => {
  const formData = new FormData();
  formData.append('id', user.id.toString());
  if (user.userInfo.profilePhoto instanceof File) {
    formData.append('profilePhoto', user.userInfo.profilePhoto);
    const { profilePhoto, ...userInfoWithoutPhoto } = user.userInfo;
    formData.append('userInfo', JSON.stringify(userInfoWithoutPhoto));
  } else {
    formData.append('userInfo', JSON.stringify(user.userInfo));
  }
  formData.append('userContact', JSON.stringify(user.userContact));
  formData.append('userAddress', JSON.stringify(user.userAddress));
  formData.append('userAcademics', JSON.stringify(user.userAcademics));

  const response = await axios.patch(`${API_URL}/${user.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  currentUser: User | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  currentUser: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create user';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        if (state.currentUser && state.currentUser.id === action.payload.id) {
          state.currentUser = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
