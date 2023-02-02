import mongoose from "mongoose";

export interface ITweet {
  userId: string;
  description: string;
  likes: string[];
}

const TweetSchema = new mongoose.Schema<ITweet>(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      max: 280,
    },
    likes: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<ITweet>("Tweet", TweetSchema);
