import axios from 'axios';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Helper function for TMDB requests
const makeTmdbRequest = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        ...params
      }
    });
    return response.data;
  } catch (error) {
    console.error(`TMDB API Error (${endpoint}):`, error.message);
    throw error;
  }
};

// Movie Endpoints
export const getPopularMovies = async (req, res) => {
  try {
    const data = await makeTmdbRequest('/movie/popular', {
      page: req.query.page || 1,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch popular movies' });
  }
};

export const getMovieDetails = async (req, res) => {
  try {
    const data = await makeTmdbRequest(`/movie/${req.params.id}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
};

// TV Show Endpoints
export const getPopularShows = async (req, res) => {
  try {
    const data = await makeTmdbRequest('/tv/popular', {
      page: req.query.page || 1
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch popular shows' });
  }
};

export const getShowDetails = async (req, res) => {
  try {
    const data = await makeTmdbRequest(`/tv/${req.params.id}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch show details' });
  }
};

export const getShowWithSeasons = async (req, res) => {
  try {
    const data = await makeTmdbRequest(`/tv/${req.params.id}`, {
      append_to_response: 'seasons'
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch show with seasons' });
  }
};

export const getSeasonEpisodes = async (req, res) => {
  try {
    const data = await makeTmdbRequest(
      `/tv/${req.params.id}/season/${req.params.season_number}`
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch season episodes' });
  }
};

// Search Endpoint
export const searchMulti = async (req, res) => {
  try {
    const data = await makeTmdbRequest('/search/multi', {
      query: req.query.query,
      page: req.query.page || 1
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
};

// Genres Endpoint
export const getMovieGenres = async (req, res) => {
  try {
    const data = await makeTmdbRequest('/genre/movie/list');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie genres' });
  }
};

export const getTVGenres = async (req, res) => {
  try {
    const data = await makeTmdbRequest('/genre/tv/list');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch TV genres' });
  }
};