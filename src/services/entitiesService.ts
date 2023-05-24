import $entitiesAPI from "@/http/entities";
import { IMovie } from "@/types/IMovie";

const getMovies = async () => {
  try {
    const { data: movies } = await $entitiesAPI.get<IMovie[]>("/movie");
  
    return movies;
  } catch (error) {
    console.log(error);
  }
}


export default { getMovies };