
import pic from '../assets/dunepost.jpg'
import { useNavigate } from 'react-router-dom';
// PICTURE PREFIX : https://image.tmdb.org/t/p/original/

/* EXAMPLE : 
{
  "_id": {
    "$oid": "67e35d845ce03ab766afece4"
  },
  "title": "Inception",
  "vote_average": 8.364,
  "release_date": {
    "$date": "2010-07-15T00:00:00.000Z"
  },
  "runtime": 148,
  "adult": false,
  "backdrop_path": "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
  "homepage": "https://www.warnerbros.com/movies/inception",
  "overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
  "popularity": 83.952,
  "poster_path": "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  "tagline": "Your mind is the scene of the crime.",
  "genres": "Action, Science Fiction, Adventure",
  "production_companies": "Legendary Pictures, Syncopy, Warner Bros. Pictures",
  "spoken_languages": "English, French, Japanese, Swahili"
}
*/

function FilmCard({film = []}){
    if (!film) return null;

    const navigate = useNavigate();

    const toPage = () => {
      const type = film.media_type; // fallback if you don't have 'media_type'
      if (type === "film") {
        navigate(`/films/${film.id}`);
      } else if (type === "serie") {
        navigate(`/series/${film.id}`);
      }
    };
    
    return (
        <div className="flex-none rotate-y-2 rotate-x-2 hover:rotate-y-0 hover:rotate-x-0 relative justify-center bg-stone-800/100 h-80 w-60 rounded-2xl overflow-hidden border-t-[3px] shadow-2xl hover:w-150 transition-all opacity-50 hover:opacity-100 duration-300">
            <p className='absolute w-20 h-1/10 left-0 top-0 z-4 text-xl bg-amber-300/80 p-1 rounded-br-xl font-bold'>{`★ ${film.vote_average.toFixed(1)}`}</p>
            <p className='absolute w-20 h-1/10 right-0 top-0 z-4 text-md bg-emerald-500/50 p-1 rounded-bl-xl font-bold'>{`░ ${film.media_type.toUpperCase()}`}</p>
            <div className='absolute bg-linear-to-b from-0% from-stone-900 to-20% h-full w-60 z-2'/>
            <img className='absolute left-0 flex duration-300 w-60 h-full object-cover rounded-xl saturate-80 hover:saturate-100 z-1' src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} alt="10"/>
            <img className='absolute left-0 flex duration-300 w-full h-full z-0 object-cover blur-[1px] opacity-30 ' src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`} alt="10"/>
            <p className='absolute left-60 p-1 font-bold text-2xl text-center w-90 h-2/10 whitespace-normal bg-linear-to-b from-stone-900 to-transparent'>{film.title} {film.name}</p>
            <p className='absolute w-90 px-2 text-left opacity-80 whitespace-normal h-1/10 left-60 top-2/10 text-xs'> ➤ {film.overview}</p>
            <button onClick={toPage} 
            className="absolute left-44 bottom-12 rounded-xl bg-stone-800/80 hover:text-xl w-12 h-12 text-white hover:bg-white/100 transition-all hover:cursor-pointer hover:text-stone-700 z-4">
              ►
            </button>
            <button className="absolute left-5 bottom-12 rounded-xl bg-stone-800/80 hover:text-xl w-12 h-12 text-redz-500 hover:bg-white/100 transition-all hover:cursor-pointer hover:text-redz-500 z-4">❤︎</button>
        </div>
    ) 
}

export default FilmCard