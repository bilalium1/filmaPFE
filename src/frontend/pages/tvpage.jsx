
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/navbar.jsx';
import axios from 'axios';
import TvStream from '../components/TvStream.jsx';
import DropMenu from '../components/dropMenu.jsx';
import { object } from 'motion/react-client';

const TvPage = () => {
  const { id, season, episode } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        // First try to get basic movie details
        const response = await axios.get(`/api/tv/${id}`);
        
        setShow({
          ...response.data,
        });
      } catch (err) {
        setError(err.response?.data?.status_message || err.message);
        console.error('Error fetching show:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [id]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!show) return <div>Show not found</div>;

  const seasons = {};
  const eps = {};
  show.seasons.forEach((seasonn, index) => {
  const seasonNumber = index + 1;
  seasons[`Season ${seasonNumber}`] = `/series/${show.id}/${seasonNumber}/1`;


  let ep = 0; // Global counter for all episodes

  for (ep=0; ep< show.seasons[season-1].episode_count;ep++){
    eps[`Episode ${ep+1}`] = `/series/${show.id}/${season}/${ep+1}`
  }

  console.log(seasons);
  console.log(eps);

});

  const buttoncss="px-4 mx-1 my-auto h-4/5 rounded-md text-stone-100 font-light tracking-wider hover:text-stone-950 transition-all b ease-out hover:px-6 hover:text-lg hover:backdrop-brightness-400 hover:font-black cursor-pointer"

  return (
    <div className="flex h-full w-full">
        <NavBar/>
        <div className='relative mx-auto mt-20 h-500 w-9/10 bg-linear-to-b from-cyan-900/50 to-75% border-t-[3px] rounded-2xl overflow-hidden'>
            <h3 className='w-full h-20 text-4xl font-extrabold z-2 text-center p-5'>{show.name}</h3>

            <div className='relative inline-flex w-full h-120'>

              <img src={`https://image.tmdb.org/t/p/original/${show.poster_path}`} className='relative h-120 w-80 mx-auto rounded-2xl shadow-2xl border-t-[3px] opacity-80 hover:mt-2 hover:saturate-120 transition-all'/>
              <div className='relative w-6/10 h-120 mx-auto rounded-2xl shadow-2xl border-t-[3px] bg-stone-800/40 mix-blend-overlay hover:mt-2 transition-all'>
                <p className='text-left px-5 pt-5 text-sm font-bold'>➤ {show.overview}</p>
                <p className='absolute tracking-widest right-5 bottom-5 font-bold'>{show.release_date}</p>
              </div>

            </div>
            <p className='absolute w-20 h-10 rounded-xl left-10 text-2xl font-bold p-1 top-5 bg-amber-300/50 backdrop-blur-sm z-3'>{`★ ${show.vote_average.toFixed(1)}`}</p>
            <img src={`https://image.tmdb.org/t/p/original/${show.backdrop_path}`} className='absolute top-0 w-full h-150 object-cover opacity-50 -z-1 mask-fade-bottom'/>
            <DropMenu title={"Seasons"} elements={seasons} css={buttoncss}/>
            <DropMenu title={"Episodes"} elements={eps} css={buttoncss}/>
        </div>

        <div className='absolute h-full w-29/30 top-180 left-1/2 -translate-x-1/2'>
          <TvStream videoID={`${show.id}`} s={season} e={episode} />
        </div>
    </div>
  );
};

export default TvPage;