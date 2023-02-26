import { Request, Response } from "express";
import { createMoviesService } from "../services/movies/createMovies.service";
import { deleteMovieService } from "../services/movies/deleteMovie.service";
import { getAllMoviesService } from "../services/movies/getAllMovies.service";
import { updateMovieService } from "../services/movies/updateMovie.service";

export const createMovieController = async (
  request: Request,
  response: Response
) => {
  const movie = await createMoviesService(request.body);
  return response.status(201).json(movie);
};

export const getAllMoviesController = async (
  request: Request,
  response: Response
) => {
  const movies = await getAllMoviesService(request.query);

  return response.json(movies);
};

export const updateMovieController = async (
  request: Request,
  response: Response
) => {
  const movie = await updateMovieService(
    request.body,
    +request.params.id
  );

  return response.json(movie);
};

export const deleteMovieController = async (
  request: Request,
  response: Response
) => {
  await deleteMovieService(+request.params.id);

  return response.status(204).send();
};
