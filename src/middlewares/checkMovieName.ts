import { Movie } from "./../entities/movie.entity";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

export const checkMovieName = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const movieRepo = AppDataSource.getRepository(Movie);

  if (request.body.name) {
    const movieCheck = await movieRepo.findOne({
      where: {
        name: request.body.name,
      },
    });

    if (movieCheck) {
      throw new AppError("Movie already exists.", 409);
    }
  }

  return next();
};
