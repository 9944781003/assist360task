"use client";
import { User } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clear } from "console";

export type UserProps={
    role: {
        id: string;
        name: string;
    };
    department: {
        id: string;
        name: string;
    };
} & {
    id: string;
    email: string;
    name: string | null;
    password: string;
    roleId: string;
    departmentId: string;
    status: boolean;
    joinedAt: Date;
    invitedById: string | null;
    isOnline: boolean;
    phone: string;
}

interface AppState {
  authenticatedUser: UserProps | null;
  users: UserProps[];
}

const initialState: AppState = {
  authenticatedUser: null,
  users: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAuthenticatedUser: (state, action: PayloadAction<UserProps | null>) => {
      state.authenticatedUser = action.payload;
    },
    setUsers: (state, action: PayloadAction<UserProps[]>) => {
      state.users = action.payload;
    },
    clearAuthenticatedUser: (state) => {
        state.authenticatedUser = null;
    },
    
  },
});

export const { actions: appActions, reducer: appReducer } = appSlice;
