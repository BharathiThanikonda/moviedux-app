import './App.css';
import './styles.css';
import Header from './components/Header';
import Footer from './components/footer';
import MoviesGrid from './components/MoviesGrid';
import WatchList from './components/Watchist';
import Dashboard from './components/Dashboard';
import { BrowserRouter  as Router, Routes,Route,Link} from 'react-router-dom';
import {useEffect,useState} from "react";



function App() {
  const [movies,setMovies] = useState([]);
  const [watchlist,setWatchlist] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  
  // Load watchlist from localStorage on app start
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('moviedux-watchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
    
    const savedTheme = localStorage.getItem('moviedux-theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);
  
  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('moviedux-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);
  
  // Save theme preference
  useEffect(() => {
    localStorage.setItem('moviedux-theme', darkMode ? 'dark' : 'light');
    document.body.className = darkMode ? 'dark-theme' : 'light-theme';
  }, [darkMode]);
  
  useEffect(() => {
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);
  
  const toggleWatchlist = (movieId) => {
    setWatchlist(prev => prev.includes(movieId) ? prev.filter(id => id !== movieId) : [...prev, movieId]);
  };
  
  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };
  return (
    <div className="App">
      <div className = "container">
        <Header toggleTheme={toggleTheme} darkMode={darkMode} />
        <Router>
          <nav>
           <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/watchlist">Watchlist</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
           </ul>
          </nav>
          <Routes>
            <Route path="/" element={<MoviesGrid movies= {movies} watchlist={watchlist} toggleWatchlist={toggleWatchlist}/>} />
            <Route path="/watchlist" element={<WatchList movies= {movies} watchlist={watchlist} toggleWatchlist={toggleWatchlist} />} />
            <Route path="/dashboard" element={<Dashboard movies= {movies} watchlist={watchlist} />} />
          </Routes>
        </Router>
        
      </div>
      <Footer />
    </div>
  );
}

export default App;
