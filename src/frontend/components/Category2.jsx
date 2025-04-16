import FilmCard from "./filmCard.jsx";
import { useEffect, useState, useCallback, useRef } from "react";

function Category({ title, studio }) {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 100;  // Set limit to 100 as per your requirement
  const page = useRef(1); // Track current page with a ref
  const containerRef = useRef(null);
  const seenFilmIds = useRef(new Set());  // To avoid duplicate films

  // Scroll handlers
  function scrollRight() {
    containerRef.current?.scrollBy({
      left: 1000,
      behavior: 'smooth'
    });
  }

  function scrollLeft() {
    containerRef.current?.scrollBy({
      left: -1000,
      behavior: 'smooth'
    });
  }

  // Fetch films logic
  const fetchFilms = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/films?page=${page.current}&limit=${limit}`);
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false); // No more films
      } else {
        const newFilms = data.filter(film => !seenFilmIds.current.has(film.id));

        if (newFilms.length > 0) {
          newFilms.forEach(film => seenFilmIds.current.add(film.id)); // Add to the set
          setFilms(prevFilms => [...prevFilms, ...newFilms]);
        }

        // If we receive fewer films than requested, we're at the end
        if (data.length < limit) setHasMore(false);
      }
    } catch (err) {
      console.error("Fetching error: ", err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  // Fetch the first chunk of films immediately on mount
  useEffect(() => {
    setFilms([]);
    seenFilmIds.current = new Set(); // Reset seen films
    page.current = 1;  // Reset page count
    setHasMore(true);
    fetchFilms();  // Load first batch immediately
  }, [title, studio, fetchFilms]); // Trigger this effect when category/studio changes

  // Set interval to fetch films every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchFilms();
    }, 5000);
    
    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [fetchFilms]);  // Run fetchFilms every 5 seconds after the first batch

  // Infinite scroll logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollLeft + container.clientWidth >= container.scrollWidth - 200 &&
        !loading && 
        hasMore
      ) {
        page.current += 1;  // Increment page when nearing end
        fetchFilms();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);  // Cleanup scroll event
  }, [loading, hasMore, fetchFilms]);

  // Filter films based on category
  let filteredFilms = films;
  if (studio) {
    filteredFilms = films.filter(film => film.production_companies?.includes(studio));
  } else if (title) {
    filteredFilms = films.filter(film => film.genres?.includes(title));
  }

  return (
    <div className="relative bg-stone-950/50 w-19/20 mx-auto my-10 h-100 rounded-xl">
      <p className="text-center w-9/10 mx-auto h-10 text-3xl border-b-1 font-black">{title}</p>
      <div 
        ref={containerRef} 
        id={`films-${title}`} 
        className="inline-flex gap-5 w-39/40 h-90 my-3 mx-auto overflow-x-auto scroll-none whitespace-nowrap scroll-smooth"
      >
        <button 
          onClick={scrollRight} 
          className="opacity-5 hover:opacity-100 absolute w-15 h-15 bg-stone-700/50 rounded-xl z-3 right-10 bottom-1/2 inset-y-1/2 cursor-pointer hover:bg-stone-700"
        >
          ➤
        </button>
        <button 
          onClick={scrollLeft} 
          className="opacity-5 hover:opacity-100 absolute w-15 h-15 bg-stone-700/50 rounded-xl z-3 left-10 bottom-1/2 inset-y-1/2 cursor-pointer hover:bg-stone-700 rotate-180"
        >
          ➤
        </button> 
        {medias.map(film => (
          <FilmCard key={film.id} film={film} />
        ))}
        {loading && (
          <div className="flex items-center justify-center min-w-[200px] h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
