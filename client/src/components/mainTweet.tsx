import { useState } from "react";
import TimelineTweet from "./timelineTweet";
import { useSelector } from "react-redux";
import API from "../axios/api";
import { ITweet } from "./tweet";
import { IRootState } from "../store";

const MainTweet = () => {
  const [tweetText, setTweetText] = useState("");

  const { currentUser } = useSelector((state: IRootState) => state.user);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data: ITweet = {
      userId: currentUser!._id,
      description: tweetText,
      likes: [],
    };
    await API.createTweet(data);
    window.location.reload();
  };

  return (
    <div>
      {currentUser && (
        <p className="font-bold pl-2 my-2">{currentUser.username}</p>
      )}

      <form className="border-b-2 pb-6">
        <textarea
          onChange={(e) => setTweetText(e.target.value)}
          // @ts-ignore
          type="text"
          placeholder="What's happening"
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
        >
          Tweet
        </button>
      </form>
      <TimelineTweet />
    </div>
  );
};

export default MainTweet;
