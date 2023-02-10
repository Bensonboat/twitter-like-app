import { configureStore } from "@reduxjs/toolkit";
import userSlice, { IUserSliceInitialState } from "./userSlice";

export interface IRootState {
  user: IUserSliceInitialState;
}

export default configureStore({
  reducer: {
    user: userSlice,
  },
});
