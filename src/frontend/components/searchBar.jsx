import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({css=""}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Search when query changes (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() !== '') {
        performSearch();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const performSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/search?language=en-US&query=${query}&page=1&include_adult=false`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  const handleResultClick = (result) => {
    const route = result.media_type === 'movie' 
      ? `/films/${result.id}` 
      : `/series/${result.id}/1/1`;
    navigate(route);
    clearSearch();
  };

  return (
    <div className={`absolute w-full transition-all backdrop-blur-sm duration-500 mx-auto ${css}`} ref={searchRef}>
      <div className="relative flex items-center">
        <MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-stone-100 z-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Chercher les Films ou Series que tu veux..."
          className="w-full h-12 pl-10 pr-10 py-2 rounded-md focus:outline-none focus:ring-0 focus:border-transparent bg-stone-950/50"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Dropdown results */}
      {isFocused && (query || results.length > 0) && (
        <div className="absolute z-50 mt-2 w-full bg-stone-950/50 rounded-lg shadow-lg overflow-hidden backdrop-blur-sm">
          {isLoading ? (
            <div className="p-4 text-center text-stone-500 dark:text-stone-400">
              Loading...
            </div>
          ) : results.length > 0 ? (
            <ul className="divide-y divide-stone-200 dark:divide-stone-700 max-h-96 overflow-y-auto">
              {results.map((result) => (
                <li
                  key={`${result.media_type}-${result.id}`}
                  className="hover:bg-stone-100 dark:hover:bg-stone-700/50 cursor-pointer transition-colors"
                  onClick={() => handleResultClick(result)}
                >
                    
                  <div className="flex items-center p-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden bg-stone-200 dark:bg-stone-600">
                      {result.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                          alt={result.title || result.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-stone-400">
                          <PhotoIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium min-w-200 text-left text-stone-900 dark:text-white">
                        {result.title || result.name}
                      </p>
                      <p className="text-sm text-stone-500 text-left dark:text-stone-400 capitalize">
                        {result.media_type} • {result.release_date?.substring(0, 4) || result.first_air_date?.substring(0, 4)}
                      </p>
                      
                    </div>
                    {/*<button className='relative ml-10 size-10 hover:text-stone-950 cursor-pointer rounded-lg bg-pink-500'>❤</button>*/}
                  </div>
                </li>
              ))}
            </ul>
          ) : query && !isLoading ? (
            <div className="p-4 text-center text-stone-500 dark:text-stone-400">
              Aucune resultats pour "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}