import { Movie } from "./../entities/movie.entity";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

export const checkForMovie = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const movieRepo = AppDataSource.getRepository(Movie);

  const findMovie = await movieRepo.findOne({
    where: {
      id: +request.params.id,
    },
  });

  if (!findMovie) {
    throw new AppError("Movie not found", 404);
  }

  return next();
};
