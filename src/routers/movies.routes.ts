import { checkMovieName } from './../middlewares/checkMovieName';
import { checkForMovie } from './../middlewares/checkForMovie';
import { deleteMovieController, getAllMoviesController, updateMovieController } from './../controllers/movies.controllers';
import { movieCreateSchema, movieUpdateSchema } from "./../schemas/movies";
import { Router } from "express";
import { createMovieController } from "../controllers/movies.controllers";
import { validateBody } from "../middlewares/validateBody";

export const moviesRouter: Router = Router();

moviesRouter.post(
  "",
  checkMovieName,
  validateBody(movieCreateSchema),
  createMovieController
);
moviesRouter.get("", getAllMoviesController)
moviesRouter.patch("/:id", checkForMovie, checkMovieName, validateBody(movieUpdateSchema), updateMovieController)
moviesRouter.delete("/:id", checkForMovie, deleteMovieController)



// userRouter.get("/:id")
