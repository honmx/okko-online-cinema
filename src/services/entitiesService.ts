import $entitiesAPI from "@/http/entities";
import { IMovie } from "@/types/IMovie";

const getMovies = async () => {
  try {
    const { data: movies } = await $entitiesAPI.get<IMovie[]>("/movie");
    return movies;
  
  } catch (error) {
    console.log(error);
    return [];
  }
}

const getMoviesByPersonName = async (name: string) => {
  try {
    const { data: movie } = await $entitiesAPI.get<IMovie>(`/movie/human/${name}`);
    return movie;

  } catch (error) {
    console.log(error);
    return {} as IMovie;
  }
}

const getMovieByTitle = async (title: string) => {
  try {
    const { data: movie } = await $entitiesAPI.get<IMovie>(`/movie/title/${title}`);
    return movie;

  } catch (error) {
    console.log(error);
    return {} as IMovie;
  }
}


export default { getMovies, getMoviesByPersonName, getMovieByTitle, };