
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/navbar.jsx';
import axios from 'axios';
import TvStream from '../components/TvStream.jsx';
import { addFavorite, isFavorite, removeFavorite } from '../api_services/favorite.service.js';
import DropMenu from '../components/dropMenu.jsx';
import Reviews from '../components/Rating.jsx';
import CommentSection from '../components/Commentaire.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const servers = [ 'UN', 'DEUX', 'TROIS', 'QUATRE', 'CINQUE']

const tvGenres = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western"
};


const TvPage = () => {
  const { id, season, episode } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [srvr, setSrvr] = useState(0);
  const [sauve, setSauve] = useState(false);
  const [cour, setCour] = useState(false);
  const { user } = useContext(AuthContext);


  useEffect(() => {
    const fetchShow = async () => {
      try {
        // First try to get basic movie details
        const response = await axios.get(`/api/tv/${id}`);
        
        setShow({
          ...response.data,
        });
      } catch (err) {
        console.error('Error fetching show:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [id]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (!show) return <div>Show not found</div>;

  const seasons = {};
  const eps = {};
  show.seasons.forEach((_, index) => {
    const seasonNumber = index + 1;
    seasons[`Season ${seasonNumber}`] = `/series/${show.id}/${seasonNumber}/1`;


  let ep = 0; // Global counter for all episodes

  for (ep=0; ep< show.seasons[season-1].episode_count;ep++){
    eps[`Episode ${ep+1}`] = `/series/${show.id}/${season}/${ep+1}`
  }

});

  const get_isFav = async () => {
      try {
        const is_fave = await isFavorite(user.id, show?.id, "serie");
        setSauve(is_fave)
        } catch (err) {
          console.log("err get fav : ", err);
        }
      }
      
    const favor = async () => {
      try {
          if (!sauve) {
            setSauve(true)
            await addFavorite(user?.id, show?.id, "serie");
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
                      await removeFavorite(user.id, show?.id, "serie");
                      console.log("removed!");
                      fireSig();
                  }
              } catch(err) {
                  console.log("error defavor", err);
              }
  }

  const buttoncss="px-4 mx-1 my-auto h-12 rounded-md text-stone-100 font-light tracking-wider hover:text-stone-950 transition-all b ease-out hover:px-6 hover:text-lg hover:backdrop-brightness-400 hover:font-black cursor-pointer"

  return (
    <div className="flex h-full w-full">
        <NavBar/>
        <div className='relative mx-auto mt-20 h-500 w-9/10 bg-linear-to-b from-cyan-900/20 to-75% rounded-lg overflow-hidden'>
            <h3 className='w-full h-20 text-4xl font-bold tracking-widest z-2 text-center uppercase p-5'>{show.title}</h3>

            <div className='relative inline-flex w-full h-120'>

              <img src={`https://image.tmdb.org/t/p/original/${show.poster_path}`} className='relative lg:h-120 h-50 lg:w-80 w-30 mx-auto rounded-lg shadow-2xl opacity-80 hover:mt-2 hover:saturate-120 transition-all'/>
              <div className='relative w-6/10 h-120 mx-auto rounded-lg shadow-2xl bg-stone-950/50 backdrop-blur-xl hover:mt-2 transition-all'>
                <p className='px-5 pt-5 text-2xl text-center font-bold'>{show.tagline}</p>
                <p className='mb-5 px-5 pt-5 text-xs text-left font-bold'>{show.overview}</p>
                <div className='w-full h-12'>
                  {show.genres?.map((gen) => (
                      <span key={gen.id} className="px-5 py-2 text-sm bg-stone-950/50 backdrop-blur-sm rounded-lg mx-2 text-sm font-bold">
                      {gen.name}
                      </span>
                  ))}
                </div>

                <div className="w-full fixed bottom-15 h-auto grid grid-rows-3 place-items-center gap-2">
                  {show.production_companies?.slice(0, 3).map((comp) => (
                    <img
                      key={comp.id}
                      className="max-h-12 max-w-30 invert"
                      src={`https://image.tmdb.org/t/p/original/${comp.logo_path}`}
                      alt={comp.name}
                      />
                    ))}
                </div>

                <a className='fixed right-5 top-5 w-10 h-10 bg-stone-950/50 rounded-lg font-bold uppercase text-emerald-500 text-2xl p-1' href={`${show.homepage}`}> 🌐 </a>

                <p className='absolute tracking-widest right-5 bottom-5 font-bold'>{show.release_date}</p>

                <button 
                  onClick={() => {(!sauve) ? favor() : defavor()}} 
                  className={`${sauve ? "bg-pink-600/50" : "bg-pink-500"} absolute bottom-5 left-5 lg:w-10 w-6 backdrop-blur-lg lg:h-10 h-6 lg:rounded-lg rounded-sm cursor-pointer text-stone-100 lg:text-md text-xs p-1 font-bold hover:bg-pink-500 active:bottom-2 hover:text-stone-800 transition-all`}
                >
                  {sauve ? "✖" : "❤"}
                </button>
              </div>

            </div>
            <p className='absolute w-20 h-10 rounded-lg left-10 text-2xl font-bold p-1 top-5 bg-amber-300/50 backdrop-blur-sm z-3'>{`★ ${show.vote_average.toFixed(1)}`}</p>
            
            <img src={`https://image.tmdb.org/t/p/original/${show.backdrop_path}`} className='absolute top-0 w-full h-150 object-cover opacity-80 -z-1 mask-fade-bottom'/>
            <img src={`https://image.tmdb.org/t/p/original/${show.poster_path}`} className='absolute top-150 w-full h-full object-cover opacity-20 blur-sm -z-1 mask-fade-top'/>
            <DropMenu title={"Seasons"} elements={seasons} css={buttoncss}/>
            <DropMenu title={"Episodes"} elements={eps} css={buttoncss}/>
        </div>

        <div className='absolute h-full w-29/30 top-180 left-1/2 -translate-x-1/2'>
          <TvStream videoID={`${show.id}`} s={season} e={episode} server={srvr} />

          {servers.map((server, index) => (
            <button
              key={index}
              onClick={() => setSrvr(index)}  // index is a number
              className={`mt-5 hover:bg-white px-5 hover:px-10 active:border-0 active:bg-cyan-800  ${buttoncss}`}
            >
              {server}
            </button>
          ))}

          <button onClick={() => {setCour(!cour)}} className='mx-100 my-10 w-60 h-12 rounded-lg bg-emerald-500/50 text-center p-2 text-2xl font-bold cursor-pointer hover:bg-white hover:text-emerald-500'> {cour ? "Avis ➨" : "Commentaires ➨ "} </button>

          <CommentSection film_id={show.id} media_type={"serie"} cour={cour}/>
          <Reviews film_id={show.id} media_type={"serie"} cour={cour}/>
        </div>
    </div>
  );
};

export default TvPage;