import React from "react";
import '../styles.css';

export default function MovieCard({ movie ,isWatchlisted,toggleWatchlist}) {
    const handleError = (e) => {
        e.target.src = `${process.env.PUBLIC_URL}/images/default.jpg`; // Fallback image
    };
    const getRatingClass = (rating) => {
        if (rating >= 8) return 'rating-good';
        if (rating >= 5) return 'rating-ok';
        return 'rating-bad';
    };
    return (
        <div>
            <div className="movie-card" key={movie.id}>
                <img src={`${process.env.PUBLIC_URL}/images/${movie.image}`} alt={movie.title} onError={handleError} />
                <div className="movie-card-info">
                            <h3 className = 'movie-card-title'>{movie.title}</h3>
                            <div>
                            <span className = 'movie-card-genre'>{movie.genre}</span>
                            <span className = {`movie-card-rating ${getRatingClass(movie.rating)}`}>{movie.rating}</span>
                            </div>
                            <label className = "switch">
                                <input type="checkbox" checked={isWatchlisted} onChange={() => toggleWatchlist(movie.id)} />
                                <span className = "slider"> 
                                <span className = "slider-label"> {isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}</span> 

                                </span>
                            </label>
                            

                            </div>
                            </div>
        </div>
    )
    }
   