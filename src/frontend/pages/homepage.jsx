import { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import axios from 'axios';
import Tete from '../components/tete.jsx';
import NavBar from '../components/navbar.jsx';
import CategoryDiv from '../components/Categorydiv.jsx';
import { AuthContext } from '../context/AuthContext.jsx'; 

function Homepage() {

  const [active, setActive] = useState(false);

  const { user, isLoading } = useContext(AuthContext);

  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cPage, setcPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
 
  useEffect(() => {

    const loadInitData = async () => {
      try {
        setLoading(true);
        // Fetch first 3 pages concurrently
        const [page1, page2, page3, page4, page5, page6, page7, page8, page9, page10] = await Promise.all([
          fetchMedias(1),
          fetchMedias(2),
          fetchMedias(3),
          fetchMedias(4),
          fetchMedias(5),
          fetchMedias(6),
          fetchMedias(7),
          fetchMedias(8),
          fetchMedias(9),
          fetchMedias(10)
        ]);
        
        // Combine all results
        const allData = [...page1, ...page2, ...page3, ...page4, ...page5
          ,...page6, ...page7, ...page8, ...page9, ...page10 
        ];

        allData.sort((a, b) => {
          const dateA = a.release_date || a.first_air_date;
          const dateB = b.release_date || b.first_air_date;
          return new Date(dateB) - new Date(dateA);
        });

        setMedias(allData);
        setcPage(5); // Set current page to 3 since we've loaded up to page 3
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    loadInitData();
  }, []); 

  const categories = useMemo(() => [
    { title: "Tendance 🔥 ", genre: 0 },
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
    { title: "Marvel", genre: null, studio: "Marvel Studios" }
  ], []);

  console.log(medias);
  console.log(medias.slice(0,10));
  
  return (
    <div className='w-full h-full flex-col'>
      
      {loading && <div className='fixed top-0 w-dvw h-dvh bg-stone-800/50 backdrop-blur-xl z-5 justify-center items-center'>
        <p className='relative w-full text-4xl font-bold uppercase text-center top-100 animate-pulse'>Une moment...</p>
        <div className='relative top-120 m-auto w-25 h-25 border-t-2 animate-spin rounded-full'></div>
      </div>} 

      <NavBar medias={medias}/>

      {medias.length > 0 && <Tete medias={medias.slice(0,200)} />}

      {/* Category Sections - Only show for popular tab */}
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