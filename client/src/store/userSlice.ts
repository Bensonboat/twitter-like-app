import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  followers: string[];
  following: string[];
  description: string;
  profileProfile: string;
  profilePicture: string;
}

export interface IUserSliceInitialState {
  currentUser: IUser | null;
  isLoading: boolean;
  error: boolean;
}

const initialState: IUserSliceInitialState = {
  currentUser: null,
  isLoading: true,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    loginFailed: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    logout: () => {
      return initialState;
    },
    changeProfile: (state, action) => {
      if (!state.currentUser) {
        return;
      }
      state.currentUser.profilePicture = action.payload;
    },
    following: (state, action) => {
      if (!state.currentUser) {
        return;
      }

      if (state.currentUser.following.includes(action.payload)) {
        state.currentUser.following.splice(
          state.currentUser.following.findIndex(
            (followingId) => followingId === action.payload
          )
        );
      } else {
        state.currentUser.following.push(action.payload);
      }
    },
  },
});

export const {
  updateLoadingStatus,
  updateCurrentUser,
  loginFailed,
  logout,
  changeProfile,
  following,
} = userSlice.actions;

export default userSlice.reducer;
