import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Tweet, { ITweet } from "./tweet";
import { IRootState } from "../store";
import API from "../axios/api";

const TimelineTweet = () => {
  const [timeLine, setTimeLine] = useState<ITweet[] | null>(null);
  const { currentUser } = useSelector((state: IRootState) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        return;
      }

      try {
        const timelineTweets = await API.getTimelineTweets(currentUser?._id);
        setTimeLine(timelineTweets.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser?._id]);

  return (
    <div className="mt-6">
      {timeLine &&
        timeLine.map((tweet: any) => {
          return (
            <div key={tweet._id} className="p-2">
              <Tweet
                tweet={tweet}
                setData={setTimeLine}
                userData={currentUser!}
              />
            </div>
          );
        })}
    </div>
  );
};

export default TimelineTweet;
