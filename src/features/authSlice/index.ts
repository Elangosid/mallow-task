import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../types/Auth";
import http from "../../utils/HttpService";
import URLS from "../../utils/URLs";
import Cookies from 'js-cookie'
import { ACCESS_TOKEN_FIELD_NAME } from "../../Components/constant/common";

const initialState: AuthState = {
    token: null,
    loading: false,
    error: null,
};

export const signIn: any = createAsyncThunk(
    'auth/signIn',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await http.post(URLS.login, credentials);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.error = null;
            state.loading = false;
            Cookies.remove(ACCESS_TOKEN_FIELD_NAME)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                Cookies.set(ACCESS_TOKEN_FIELD_NAME, action.payload.token, { expires: 2 })
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
