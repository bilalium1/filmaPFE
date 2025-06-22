import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';

export default function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef();
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const res = await axios.get('/api/movies/popular', {
        params: { page },
      });
      const newMovies = res.data.results;
      setMovies((prev) => [...prev, ...newMovies]);
      if (res.data.page >= res.data.total_pages) setHasMore(false);
    } catch (err) {
      console.error('Failed to fetch movies', err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    });

    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);

  return (
    <div className="min-h-screen text-rose-200 mt-20 p-4">
        <NavBar/>
      <h1 className="text-4xl font-bold mb-8 text-center text-rose-400">Films populaires</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/films/${movie.id}`)}
            className="cursor-pointer bg-rose-900/50 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform border border-rose-700"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold text-rose-300">{movie.title}</h2>
              <p className="text-sm text-emerald-300">{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div ref={loader} className="w-full text-center py-6 text-emerald-400">
          Loading more...
        </div>
      )}
      {!hasMore && (
        <p className="text-center py-6 text-rose-500">You’ve reached the end 🎬</p>
      )}
    </div>
  );
}
