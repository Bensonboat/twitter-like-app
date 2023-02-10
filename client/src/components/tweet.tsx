import { Dispatch, SetStateAction, useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IRootState } from "../store";
import { IUser } from "../store/userSlice";
import API from "../axios/api";

export interface ITweet {
  _id?: string;
  userId: string;
  description: string;
  likes: string[];
}

interface ITweetProps {
  tweet: ITweet;
  userData: IUser;
  setData: Dispatch<SetStateAction<ITweet[] | null>>;
}

const Tweet = (props: ITweetProps) => {
  const { currentUser } = useSelector((state: IRootState) => state.user);
  const location = useLocation().pathname;
  const { id } = useParams();
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await API.getUser(props.tweet.userId);
        setUserData(user.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, []);

  const handleLike = async (e: any) => {
    e.preventDefault();
    if (!currentUser) {
      return;
    }

    try {
      await API.updateTweetLike(props.tweet!._id!, currentUser._id);
      let res;
      if (location.includes("profile")) {
        res = await API.getUserAllTweets(id!);
      } else if (location.includes("explore")) {
        res = await API.exploreTweets();
      } else {
        res = await API.getTimelineTweets(id!);
      }
      props.setData(res.data);
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div>
      {userData && (
        <>
          <div className="flex space-x-2">
            <Link to={`/profile/${userData._id}`}>
              <h3 className="font-bold">{userData.username}</h3>
            </Link>
            <span className="font-normal">@{userData.username}</span>
          </div>
          <p>{props.tweet.description}</p>
          <button onClick={handleLike}>
            {props.tweet.likes.includes(currentUser!._id) ? (
              <FavoriteIcon className="mr-2 my-2 cursor-pointer"></FavoriteIcon>
            ) : (
              <FavoriteBorderIcon className="mr-2 my-2 cursor-pointer"></FavoriteBorderIcon>
            )}
            {props.tweet.likes.length}
          </button>
        </>
      )}
    </div>
  );
};

export default Tweet;
