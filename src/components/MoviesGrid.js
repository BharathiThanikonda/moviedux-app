import React,{ useState} from "react";
import '../styles.css';
import MovieCard from "./MovieCard";

export default function MoviesGrid({movies, watchlist, toggleWatchlist}){

    
    const [searchTerm, setSearchTerm] = useState("");
    const [genre, setGenre] = useState("All Genres");
    const [rating, setRating] = useState("All");

    
    const handleGenre = (e) => {
        setGenre(e.target.value);
    };
       const handleRating = (e) => {
        setRating(e.target.value);
    };
       const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const matchesGenre = (movie,genre) => {
        return genre === "All Genres" || movie.genre.toLowerCase() === genre.toLowerCase();
    };

    const matchesRating = (movie,rating) => {
        switch(rating) {
            case "All":
                return true;
            case "Good":
                return movie.rating >= 8;
            case "Ok":
                return movie.rating < 8 && movie.rating >= 5;
            case "Bad":
                return movie.rating < 5;
            default:
                return false;
        }
    };

    const matchesSearchTerm = (movie,searchTerm) => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    };
        const filteredMovies = movies
            .filter((movie) => 
                matchesGenre(movie,genre) && matchesRating(movie,rating) && matchesSearchTerm(movie,searchTerm)
            );

    return (
        <div>
        <div>
            <input type="text" className="search-input"
                   placeholder="Search movies.." 
                   onChange={handleSearch}
                   value={searchTerm}
                   />
        </div>
        <div className="filter-bar">
            <div className = "filter-slot">
                <label>Genre</label>
                <select className = " filter-dropdown" value = {genre} onChange={handleGenre}>
                    <option>All Genres</option>
                    <option>Action</option>
                    <option>Fantasy</option>
                    <option>Drama</option>
                    <option>Horror</option>

                </select>
            </div>
            <div className = "filter-slot">
                <label>Rating</label>
                <select className="filter-dropdown" value={rating} onChange={handleRating}>
                    <option>All</option>
                    <option>Good</option>
                    <option>Ok</option>
                    <option>Bad</option>
                </select>
            </div>

        </div>
        <div className="movies-grid">
            {
                filteredMovies
                    .filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(movie => (
                        <MovieCard movie={movie} key={movie.id} toggleWatchlist={toggleWatchlist} isWatchlisted={watchlist.includes(movie.id)} />
                    ))
            }
             </div>
             </div>
    )
}