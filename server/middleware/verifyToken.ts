import jwt, { JwtPayload } from "jsonwebtoken";
import { handleResponse } from "./response";
import { Request, Response, NextFunction } from "express";
import { client } from "../redis";

export interface IRedisVerifyPayload extends JwtPayload {
  id: string;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  const currentUserId = req.params.user_id;

  if (!token) {
    next(handleResponse(res, 401, "You are not authenticated"));
    return;
  }

  const decoded = jwt.verify(
    token,
    `${process.env.JWT}`
  ) as IRedisVerifyPayload;

  const sessionToken = await client.get(decoded.id);

  // Check session in redis is valid && Current user is operating his own data
  if (sessionToken && sessionToken === token && currentUserId === decoded.id) {
    next();
  } else {
    return next(handleResponse(res, 401, "You are not authenticated"));
  }
};
