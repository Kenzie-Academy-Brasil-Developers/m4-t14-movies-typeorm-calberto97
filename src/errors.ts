import "express-async-errors";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { QueryFailedError } from "typeorm";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export const errorHandler = async (
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return response
      .status(400)
      .json({ message: error.flatten().fieldErrors });
  }

  if (error instanceof QueryFailedError) {
    return response.status(400).json({ message: error.message });
  }

  console.log(error);
  return response
    .status(500)
    .json({ message: "Internal Server Error" });
};
