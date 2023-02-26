import { movieSchema } from "./../../schemas/movies";
import { Movie } from "./../../entities/movie.entity";
import {
  tMovieCreationResult,
  tMovieUpdate,
} from "./../../interfaces/movies.interfaces";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";

export const updateMovieService = async (
  payload: tMovieUpdate,
  id: number
): Promise<tMovieCreationResult> => {
  const movieRepo = AppDataSource.getRepository(Movie);

  const movie = await movieRepo.findOneBy({
    id: id,
  });

  const updatedMovie = movieRepo.create({
    ...movie,
    ...payload,
  });

  await movieRepo.save(updatedMovie);

  return movieSchema.parse(updatedMovie);
};
