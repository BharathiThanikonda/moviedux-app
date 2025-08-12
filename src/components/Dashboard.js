import React from "react";
import '../styles.css';

export default function Dashboard({ movies, watchlist }) {
    const watchedMovies = movies.filter(movie => watchlist.includes(movie.id));
    
    const stats = {
        totalMovies: movies.length,
        watchlistCount: watchlist.length,
        averageRating: watchedMovies.length > 0 
            ? (watchedMovies.reduce((sum, movie) => sum + movie.rating, 0) / watchedMovies.length).toFixed(1)
            : 0,
        genreStats: {}
    };

    // Calculate genre statistics
    watchedMovies.forEach(movie => {
        stats.genreStats[movie.genre] = (stats.genreStats[movie.genre] || 0) + 1;
    });

    const topGenres = Object.entries(stats.genreStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3);

    return (
        <div className="dashboard">
            <div className="title">
                <h2>Movie Dashboard</h2>
            </div>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Movies</h3>
                    <div className="stat-number">{stats.totalMovies}</div>
                </div>
                
                <div className="stat-card">
                    <h3>Watchlist Count</h3>
                    <div className="stat-number">{stats.watchlistCount}</div>
                </div>
                
                <div className="stat-card">
                    <h3>Average Rating</h3>
                    <div className="stat-number">{stats.averageRating}</div>
                </div>
                
                <div className="stat-card">
                    <h3>Top Genres</h3>
                    <div className="genre-list">
                        {topGenres.map(([genre, count]) => (
                            <div key={genre} className="genre-item">
                                {genre}: {count}
                            </div>
                        ))}
                        {topGenres.length === 0 && (
                            <div className="genre-item">No movies in watchlist</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="recommendations">
                <h3>Recommended Movies</h3>
                <div className="recommendation-list">
                    {movies
                        .filter(movie => !watchlist.includes(movie.id))
                        .filter(movie => movie.rating >= 8)
                        .slice(0, 3)
                        .map(movie => (
                            <div key={movie.id} className="recommendation-item">
                                <img src={`images/${movie.image}`} alt={movie.title} />
                                <div>
                                    <h4>{movie.title}</h4>
                                    <p>Rating: {movie.rating}</p>
                                    <p>Genre: {movie.genre}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
