import { DeepPartial, Repository } from 'typeorm';
import { movieGetAllSchema, movieSchema, movieUpdateSchema } from "./../schemas/movies";
import { z } from "zod";
// import { movieCreationRequestSchema } from "../schemas/movies";


export type tMovieCreationRequest = z.infer<
  typeof movieCreateSchema
>;
export type tMovieCreationResult = z.infer<typeof movieSchema>;

export type tAllMovies = z.infer<typeof movieGetAllSchema>;

export type tMovieUpdate = DeepPartial<tMovieCreationRequest>

export interface iPagination {
  prevPage: string | null,
  nextPage: string | null,
  count: number,
  data: tAllMovies
}

// import { DeepPartial, Repository } from "typeorm";
// import { z } from "zod";
import { Movie } from "../entities";
import { movieCreateSchema } from "../schemas";

type iMovieCreate = z.infer<typeof movieCreateSchema>;
type iMovieUpdate = DeepPartial<Movie>;
type iMovieRepo = Repository<Movie>;

export { iMovieCreate, iMovieUpdate, iMovieRepo };