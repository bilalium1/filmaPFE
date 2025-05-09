// src/pages/FilmPage.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/navbar.jsx';
import axios from 'axios';
import Stream from '../components/MovieStream.jsx';
import { useStore } from '../utils/store.js'

const servers = [ 'UN', 'DEUX', 'TROIS', 'QUATRE']

const FilmPage = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [srvr, setSrvr] = useState(0);
  const [sauve, setSauve] = useState(false);

  const fireSig = useStore(state => state.fireSig);
  
  useEffect(() => {
    const fetchFilm = async () => {
      try {
        // First try to get basic movie details
        const response = await axios.get(`/api/movies/${id}`);
        
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
  }, [id]);

  const get_isFav = async () => {
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

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!film) return <div>Film not found</div>;

   const buttoncss="px-4 mx-1 my-auto h-12 rounded-lg text-stone-100 font-light tracking-wider hover:text-stone-950 transition-all b ease-out hover:px-6 hover:text-lg hover:backdrop-brightness-400 hover:font-black cursor-pointer"

  return (
    <div className="flex h-full w-full">
        <NavBar/>
        <div className='relative mx-auto mt-20 h-500 w-9/10 bg-linear-to-b from-cyan-900/20 to-75% rounded-lg overflow-hidden'>
            <h3 className='w-full h-20 text-4xl font-extralight z-2 text-center uppercase p-5'>{film.title}</h3>

            <div className='relative inline-flex w-full h-120'>

              <img src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} className='relative lg:h-120 h-50 lg:w-80 w-30 mx-auto rounded-lg shadow-2xl opacity-80 hover:mt-2 hover:saturate-120 transition-all'/>
              <div className='relative w-6/10 h-120 mx-auto rounded-lg shadow-2xl bg-stone-950/50 hover:mt-2 transition-all'>
                <p className='text-left px-5 pt-5 text-sm font-bold'>➤ {film.overview}</p>
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
        </div>
    </div>
  );
};

export default FilmPage;