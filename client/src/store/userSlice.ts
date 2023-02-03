import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserSliceInitialState {
  currentUser: IUser | null;
  isLoading: boolean;
  error: boolean;
}

const initialState: IUserSliceInitialState = {
  currentUser: {
    name: "init name",
    email: "init email",
    password: "init password",
  },
  isLoading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    test: (state, action) => {
      return { ...state, error: action.payload };
    },
    testUser: (state, action) => {
      console.log(action, "test user action");

      return { ...state, currentUser: action.payload };
    },
    // loginStart: (state) => {
    //   state.isLoading = true;
    // },
    // loginSuccess: (state, action) => {
    //   state.isLoading = false;
    //   state.currentUser = action.payload;
    // },
    // loginFailed: (state) => {
    //   state.isLoading = false;
    //   state.error = true;
    // },
    // logout: (state) => {
    //   return initialState;
    // },
    // changeProfile: (state, action) => {
    //   state.currentUser.profilePicture = action.payload;
    // },
    // following: (state, action) => {
    //   if (state.currentUser.following.includes(action.payload)) {
    //     state.currentUser.following.splice(
    //       state.currentUser.following.findIndex(
    //         (followingId) => followingId === action.payload
    //       )
    //     );
    //   } else {
    //     state.currentUser.following.push(action.payload);
    //   }
    // },
  },
});

export const {
  test,
  testUser,
  // loginStart,
  // loginSuccess,
  // loginFailed,
  // logout,
  // changeProfile,
  // following,
} = userSlice.actions;

export default userSlice.reducer;
