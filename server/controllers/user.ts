import User from "../models/user";
// import Tweet from "../models/Tweet.js";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { handleResponse } from "../middleware/response";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, `${process.env.JWT}`);

    // @ts-ignore
    // this type is not implemented yet!
    const { password, ...othersData } = newUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(othersData);
  } catch (err) {
    next(handleResponse(res, 400, "Create user error"));
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filter = {};
  try {
    const users = await User.find(filter);
    handleResponse(res, 200, JSON.parse(JSON.stringify(users)));
  } catch (err) {
    next(handleResponse(res, 400, "Get users error"));
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.user_id);
    handleResponse(res, 200, JSON.parse(JSON.stringify(user)));
  } catch (err) {
    next(handleResponse(res, 400, "Get user error"));
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.user_id,
      {
        // followers: [],
        // following: [],
        // Only put updatable filed here!!
        // followers: ["k1"],
        // ===========
        // $set: req.body, // update every filed send in
      },
      {
        new: true,
      }
    );
    handleResponse(res, 200, JSON.parse(JSON.stringify(updatedUser)));
  } catch (err) {
    next(handleResponse(res, 400, "Update user error"));
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await User.findByIdAndDelete(req.params.user_id);
    // await Tweet.remove({ userId: req.params.user_id });

    handleResponse(res, 200, "User deleted");
  } catch (err) {
    next(handleResponse(res, 400, "Delete user error"));
  }
};

export const follow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUserId = req.params.user_id;
    const targetUserId = req.body.target_id;

    // current user
    const currentUser = await User.findById(currentUserId);

    // the user would like to follow
    const targetUser = await User.findById(targetUserId);

    if (!targetUser || !currentUser) {
      handleResponse(res, 404, "Account not exist");
      return;
    }

    if (!targetUser.followers.includes(currentUserId)) {
      await targetUser.updateOne({
        $push: { followers: currentUserId },
      });

      await currentUser.updateOne({ $push: { following: targetUserId } });
    } else {
      handleResponse(res, 200, "You already followed this user");
      return;
    }

    handleResponse(res, 200, "Followed!");
  } catch (err) {
    next(handleResponse(res, 400, "follow user error"));
  }
};

export const unFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUserId = req.params.user_id;
    const targetUserId = req.body.target_id;

    // current user
    const currentUser = await User.findById(currentUserId);

    // the user would like to follow
    const targetUser = await User.findById(targetUserId);

    if (!targetUser || !currentUser) {
      handleResponse(res, 404, "Account not exist");
      return;
    }

    if (currentUser.following.includes(targetUserId)) {
      await currentUser.updateOne({
        $pull: { following: targetUserId },
      });

      await targetUser.updateOne({ $pull: { followers: currentUserId } });
    } else {
      handleResponse(res, 200, "You are not following this user");
      return;
    }

    handleResponse(res, 200, "Un-followed");
  } catch (err) {
    next(handleResponse(res, 400, "un-follow user error"));
  }
};
