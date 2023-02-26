import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";

export const deleteMovieService = async (
  id: number
): Promise<void> => {
  const movieRepo = AppDataSource.getRepository(Movie);

  const movie = await movieRepo.findOne({
    where: {
      id: id,
    },
  });

  await movieRepo.remove(movie!);
};
