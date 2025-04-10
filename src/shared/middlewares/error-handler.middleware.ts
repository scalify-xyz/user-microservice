import { Request, Response, NextFunction } from "express";

export const ErrorHandlerMiddleware = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction,
): void => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
};
