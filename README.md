
# MovieDux

[![Deploy to GitHub Pages](https://github.com/BharathiThanikonda/moviedux-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/BharathiThanikonda/moviedux-app/actions/workflows/deploy.yml)

Live demo: https://bharathithanikonda.github.io/moviedux-app/#/

MovieDux is a modern React app for browsing movies, managing a personal watchlist, and exploring movie details. Users can add or remove movies from their watchlist, sort and filter selections, and view detailed information in a clean, responsive interface.

## Features
- Browse a collection of movies
- Add or remove movies from your watchlist
- Sort and filter your watchlist
- View detailed information about each movie
- Responsive and user-friendly design

## Getting Started

1. **Clone the repository:**
	```sh
	git clone https://github.com/BharathiThanikonda/moviedux-app.git
	cd moviedux
	```
2. **Install dependencies:**
	```sh
	npm install
	```
3. **Start the development server:**
	```sh
	npm start
	```
4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Deployment

- This project auto-deploys to GitHub Pages on each push to `main` using GitHub Actions.
- Workflow: `.github/workflows/deploy.yml`
- Live URL: https://bharathithanikonda.github.io/moviedux-app/#/

Manual deploy (optional):
```sh
npm run deploy
```

## Folder Structure
- `src/` - React components and styles
- `public/` - Static assets and movie data

## License
[MIT](LICENSE)
