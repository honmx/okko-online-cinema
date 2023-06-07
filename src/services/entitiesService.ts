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

const getPersonByName = async (name: string): Promise<IPerson[]> => {
  try {
    const { data: person } = await $entitiesAPI.get<IPerson[]>(`/people/${name}`);
    return person;
  
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

const getTop10Movies = async (): Promise<IMovie[]> => {
  try {
    const { data: movies } = await $entitiesAPI.get<IMovie[]>(`movie/rate/8.8`);
    return movies.filter(movie => movie.verticalPhoto).slice(0, 10);

  } catch (error) {
    console.log(error);
    return [];
  }
}

const getMoviesByCountry = async (country: string): Promise<IMovie[]> => {
  try {
    const { data: movies } = await $entitiesAPI.get<IMovie[]>(`movie/country/${country}`);
    return movies;

  } catch (error) {
    console.log(error);
    return [];
  }
}

const getMoviesByGenre = async (genre: string): Promise<IMovie[]> => {
  try {
    const { data: movies } = await $entitiesAPI.get<IMovie[]>(`movie/genre/${genre}`);
    return movies;

  } catch (error) {
    console.log(error);
    return [];
  }
}

const getMoviesByMinRating = async (minRating: number): Promise<IMovie[]> => {
  try {
    const { data: movies } = await $entitiesAPI.get<IMovie[]>(`movie/rate/${minRating}`);
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
  getPersonByName,
  getReviewsByMovieId,
  getRecommendedMovies,
  getTop10Movies,
  getMoviesByCountry,
  getMoviesByGenre,
  getMoviesByMinRating,
  updateMovie,
  updateGenre
};