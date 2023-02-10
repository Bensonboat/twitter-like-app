import { useEffect } from "react";
import ExploreTweets from "../components/exploreTweets";
import LeftSidebar from "../components/leftSidebar";
import RightSidebar from "../components/rightSidebar";
import { useSelector } from "react-redux";
import SignIn from "../components/signIn";
import { IRootState } from "../store";
import {
  logout,
  updateCurrentUser,
  updateLoadingStatus,
} from "../store/userSlice";
import { useDispatch } from "react-redux";
import API from "../axios/api";

const Explore = () => {
  const { currentUser } = useSelector((state: IRootState) => state.user);
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
      {!currentUser ? (
        <SignIn />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="px-6">
            <LeftSidebar />
          </div>
          <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
            <ExploreTweets />
          </div>
          <div className="px-6">
            <RightSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Explore;
