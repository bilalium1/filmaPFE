import { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import axios from 'axios';
import Tete from '../components/tete.jsx';
import NavBar from '../components/navbar.jsx';
import CategoryDiv from '../components/Categorydiv.jsx';
import { AuthContext } from '../context/AuthContext.jsx'; 
import offline_data from '../filmadata.films.json';
import { getUserFavorites} from '../api_services/favorite.service.js';
import { useStore } from '../utils/store.js'

function Homepage() {

  const [active, setActive] = useState(false);

  const { user, isLoading } = useContext(AuthContext);

  const [ ufaves, setUfaves]= useState([]);
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cPage, setcPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const signal = useStore(state => state.signal);

  // LA FONCTION QUI CHERCHE TOUS LE MEDIAS

  const fetchMedias = useCallback(async(page = 1) => {
    try {

      const [mv_res, tv_res] = await Promise.all([
        axios.get(`/api/movies/popular?page=${page}`),
        axios.get(`/api/tv/popular?page=${page}`)
      ]);

      setTotalPages(mv_res.data.total_pages);

      const media_res = [
        ...mv_res.data.results.map(mv => ({...mv, media_type: 'film'})),
        ...tv_res.data.results.map(tv => ({...tv, media_type: 'serie'}))
      ]

      return media_res
    }catch (err) {
      console.log(err.message);
    }
    finally{
      setLoading(false);
    }
  }, []);

  const loadRest = async() => {
    if (cPage >= totalPages) return;

    const nextPage = cPage + 1;
    const newData = await fetchMedias(nextPage);

    setMedias(prev => [...prev, ...newData]);
    setcPage(nextPage);
  }
  
  // LA FONCTION CHERCHE LES FAVORITES:

  const user_Fav = async () => {
    try {
      // 1. Check if user exists
      if (!user?.id) {
        console.warn("No user ID available");
        setUfaves([]); // Reset to empty array
        return;
      }
  
      // 2. Fetch favorites
      const response = await getUserFavorites(user?.id);
      
      // 3. Validate response structure
      if (!response) {
        throw new Error("Invalid response structure");
      }

      const mediaDict = {};
  
      await Promise.all(
        response.map(async (fav) => {
          const media = await fetchMediaDetails(fav.id_film, fav.media_type);
          if (media) {
            mediaDict[fav.id_film] = {
              ...media,
              favorite_id: fav._id
            };
          }
        })
      );

      const mediaArray = Object.values(mediaDict);
      
      setUfaves(mediaArray);
      
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
      setUfaves([]);
    }
  };

  // LA FONCTION POUR CHERCHER LES FILMS PAR ID

  const fetchMediaDetails = async (tmdbId, mediaType) => {

    if (mediaType==="film"){
      try {
        // First try movie endpoint
        const movieResponse = await axios.get(
          `api/movies/${tmdbId}`,
        );
        return { ...movieResponse.data, media_type: 'film' };
      } catch (movieError) { console.log(" movie error" ,movieError)}
    } else {
      try {
        // First try movie endpoint
        const tvResponse = await axios.get(
          `api/tv/${tmdbId}`,
        );
        return { ...tvResponse.data, media_type: 'serie' };
      } catch (tvError) { console.log(" tv error : ", tvError)}
    }
  };
 
  useEffect(() => {

    const loadInitData = async () => {
      try {
        setLoading(true);
        // Fetch first 3 pages concurrently
        const [page1, page2, page3, page4, page5, page6, page7, page8, page9, page10, page11, page12] = await Promise.all([
          fetchMedias(1),
          fetchMedias(2),
          fetchMedias(3),
          fetchMedias(4),
          fetchMedias(5),
          fetchMedias(6),
          fetchMedias(7),
          fetchMedias(8),
          fetchMedias(9),
          fetchMedias(10),
          fetchMedias(11),
          fetchMedias(12)
        ]);
        
        // Combine all results
        const allData = [...page1, ...page2, ...page3, ...page4, ...page5
          ,...page6, ...page7, ...page8, ...page9, ...page10, ...page11, ...page12 
        ];

        allData.sort((a, b) => {
          const dateA = a.release_date || a.first_air_date;
          const dateB = b.release_date || b.first_air_date;
          return new Date(dateB) - new Date(dateA);
        });

        setMedias(allData);
        setcPage(12); // Set current page to 3 since we've loaded up to page 3
      } catch (error) {
        console.error("Error loading initial data:", error);
        setMedias(offline_data.data);
      } finally {
        setLoading(false);
      }
    };

    loadInitData();
  }, []); 

  useEffect(() => {
    user_Fav();
  }, [user, medias, signal, totalPages, isLoading, loading, cPage ])

  const categories = useMemo(() => [
    { title: "Tendance ▲", genre: 0 },
    { title: "Action", genre: 28 },
    { title: "Action et Aventure", genre: 10759},
    { title: "Drame", genre: 18 },
    { title: "Science-Fiction", genre: 878 },
    { title: "Fantastique", genre: 14 },
    { title: "Comédie", genre: 35 },
    { title: "Famille", genre: 10751 },
    { title: "Animation", genre: 16 },
    { title: "Crime", genre: 80 },
    { title: "Horreur", genre: 27 },
    { title: "Thriller", genre: 53 },
    { title: "Mystère", genre: 9648},
  ], []);

  if (!medias || medias.length ===0) {
    setMedias(offline_data);  
    setLoading(false);
  }

  return (
    <div className='w-full h-full flex-col'>
      
      {loading && <div className='fixed top-0 w-dvw h-dvh bg-stone-800/50 backdrop-blur-xl z-5 justify-center items-center'>
        <p className='relative w-full text-4xl font-bold uppercase text-center top-100 animate-pulse'>Une moment...</p>
        <div className='relative top-120 m-auto w-25 h-25 border-t-2 animate-spin rounded-full'></div>
      </div>} 

      <NavBar medias={medias}/>

      {medias.length > 0 && <Tete medias={medias.slice(0,120)} />}

      {/* Category Sections - Only show for popular tab */}
      {ufaves.length > 0 && (<CategoryDiv title={"Favorites ★"} medias={ufaves} genre={0}/>)}

      {categories.map(cat => (
        <CategoryDiv 
          key={cat.title}
          title={cat.title}
          genre={cat.genre}
          studio={cat.studio || ""}
          medias={medias}
          onScrollEnd={loadRest}
        />
      ))}
    </div>
  );
}

export default Homepage;