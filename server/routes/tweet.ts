import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  createTweet,
  getUserCreatedTweets,
  deleteTweet,
  UpdateTweetLike,
  getAllTweets,
  getExploreTweets,
} from "../controllers/tweet";

const router = express.Router();

// Create a Tweet
router.post("/tweet/user/:user_id", verifyToken, createTweet);
router.get("/tweet/user/:user_id", verifyToken, getUserCreatedTweets);
router.delete("/tweet/:tweet_id/user/:user_id", verifyToken, deleteTweet);
router.put("/tweet/:tweet_id/user/:user_id/like", verifyToken, UpdateTweetLike);
router.get("/tweet/user/:user_id/feed", verifyToken, getAllTweets);
router.get("/tweet/explore", getExploreTweets);

export default router;
