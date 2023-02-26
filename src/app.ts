import { errorHandler } from "./errors";
import express, { Application } from "express";
import { moviesRouter } from "./routers/movies.routes";

const app: Application = express();
app.use(express.json());

app.use("/movies", moviesRouter);

app.use(errorHandler);

export default app;