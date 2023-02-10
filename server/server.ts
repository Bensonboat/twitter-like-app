import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user";
import tweetRoutes from "./routes/tweet";
import authRoutes from "./routes/auth";

import { createRedis } from "./redis";

const app = express();
app.use(cors());

dotenv.config();

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(`${process.env.MONGO_DB}`);
};

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", tweetRoutes);

app.listen(8000, async () => {
  console.log("- Application started on port 8000!");
  await connect();
  console.log("- Mongodb database connected!");
  await createRedis();
  console.log("- Redis connected!");
});
