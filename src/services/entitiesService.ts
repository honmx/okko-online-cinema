import $entitiesAPI from "@/http/entities";
import { IMovie } from "@/types/IMovie";
import { IPerson } from "@/types/IPerson";

const getMovies = async (): Promise<IMovie[]> => {
  try {
    const { data: movies } = await $entitiesAPI.get<IMovie[]>("/movie");
    return movies;

  } catch (error) {
    console.log(error);
    return [];
  }
}

const getMoviesByPersonName = async (name: string): Promise<IMovie> => {
  try {
    const { data: movie } = await $entitiesAPI.get<IMovie>(`/movie/human/${name}`);
    return movie;

  } catch (error) {
    console.log(error);
    return {} as IMovie;
  }
}

const getMovieByTitle = async (title: string): Promise<IMovie> => {
  try {
    const { data: movie } = await $entitiesAPI.get<IMovie>(`/movie/title/${title}`);
    return movie;

  } catch (error) {
    console.log(error);
    return {} as IMovie;
  }
}

const getPeople = async (): Promise<IPerson[]> => {
  try {
    const { data: persons } = await $entitiesAPI.get<IPerson[]>("/people");
    return persons;

  } catch (error) {
    console.log(error);
    return [] as IPerson[];
  }
}

export default { getMovies, getMoviesByPersonName, getMovieByTitle, getPeople };