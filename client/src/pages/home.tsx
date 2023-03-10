import { useEffect } from "react";
import LeftSidebar from "../components/leftSidebar";
import MainTweet from "../components/mainTweet";
import RightSidebar from "../components/rightSidebar";
import SignIn from "../components/signIn";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IRootState } from "../store";
import API from "../axios/api";
import {
  logout,
  updateCurrentUser,
  updateLoadingStatus,
} from "../store/userSlice";

const Home = () => {
  const { currentUser, isLoading } = useSelector(
    (state: IRootState) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      dispatch(logout());
      dispatch(updateLoadingStatus(false));
      return;
    }

    (async () => {
      if (!currentUser && accessToken) {
        dispatch(updateLoadingStatus(true));
        const status = await API.checkUserAuth(accessToken);

        if (status) {
          const res = await API.getUser(status.data.user_id);
          dispatch(updateCurrentUser(res.data));
          dispatch(updateLoadingStatus(false));
        }
      }
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-1 text-center">
          Loading
        </div>
      ) : (
        <>
          {!currentUser ? (
            <>
              <SignIn />
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4">
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
      )}
    </>
  );
};

export default Home;
