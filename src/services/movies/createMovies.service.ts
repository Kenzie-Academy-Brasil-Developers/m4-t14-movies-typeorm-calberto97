import { AppError } from "./../../errors";
import { movieSchema } from "./../../schemas/movies";
import {
  tMovieCreationRequest,
  tMovieCreationResult,
} from "./../../interfaces/movies.interfaces";
import { AppDataSource } from "./../../data-source";
import { Movie } from "../../entities";

export const createMoviesService = async (
  payload: tMovieCreationRequest
): Promise<tMovieCreationResult> => {
  const movieRepo = AppDataSource.getRepository(Movie);

  // const movieCheck = await movieRepo.findOne({
  //   where: {
  //     name: payload.name,
  //   },
  // });

  // if (movieCheck) {
  //   throw new AppError("Movie already exists.", 409);
  // }

  const movie = movieRepo.create(payload);

  await movieRepo.save(movie);

  const newMovie = movieSchema.parse(movie);
  return newMovie;
};
