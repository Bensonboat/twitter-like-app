import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Tweet, { ITweet } from "./tweet";
import { IRootState } from "../store";
import API from "../axios/api";

const ExploreTweets = () => {
  const [explore, setExplore] = useState<ITweet[] | null>(null);
  const { currentUser } = useSelector((state: IRootState) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tweets = await API.exploreTweets();
        setExplore(tweets.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, [currentUser]);

  return (
    <div className="mt-6">
      {explore &&
        explore.map((tweet) => {
          return (
            <div key={tweet._id} className="p-2">
              <Tweet
                tweet={tweet}
                setData={setExplore}
                userData={currentUser!}
              />
            </div>
          );
        })}
    </div>
  );
};

export default ExploreTweets;
