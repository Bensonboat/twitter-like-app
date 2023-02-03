import { configureStore } from "@reduxjs/toolkit";
import userSlice, { IUserSliceInitialState, testUser } from "./userSlice";

// const testMiddleware = (store: any) => (next: any) => (action: any) => {
//   console.log(store.getState(), "store");
//   console.log(next, "next");
//   console.log(action, "action");
//   next(action);
// };

export interface IRootState {
  user: IUserSliceInitialState;
}

export default configureStore({
  reducer: {
    user: userSlice,
  },
  // Able to customize middleware
  // middleware: [testMiddleware],
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [],
  //       ignoredPaths: ["user.currentUser"],
  //     },
  //   }),
});
