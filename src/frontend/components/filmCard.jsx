
import pic from '../assets/dunepost.jpg'
import { useNavigate } from 'react-router-dom';
import { addFavorite, isFavorite, removeFavorite } from '../api_services/favorite.service'
import { useContext, useEffect, useState } from 'react';
import { useStore} from '../utils/store.js';
import { AuthContext } from '../context/AuthContext.jsx'; 


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

  const [ sauve, setSauve ] = useState(false);
  const { user, isLoading } = useContext(AuthContext);

  const fireSig = useStore(state => state.fireSig);

  const get_isFav = async (movie_id, mediaType) => {
    try {
      const is_fave = await isFavorite(user?.id, film?.id, film?.media_type);
      setSauve(is_fave)
      } catch (err) {
        console.log("err get fav : ", err);
      }
    }
    
  const favor = async () => {
    try {
        if (!sauve) {
          setSauve(true)
          await addFavorite(user.id, film?.id, film?.media_type);
          console.log("added!");
          fireSig();
        }
        } catch(err) {
          console.log(" err add favor : ", err);
        }
      }
        
  const defavor = async () => {
            try {
                if (sauve){
                    setSauve(false)
                    await removeFavorite(user.id, film?.id, film?.media_type);
                    console.log("removed!");
                    fireSig();
                }
            } catch(err) {
                console.log("error defavor", err);
            }
        }

    if (!film) return null;

    const navigate = useNavigate();

    const toPage = () => {
      const type = film.media_type; // fallback if you don't have 'media_type'
      if (type === "film") {
        navigate(`/films/${film.id}`);
      } else if (type === "serie") {
        navigate(`/series/${film.id}/1/1`);
      }
    };

    useEffect(() => {
      if (!user) {
        console.log("no user");
      } else {
        get_isFav();
      }
    }, [user])
    
    return (
        <div className="flex-none relative justify-center bg-stone-800/100 lg:h-85 lg:w-60 w-30 h-50 rounded-lg overflow-hidden shadow-lg lg:hover:h-90 lg:hover:w-150 hover:w-120 hover:h-60 transition-all opacity-80 saturate-50 hover:opacity-100 hover:saturate-100 duration-300">
            <p className={`absolute w-14 p-0.5 lg:h-10 h-5 left-2 top-2 z-4 ${ (film.vote_average > 8) ? "bg-emerald-500/90" : "bg-amber-300/70"} lg:text-sm text-[10px] leading-tight rounded-md uppercase font-normal`}>{`★ ${film.vote_average.toFixed(1)}`}<br/>{`${(film.vote_average > 8)? "top" : "bien"}`}</p>
            <p className='absolute w-20 px-2 pt-0.5 h-10 left-38 top-2 z-4 text-sm bg-stone-950/50 rounded-md leading-tight font-normal'>{`▧ ${film.media_type.toUpperCase()}`}<br/>DRAME</p>
            <div className='absolute to-20% h-full w-60 z-2'/>
            <img loading="lazy" className='absolute left-0 flex duration-300 w-60 h-full object-cover saturate-80 hover:saturate-100 mask-fade-right z-1 cursor-pointer' src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} alt="10"/>
            <img loading="lazy" className='absolute left-0 flex duration-300 w-full h-full z-0 object-cover opacity-60 ' src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`} alt="10"/>
            <p className='absolute left-62.5 top-2 p-1.5 font-normal uppercase text-xl text-center w-85 h-10 whitespace-normal rounded-lg backdrop-blur-sm bg-stone-950/50'>{film.title} {film.name}</p>
            <p className='absolute w-90 px-2 text-left opacity-80 whitespace-normal h-1/10 left-60 top-2/10 text-xs'> ➤ {film.overview}</p>
            <div className='absolute left-60 bottom-0 gap-5 w-90 h-12 inline-flex'>
                <button onClick={toPage} 
                  className="relative bottom-3 shadow-md rounded-lg ml-5 backdrop-blur-sm bg-stone-950/50 w-65 h-10 text-white hover:bg-white/100 transition-all cursor-pointer hover:text-stone-700 z-4">
                    ►
                </button>
                <button 
                  onClick={() => {(!sauve) ? favor() : defavor()}} 
                  className={`${sauve ? "bg-pink-600/50" : "bg-pink-500"} relative bottom-3 lg:w-10 w-6 backdrop-blur-lg lg:h-10 h-6 lg:rounded-lg rounded-sm cursor-pointer text-stone-100 lg:text-md text-xs p-1 font-bold hover:bg-pink-500 active:bottom-2 hover:text-stone-800 transition-all`}
                >
                  {sauve ? "✖" : "❤"}
                </button>
            </div>
        </div>
    ) 
}

export default FilmCard