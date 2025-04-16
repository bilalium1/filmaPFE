import express from 'express';
import {
  getPopularMovies,
  getMovieDetails,
  getPopularShows,
  getShowDetails,
  getShowWithSeasons,
  getSeasonEpisodes,
  searchMulti,
  getMovieGenres,
  getTVGenres,
} from '../controllers/tmdb.controller.js';

const router = express.Router();

// Movie routes
router.get('/movies/popular', getPopularMovies);
router.get('/movies/:id', getMovieDetails);

// TV Show routes
router.get('/tv/popular', getPopularShows);
router.get('/tv/:id', getShowDetails);
router.get('/tv/:id/with-seasons', getShowWithSeasons);
router.get('/tv/:id/season/:season_number', getSeasonEpisodes);

// Search route
router.get('/search', searchMulti);

// Genre routes
router.get('/genres/movies', getMovieGenres);
router.get('/genres/tv', getTVGenres);

export default router;
