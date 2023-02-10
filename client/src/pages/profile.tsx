import { useState, useEffect } from "react";
import LeftSidebar from "../components/leftSidebar";
import RightSidebar from "../components/rightSidebar";
import EditProfile from "../components/editProfile";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Tweet, { ITweet } from "../components/tweet";
import {
  following,
  IUser,
  logout,
  updateCurrentUser,
  updateLoadingStatus,
} from "../store/userSlice";
import { IRootState } from "../store";
import API from "../axios/api";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state: IRootState) => state.user);
  const [userTweets, setUserTweets] = useState<ITweet[] | null>(null);
  const [userProfile, setUserProfile] = useState<IUser | null>(null);

  const { id } = useParams();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweets = await API.getUserAllTweets(id!);
        const userProfile = await API.getUser(id!);

        setUserTweets(userTweets.data);
        setUserProfile(userProfile.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser, id]);

  const handleFollow = async () => {
    if (!id) {
      return;
    }

    if (!currentUser?.followers.includes(id)) {
      await API.follow(currentUser?._id!, { target_id: id });
      dispatch(following(id));
    } else {
      await API.unFollow(currentUser?._id!, { target_id: id });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-6">
          <LeftSidebar />
        </div>
        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <div className="flex justify-between items-center">
            <img
              src={userProfile?.profilePicture}
              alt="Profile Picture"
              className="w-12 h-12 rounded-full"
            />
            {currentUser?._id === id ? (
              <button
                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                onClick={() => setOpen(true)}
              >
                Edit Profile
              </button>
            ) : currentUser?.following.includes(id!) ? (
              <button
                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                onClick={handleFollow}
              >
                Following
              </button>
            ) : (
              <button
                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                onClick={handleFollow}
              >
                Follow
              </button>
            )}
          </div>
          <div className="mt-6">
            {userTweets &&
              userTweets.map((tweet) => {
                return (
                  <div className="p-2" key={tweet._id}>
                    <Tweet
                      tweet={tweet}
                      setData={setUserTweets}
                      userData={currentUser!}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        <div className="px-6">
          <RightSidebar />
        </div>
      </div>
      {open && <EditProfile setOpen={setOpen} />}
    </>
  );
};

export default Profile;
