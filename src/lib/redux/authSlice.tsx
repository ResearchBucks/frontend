import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  userRole: string | null;
  userId: string |null;
  userEmail: string | null;
  REFRESHTOKEN: string | null;
  ACCESSTOKEN: string | null;
}

const initialState: AuthState = {
  userRole: null,
  userId:null,
  userEmail:null,
  REFRESHTOKEN: null,
  ACCESSTOKEN: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserRole: (state, action: PayloadAction<string | null>) => {
      state.userRole = action.payload;
    },
    setUserID:(state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string | null>) => {
      state.REFRESHTOKEN = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.ACCESSTOKEN = action.payload;
    },
    setUserEmail:(state, action:PayloadAction<string | null>) =>{
      state.userEmail = action.payload
    },
    clearAuth: (state) => {
      state.userRole = null;
      state.userId =null
      state.userEmail = null;
      state.REFRESHTOKEN = null;
      state.ACCESSTOKEN = null;
    },
  },
});

export const {
  setUserRole,
  setUserID,
  setUserEmail,
  clearAuth,
  setAccessToken,
  setRefreshToken,
} = authSlice.actions;

export default authSlice.reducer;
