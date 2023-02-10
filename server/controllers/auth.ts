import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleResponse } from "../middleware/response";
import { Request, Response, NextFunction } from "express";
import { client } from "../redis";
import { IRedisVerifyPayload } from "../middleware/verifyToken";

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(handleResponse(res, 404, "User not found"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(handleResponse(res, 400, "Wrong password"));

    const token = jwt.sign({ id: user._id }, `${process.env.JWT}`);

    // @ts-ignore
    // this type is not implemented yet!
    const { password, ...othersData } = user._doc;

    // Redis session
    client.set(user._id.toString(), token);

    const payload = { ...othersData, access_token: token };
    res.status(200).json(payload);
  } catch (err) {
    next(handleResponse(res, 400, "Login error"));
  }
};

export const checkLoginStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const access_token = req.headers.authorization;

  if (!access_token) {
    next(handleResponse(res, 400, "Auth error"));
    return;
  }

  let decoded = null;
  try {
    decoded = jwt.verify(
      access_token,
      `${process.env.JWT}`
    ) as IRedisVerifyPayload;

    if (!decoded) {
      next(handleResponse(res, 400, "Auth error"));
      return;
    }
  } catch {
    next(handleResponse(res, 400, "Auth error"));
    return;
  }

  const sessionToken = await client.get(decoded!.id);
  if (sessionToken) {
    res.status(200).json({
      user_id: decoded!.id,
      access_token,
    });
  } else {
    next(handleResponse(res, 400, "Auth error"));
  }
};
