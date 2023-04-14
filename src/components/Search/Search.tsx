import React, {useEffect, useState} from 'react';
import IconButton from "@/components/UI/IconButton/IconButton";
import styles from "./Search.module.scss";
import Image from "next/image";
import search from "@/assets/search_icon.svg";
import close from "@/assets/close.svg";
import moviesData from "@/helpers/data/data.json"
import CustomLink from "@/components/UI/CustomLink/CustomLink";


type Movie = {
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
};

type SearchProps = {
    movies: Movie[];
    onSearch: (query: string) => void;
};

const Search: React.FC<SearchProps> = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<[]>([]);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        // Filter movies based on search query
        const filteredMovies = moviesData.movie.filter(movie =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (!searchQuery) {
            setSearchResults([])
        } else {
            setSearchResults(filteredMovies);
        }
    }, [searchQuery, moviesData.movie]);


    return (
        <div>
            <div className={styles.search}>
                <IconButton>
                    <Image width={30} height={30} src={search} alt="search"/>
                </IconButton>
                <input type="text" value={searchQuery} onChange={handleInputChange}
                       placeholder="Название фильма, сериала или имя актёра, режиссёра"/>
            </div>
            <div className={styles.result_list}>
                {searchResults.map(movie => (
                    <div key={movie.id}>
                        <h2>
                            <CustomLink href={movie.title}>
                                {movie.title}
                            </CustomLink>
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    )
        ;
};

export default Search;