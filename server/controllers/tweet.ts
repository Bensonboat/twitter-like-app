import { handleResponse } from "../middleware/response";
import { Request, Response, NextFunction } from "express";
import Tweet, { ITweet } from "../models/tweet";
import User from "../models/user";

export const createTweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.user_id;

  const tweetContent: ITweet = {
    userId,
    description: req.body.description,
    likes: [],
  };

  const newTweet = new Tweet(tweetContent);

  try {
    const savedTweet = await newTweet.save();
    handleResponse(res, 200, JSON.parse(JSON.stringify(savedTweet)));
  } catch (err) {
    next(handleResponse(res, 500, "Create tweet error"));
  }
};

export const getUserCreatedTweets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userTweets = await Tweet.find({ userId: req.params.user_id }).sort({
      createAt: -1,
    });

    handleResponse(res, 200, JSON.parse(JSON.stringify(userTweets)));
  } catch (err) {
    next(handleResponse(res, 500, "Get current user's tweets error"));
  }
};

export const getAllTweets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = await User.findById(req.params.user_id);

    if (!currentUser) {
      handleResponse(res, 400, "User not exist!");
      return;
    }

    const userTweets = await Tweet.find({ userId: currentUser._id });
    const followersTweets = await Promise.all(
      currentUser.following.map((followerId) => {
        return Tweet.find({ userId: followerId });
      })
    );

    const feed = userTweets.concat(...followersTweets);
    handleResponse(res, 200, JSON.parse(JSON.stringify(feed)));
  } catch (err) {
    handleResponse(res, 500, "Get tweet error!");
  }
};

export const UpdateTweetLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tweet = await Tweet.findById(req.params.tweet_id);
    const currentUserId = req.params.user_id;

    if (!tweet) {
      handleResponse(res, 404, "Tweet not exist");
      return;
    }

    if (!tweet.likes.includes(currentUserId)) {
      await tweet.updateOne({ $push: { likes: currentUserId } });
      handleResponse(res, 200, "Liked!");
    } else {
      await tweet.updateOne({ $pull: { likes: currentUserId } });
      handleResponse(res, 200, "Un-liked!");
    }
  } catch (err) {
    handleResponse(res, 500, "Like tweet error");
  }
};

export const deleteTweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tweet = await Tweet.findById(req.params.tweet_id);

    if (tweet) {
      await tweet.deleteOne();
      handleResponse(res, 200, "tweet delete successfully");
    } else {
      next(handleResponse(res, 404, "Tweet not exist"));
    }
  } catch (err) {
    next(handleResponse(res, 500, "Tweet delete fail"));
  }
};

export const getExploreTweets = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getExploreTweets = await Tweet.find({
      likes: { $exists: true },
    }).sort({ likes: -1 });

    handleResponse(res, 200, JSON.parse(JSON.stringify(getExploreTweets)));
  } catch (err) {
    next(handleResponse(res, 200, "Get Explore Tweets error"));
  }
};
