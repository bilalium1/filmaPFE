// TVShows.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TVShows() {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef();
  const navigate = useNavigate();

  const fetchTVShows = async () => {
    try {
      const res = await axios.get('/api/tv/popular', {
        params: { page },
      });
      const newShows = res.data.results.filter((show) => !show.adult); // just in case
      setShows((prev) => [...prev, ...newShows]);
      if (res.data.page >= res.data.total_pages) setHasMore(false);
    } catch (err) {
      console.error('Failed to fetch TV shows', err);
    }
  };

  useEffect(() => {
    fetchTVShows();
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
    <div className="min-h-screen bg-gray-900 text-rose-200 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-rose-400">Popular TV Shows</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {shows.map((show) => (
          <div
            key={show.id}
            onClick={() => navigate(`/series/${show.id}/1/1`)}
            className="cursor-pointer bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform border border-emerald-700"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold text-emerald-300">{show.name}</h2>
              <p className="text-sm text-rose-300">{show.first_air_date}</p>
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
        <p className="text-center py-6 text-rose-500">That’s all folks 📺</p>
      )}
    </div>
  );
}
