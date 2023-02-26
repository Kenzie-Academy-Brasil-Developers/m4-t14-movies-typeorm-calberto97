import { DeepPartial, Repository } from "typeorm";
import { movieGetAllSchema, movieSchema } from "./../schemas/movies";
import { z } from "zod";
import { Movie } from "../entities";
import { movieCreateSchema } from "../schemas";

export type tMovieCreationRequest = z.infer<typeof movieCreateSchema>;
export type tMovieCreationResult = z.infer<typeof movieSchema>;

export type tAllMovies = z.infer<typeof movieGetAllSchema>;

export type tMovieUpdate = DeepPartial<tMovieCreationRequest>;

export interface iPagination {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: tAllMovies;
}

type iMovieCreate = z.infer<typeof movieCreateSchema>;
type iMovieUpdate = DeepPartial<Movie>;
type iMovieRepo = Repository<Movie>;

export { iMovieCreate, iMovieUpdate, iMovieRepo };
