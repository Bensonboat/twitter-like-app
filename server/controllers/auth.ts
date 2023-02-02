import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleResponse } from "../middleware/response";
import { Request, Response, NextFunction } from "express";
import { client } from "../redis";

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

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(othersData);
  } catch (err) {
    next(handleResponse(res, 400, "Login error"));
  }
};
