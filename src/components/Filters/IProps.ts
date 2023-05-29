import { IGenre } from "@/types/IGenre";

export default interface Props {
  showProducerFilter?: boolean;
  showActorFilter?: boolean;
  genres: IGenre[];
  countries: string[];
}