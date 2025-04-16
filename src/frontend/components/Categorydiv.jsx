import FilmCard from "./filmCard.jsx";
import { useEffect, useState } from "react";
import axios from 'axios'

function Category({ title, genre ,studio, medias = [] , onScrollEnd}) {
  const [loading, setLoading] = useState(true)
  
  function scroll(direction) {
    const container = document.getElementById("films-" + title);
    if (container) {
      if (direction == 'right') { onScrollEnd(); }
      container.scrollBy({
        left: direction === 'right' ? 1000 : -1000,
        behavior: 'smooth'
      });
    }
  }

  useEffect(() => {
    if (!medias){
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [medias])

  let filterMedia;

  if (genre==0) {
    filterMedia = medias
      .filter(media => media.vote_average > 6)
      .filter(media => media.adult === false)
      .filter(media => media.original_language === "en")
      .filter(media => !media.genre_ids?.includes(10751))
      .filter(media => !media.genre_ids?.includes(10762))
      .filter(media => !media.genre_ids?.includes(10763))
      .filter(media => !media.genre_ids?.includes(10764))
      .filter(media => !media.genre_ids?.includes(10766))
      .filter(media => !media.genre_ids?.includes(10767))
      .filter(media => !media.genre_ids?.includes(10768))
      .filter(media => !media.genre_ids?.includes(10749))
      .filter(media => !media.genre_ids.includes(35))
      .filter(media => !media.genre_ids.includes(99))
  } else {
    filterMedia = medias
    .filter(media => media.genre_ids?.includes(genre)) // Action gesnre ID
    .filter(media => media.vote_average > 6.5)
    .filter(media => media.adult === false);
  }
 
  // Filter films based on your criteria

  return (
    <div className="relative bg-linear-to-b from-stone-900/40 to-25% w-19/20 mx-auto my-10 h-100 rounded-xl border-t-2">
      <p className="text-left w-full pl-4 pt-4 mx-auto h-10 text-3xl font-extralight tracking-wider uppercase">{title}</p>
      <div
        id={`films-${title}`}
        className="inline-flex gap-5 w-39/40 h-90 my-3 mx-auto overflow-x-auto scroll-none whitespace-nowrap scroll-smooth"
      >
        <button
          onClick={() => scroll('right')}
          className="absolute size-10 border-l-4 active:border-l-0 bg-stone-700/20 rounded-xl z-3 right-10 bottom-0 cursor-pointer hover:bg-stone-700 active:rotate-10 transition-all"
        >
          ➤
        </button>
        <button
          onClick={() => scroll('left')}
          className="absolute size-10 border-l-4 active:border-l-0 bg-stone-700/20 rounded-xl z-3 left-10 bottom-0 cursor-pointer hover:bg-stone-700 active:rotate-170 rotate-180 transition-all"
        >
          ➤
        </button>

        {filterMedia.map(media => {
          return <FilmCard key={media.id} film={media} />;
        })}
      </div>
    </div>
  );
}

export default Category;
