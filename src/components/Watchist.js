import React, { useState } from "react";
import '../styles.css'
import MovieCard from "./MovieCard";

export default function WatchList({movies, watchlist, toggleWatchlist}){
    const [sortBy, setSortBy] = useState("title");
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const sortedWatchlist = [...watchlist]
        .map(id => movies.find(m => m.id === id))
        .filter(Boolean)
        .sort((a, b) => {
            if (sortBy === "title") {
                return a.title.localeCompare(b.title);
            } else if (sortBy === "year") {
                return (a.year || 0) - (b.year || 0);
            } else if (sortBy === "rating") {
                return b.rating - a.rating;
            }
            return 0;
        });

    const clearWatchlist = () => {
        watchlist.forEach(id => toggleWatchlist(id));
    };

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedMovie(null);
    };

    return (
        <div className="title">
            <h2>Your Watchlist ({watchlist.length} movies)</h2>
            
            {watchlist.length > 0 && (
                <div className="watchlist-controls">
                    <div className="sort-controls">
                        <label>Sort by: </label>
                        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                            <option value="title">Title</option>
                            <option value="year">Year</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                    <button className="clear-btn" onClick={clearWatchlist}>
                        Clear All
                    </button>
                </div>
            )}
            
            <div className = "watchlist">
                {sortedWatchlist.length === 0 ? (
                    <div className="empty-watchlist">
                        <h3>Your watchlist is empty</h3>
                        <p>Start adding movies to keep track of what you want to watch!</p>
                    </div>
                ) : (
                    sortedWatchlist.map(movie => (
                        <div key={movie.id} className="watchlist-item">
                            <MovieCard 
                                movie={movie} 
                                isWatchlisted={true} 
                                toggleWatchlist={toggleWatchlist} 
                            />
                            <div className="watchlist-item-actions">
                                <button 
                                    className="view-details-btn" 
                                    onClick={() => openModal(movie)}
                                >
                                    View Details
                                </button>
                                <button 
                                    className="remove-btn" 
                                    onClick={() => toggleWatchlist(movie.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
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
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}