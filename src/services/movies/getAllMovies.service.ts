import { movieGetAllSchema } from "./../../schemas/movies";
import { Movie } from "./../../entities/movie.entity";
import {
  iPagination,
  tAllMovies,
} from "./../../interfaces/movies.interfaces";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";

export const getAllMoviesService = async (
  payload: any
): Promise<iPagination> => {
  const movieRepo: Repository<Movie> =
    AppDataSource.getRepository(Movie);

  let page: number = +payload.page || 1;
  let perPage: number = +payload.perPage || 5;
  let sort = payload.sort;
  let order;
  if (payload.order) {
    order = payload.order.toUpperCase();
  }

  if (!sort || (sort !== "price" && sort !== "duration")) {
    sort = "id";
  }

  if ((order !== "ASC" && order !== "DESC") || sort === "id") {
    order = "ASC";
  }

  if (perPage < 0 || perPage > 5) {
    perPage = 5;
  }

  if (page < 0 || !Number.isInteger(page)) {
    page = 1;
  }

  const movies = await movieRepo.findAndCount({
    take: perPage,
    skip: perPage * (page - 1),
    order: {
      [`${sort}`]: `${order}`,
    },
  });

  const baseUrl = `http://localhost:3000/movies`;
  const lastPage = Math.ceil(movies[1] / perPage);
  const prevPage =
    page <= 1
      ? null
      : lastPage >= page - 1
      ? `${baseUrl}?page=${page - 1}&perPage=${perPage}`
      : null;
  const nextPage =
    lastPage <= page
      ? null
      : `${baseUrl}?page=${page + 1}&perPage=${perPage}`;

  return {
    prevPage: prevPage !== null ? `${prevPage}` : null,
    nextPage: nextPage !== null ? `${nextPage}` : null,
    count: movies[1],
    data: movies[0],
  };
};
