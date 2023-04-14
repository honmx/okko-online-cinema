// поменять, как только будем забирать данные с бекенда 
export interface IMovie {
  id: string;
  title: string;
  description: string;
  language_audio: string[];
  language_subtitles: string[];
  duration: string;
  year: string;
  genre: string[];
  age_category: string;
  director: string;
  rating: string;
  actors: string[];
  image: string;
}