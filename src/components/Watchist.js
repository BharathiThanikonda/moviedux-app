import React from "react";
import '../styles.css'
import MovieCard from "./MovieCard";

export default function WatchList({movies, watchlist, toggleWatchlist}){
    return (
        <div className="title">
            <h2>Your Watchlist</h2>
            <div className = "watchlist">
                {watchlist.map(movieId => {
                    const movie = movies.find(m => m.id === movieId);
                    return movie ? (
                        <MovieCard key={movie.id} movie={movie} isWatchlisted={true} toggleWatchlist={toggleWatchlist} />
                    ) : null;
                })}
            </div>
            
        </div>
    );
}