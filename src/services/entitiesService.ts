import $entitiesAPI from "@/http/entities";
import { IGenre } from "@/types/IGenre";
import { IMovie } from "@/types/IMovie";
import { IPerson } from "@/types/IPerson";
import axios, { AxiosResponse } from "axios";

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

const getAdminMovies = async (): Promise<IMovie[]> => {
  try {
    const { data: movies } = await $entitiesAPI.get<IMovie[]>("/admin/movies");
    return movies;

  } catch (error) {
    console.log(error);
    return [];
  }
}

const getGenres = async (): Promise<IGenre[]> => {
  try {
    const { data: genres } = await $entitiesAPI.get<IGenre[]>("/admin/genres");
    return genres;

  } catch (error) {
    console.log(error);
    return [];
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

const getReviewsByMovieId = async (id: number) => {
  try {
    const { data: reviews } = await axios.get(`http://localhost:5000/review/movie/${id}`);

    return reviews;

  } catch (error) {
    console.log(error);
  }
}

const getRecommendedMovies = async (movie: IMovie): Promise<IMovie[]> => {
  try {
    const { data: movies } = await $entitiesAPI.get<IMovie[]>(`/movie/genre/${movie.genres[0].title}`);
    return movies;

  } catch (error) {
    console.log(error);
    return [];
  }
}

const updateMovie = async (id: number, title: string, originalTitle: string) => {
  try {
    const { data: movie } = await $entitiesAPI.put("/admin/movie", {
      id,
      title,
      originalTitle
    });

    return movie;

  } catch (error) {
    console.log(error);
  }
}

const updateGenre = async (id: number, title: string, originalTitle: string) => {
  try {
    const { data: genre } = await $entitiesAPI.put("/admin/genre", {
      id,
      genre: title,
    });

    return genre;

  } catch (error) {
    console.log(error);
  }
}

export default {
  getMovies,
  getMoviesByPersonName,
  getMovieByTitle,
  getAdminMovies,
  getGenres,
  getPeople,
  getReviewsByMovieId,
  getRecommendedMovies,
  updateMovie,
  updateGenre
};