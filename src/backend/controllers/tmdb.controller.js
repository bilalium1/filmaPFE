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
      include_adult: false,
      without_genres: '10749',
      without_genres: '18',
      
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
      page: req.query.page || 1,
      include_adult: false,
      without_genres: '10749',
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
      page: req.query.page || 1,
      include_adult: false,
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

// Discover Endpoints
export const discoverMovies = async (req, res) => {
  try {
    const data = await makeTmdbRequest('/discover/movie', {
      page: req.query.page || 1,
      sort_by: req.query.sort_by || 'popularity.desc',
      include_adult: req.query.include_adult || false,
      include_video: req.query.include_video || false,
      with_genres: req.query.with_genres,
      year: req.query.year,
      'vote_average.gte': req.query['vote_average.gte'],
      'vote_count.gte': req.query['vote_count.gte'],
      with_watch_providers: req.query.with_watch_providers,
      watch_region: req.query.watch_region,
      with_original_language: req.query.with_original_language,
      ...req.query
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to discover movies' });
  }
};

export const discoverTVShows = async (req, res) => {
  try {
    const data = await makeTmdbRequest('/discover/tv', {
      page: req.query.page || 1,
      sort_by: req.query.sort_by || 'popularity.desc',
      include_adult: req.query.include_adult || false,
      with_genres: req.query.with_genres,
      first_air_date_year: req.query.first_air_date_year,
      'vote_average.gte': req.query['vote_average.gte'],
      'vote_count.gte': req.query['vote_count.gte'],
      with_watch_providers: req.query.with_watch_providers,
      watch_region: req.query.watch_region,
      with_original_language: req.query.with_original_language,
      with_status: req.query.with_status,
      with_type: req.query.with_type,
      ...req.query
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to discover TV shows' });
  }
};