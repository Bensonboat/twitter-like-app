import React from "react";
import LeftSidebar from "../components/leftSidebar";
import MainTweet from "../components/mainTweet";
import RightSidebar from "../components/rightSidebar";
import SignIn from "../components/signIn";

import { useSelector, TypedUseSelectorHook } from "react-redux";
import { useDispatch } from "react-redux";
import { test, testUser } from "../store/userSlice";
import { IRootState } from "../store";

const Home = () => {
  const dispatch = useDispatch();

  const { error, currentUser } = useSelector((state: IRootState) => state.user);
  // const { currentUser } = useSelector((state) => state.user);
  // const currentUser = {
  //   username: "string",
  //   email: "string",
  //   password: "string",
  //   followers: [],
  //   following: [],
  //   description: "string",
  //   profileProfile: "string",
  //   profilePicture: "string",
  // };

  const updateUserErrorState = () => {
    // dispatch(test(!error));
    dispatch({ type: "user/test", payload: !error });
  };

  const updateCurrentUser = () => {
    dispatch(testUser({ name: "hello", email: "email" }));
    // dispatch(testUser(() => 123));
  };

  return (
    <>
      {!currentUser ? (
        <>
          <SignIn />
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <button onClick={() => updateCurrentUser()}>updateCurrentUser</button>

          <button onClick={() => updateUserErrorState()}>go</button>
          {/* ######### */}
          {error.toString()}
          <br />

          {/* $$$$$$$$$ */}
          {JSON.stringify(currentUser)}
          <div className="px-6">
            <LeftSidebar />
          </div>
          <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
            <MainTweet />
          </div>
          <div className="px-6">
            <RightSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
