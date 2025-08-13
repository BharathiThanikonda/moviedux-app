import React,{ useState} from "react";
import '../styles.css';
import MovieCard from "./MovieCard";

export default function MoviesGrid({movies, watchlist, toggleWatchlist}){
    const [searchTerm, setSearchTerm] = useState("");
    const [genre, setGenre] = useState("All Genres");
    const [rating, setRating] = useState("All");
    const [sortBy, setSortBy] = useState("title");
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleGenre = (e) => {
        setGenre(e.target.value);
    };
    
    const handleRating = (e) => {
        setRating(e.target.value);
    };
    
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (e) => {
        setSortBy(e.target.value);
    };

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedMovie(null);
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
        )
        .sort((a, b) => {
            if (sortBy === "title") {
                return a.title.localeCompare(b.title);
            } else if (sortBy === "year") {
                return (b.year || 0) - (a.year || 0);
            } else if (sortBy === "rating") {
                return b.rating - a.rating;
            }
            return 0;
        });

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

                <div className = "filter-slot">
                    <label>Sort by</label>
                    <select className="filter-dropdown" value={sortBy} onChange={handleSort}>
                        <option value="title">Title</option>
                        <option value="year">Year</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
            </div>

            <div className="results-info">
                Showing {filteredMovies.length} of {movies.length} movies
            </div>
            
            <div className="movies-grid">
                {filteredMovies.map(movie => (
                    <div key={movie.id} className="movie-grid-item">
                        <MovieCard 
                            movie={movie} 
                            toggleWatchlist={toggleWatchlist} 
                            isWatchlisted={watchlist.includes(movie.id)} 
                        />
                        <button 
                            className="view-details-btn" 
                            onClick={() => openModal(movie)}
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {showModal && selectedMovie && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>×</button>
                        <div className="modal-body">
                            <img 
                                src={`${process.env.PUBLIC_URL}/images/${selectedMovie.image}`} 
                                alt={selectedMovie.title}
                                className="modal-image"
                            />
                            <div className="modal-info">
                                <h2>{selectedMovie.title}</h2>
                                <p><strong>Genre:</strong> {selectedMovie.genre}</p>
                                <p><strong>Rating:</strong> {selectedMovie.rating}/10</p>
                                <p><strong>Year:</strong> {selectedMovie.year || 'N/A'}</p>
                                <p><strong>Description:</strong> {selectedMovie.description || 'No description available.'}</p>
                                <div className="modal-actions">
                                    <button 
                                        className={`modal-watchlist-btn ${watchlist.includes(selectedMovie.id) ? 'remove' : 'add'}`}
                                        onClick={() => toggleWatchlist(selectedMovie.id)}
                                    >
                                        {watchlist.includes(selectedMovie.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}