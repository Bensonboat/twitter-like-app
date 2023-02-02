import { Response } from "express";

export const handleResponse = (
  res: Response,
  status_code: number,
  message: string
) => {
  return res.status(status_code).send(message);
};
