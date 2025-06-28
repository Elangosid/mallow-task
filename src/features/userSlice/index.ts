import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../utils/HttpService";
import URLS from "../../utils/URLs";
import type { EditData, User, UserState } from "../../types/userTyps";

export interface createUser {
  name: string;
  job: string;
}
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    perPage: 10
  },
  search: ""
}
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async ({ page }: { page?: number }, { rejectWithValue }) => {
    try {
      const res = await http.get(`${URLS.get_user}?page=${page}`);
      return {
        users: res.data,
        pagination: {
          currentPage: res.page,
          totalPages: res.total_pages,
          totalItems: res.data.totalItems,
          perPage: res.per_page,
        },
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (data: User, { rejectWithValue }) => {
    try {
      const res = await http.post(URLS.create_user, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create user");
    }
  }
);


export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, data }: { id: string; data: EditData }, { rejectWithValue }) => {
    try {
      const res = await http.put(`${URLS.update_user}/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update user");
    }
  }
);


export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id: string, { rejectWithValue }) => {
    try {
       await http.delete(`${URLS.delete_user}/${id}`);
      return id
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete user");
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create User
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = {
          id: action.meta.arg.id,
          ...action.meta.arg.data,
        };
        const index = state.users.findIndex(u => u.id === action.meta.arg.id);
        if (index !== -1) state.users[index] = updatedUser;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(u => u.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }

});

export const { setSearch } = userSlice.actions;
export default userSlice.reducer;
