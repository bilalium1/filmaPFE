// src/pages/FilmPage.js
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/navbar.jsx';
import axios from 'axios';
import { addFavorite, isFavorite, removeFavorite } from '../api_services/favorite.service'
import CommentSection from '../components/Commentaire.jsx';
import Reviews from '../components/Rating.jsx';
import Stream from '../components/MovieStream.jsx';
import { useStore } from '../utils/store.js'
import { AuthContext } from '../context/AuthContext.jsx';

const movieGenres = {
  28: "Action",
  12: "Aventure",
  16: "Animation",
  35: "Comédie",
  80: "Crime",
  99: "Documentaire",
  18: "Drame",
  10751: "Famille",
  14: "Fantastique",
  36: "Histoire",
  27: "Horreur",
  10402: "Musique",
  9648: "Mystère",
  10749: "Romance",
  878: "Science-fiction",
  10770: "Téléfilm",
  53: "Thriller",
  10752: "Guerre",
  37: "Western"
};

const servers = [ 'UN', 'DEUX', 'TROIS', 'QUATRE', 'CINQUE']

const FilmPage = () => {
  const { id:film_id } = useParams();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [srvr, setSrvr] = useState(0);
  const [sauve, setSauve] = useState(false);

  console.log(film_id);

  const { user, isLoading } = useContext(AuthContext);

  const fireSig = useStore(state => state.fireSig);
  
  useEffect(() => {
    const fetchFilm = async () => {
      try {
        // First try to get basic movie details
        const response = await axios.get(`/api/movies/${film_id}`);
        
        setFilm({
          ...response.data,
        });
      } catch (err) {
        setError(err.response?.data?.status_message || err.message);
        console.error('Error fetching film:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [film_id, user]); 

  const get_isFav = async () => {
    try {
      const is_fave = await isFavorite(user.id, film?.id, "film");
      setSauve(is_fave)
      } catch (err) {
        console.log("err get fav : ", err);
      }
    }
    
  const favor = async () => {
    try {
        if (!sauve) {
          setSauve(true)
          await addFavorite(user.id, film?.id, "film");
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
                    await removeFavorite(user.id, film?.id, "film");
                    console.log("removed!");
                    fireSig();
                }
            } catch(err) {
                console.log("error defavor", err);
            }
  }

  useEffect(() => {
    get_isFav();
  }, [favor, defavor, srvr, film, loading])

  console.log(film)

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!film) return <div>Film not found</div>;

   const buttoncss="px-4 mx-1 my-auto h-12 rounded-lg text-stone-100 font-light tracking-wider hover:text-stone-950 transition-all b ease-out hover:px-6 hover:text-lg hover:backdrop-brightness-400 hover:font-black cursor-pointer"

  return (
    <div className="flex h-[4000px] w-full">
        <NavBar/>
        <div className='relative mx-auto mt-20 h-500 w-9/10 bg-linear-to-b from-cyan-900/20 to-75% rounded-lg overflow-hidden'>
            <h3 className='w-full h-20 text-4xl font-bold tracking-widest z-2 text-center uppercase p-5'>{film.title}</h3>

            <div className='relative inline-flex w-full h-120'>

              <img src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} className='relative lg:h-120 h-50 lg:w-80 w-30 mx-auto rounded-lg shadow-2xl opacity-80 hover:mt-2 hover:saturate-120 transition-all'/>
              <div className='relative w-6/10 h-120 mx-auto rounded-lg shadow-2xl bg-stone-950/50 backdrop-blur-xl hover:mt-2 transition-all'>
                <p className='px-5 pt-5 text-2xl text-center font-bold'>{film.tagline}</p>
                <p className='mb-5 px-5 pt-5 text-xs text-left font-bold'>{film.overview}</p>
                <div className='w-full h-12'>
                  {film.genres?.map((gen) => (
                      <span key={gen.id} className="px-5 py-2 text-sm bg-stone-950/50 backdrop-blur-sm rounded-lg mx-2 text-sm font-bold">
                      {gen.name}
                      </span>
                  ))}
                </div>

                <div className="w-full fixed bottom-15 h-auto grid grid-rows-3 place-items-center gap-2">
                  {film.production_companies?.slice(0, 3).map((comp) => (
                    <img
                      key={comp.id}
                      className="max-h-12 max-w-30 invert"
                      src={`https://image.tmdb.org/t/p/original/${comp.logo_path}`}
                      alt={comp.name}
                      />
                    ))}
                </div>

                <a className='fixed right-5 top-5 w-10 h-10 bg-stone-950/50 rounded-lg font-bold uppercase text-emerald-500 text-2xl p-1' href={`${film.homepage}`}> 🌐 </a>

                <p className='absolute tracking-widest right-5 bottom-5 font-bold'>{film.release_date}</p>

                <button 
                  onClick={() => {(!sauve) ? favor() : defavor()}} 
                  className={`${sauve ? "bg-pink-600/50" : "bg-pink-500"} absolute bottom-5 left-5 lg:w-10 w-6 backdrop-blur-lg lg:h-10 h-6 lg:rounded-lg rounded-sm cursor-pointer text-stone-100 lg:text-md text-xs p-1 font-bold hover:bg-pink-500 active:bottom-2 hover:text-stone-800 transition-all`}
                >
                  {sauve ? "✖" : "❤"}
                </button>
              </div>

            </div>
            <p className='absolute w-20 h-10 rounded-lg left-10 text-2xl font-bold p-1 top-5 bg-amber-300/50 backdrop-blur-sm z-3'>{`★ ${film.vote_average.toFixed(1)}`}</p>
            
            <img src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`} className='absolute top-0 w-full h-150 object-cover opacity-80 -z-1 mask-fade-bottom'/>
            <img src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} className='absolute top-150 w-full h-full object-cover opacity-20 blur-sm -z-1 mask-fade-top'/>
        </div>
        

        <div className='absolute h-full w-29/30 top-180 left-1/2 -translate-x-1/2'>
          <Stream videoID={film.id} server={srvr}/>

          {servers.map((server, index) => (
            <button
              key={index}
              onClick={() => setSrvr(index)}  // index is a number
              className={`mt-5 hover:bg-white px-5 hover:px-10 active:border-0 active:bg-cyan-800  ${buttoncss}`}
            >
              {server}
            </button>
          ))}

          {/*<CommentSection film_id={film.id} media_type={"film"}/>*/}
          <Reviews film_id={film.id} media_type={"film"}/>

        </div>
    </div>
  );
};

export default FilmPage;