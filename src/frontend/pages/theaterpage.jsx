import { useEffect, useState, useContext } from "react";
import NavBar from "../components/navbar";
import male from "../assets/dunepost.jpg"; // fallback image
import { FaLock, FaLockOpen } from "react-icons/fa";
import { FaMasksTheater } from "react-icons/fa6";
import CreateThread from "../components/MakeThread";
import theaterService from "../api_services/theater.service";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TheaterPage = () => {
  const [theaters, setTheaters] = useState([]);
  const [posterMap, setPosterMap] = useState({}); // { [theaterId]: posterUrl }
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTheaters();
  }, []);

  const fetchPoster = async (mediaType, filmId) => {
        try {
          console.log("film id : ", filmId );
          const url =
            mediaType === "movie"
              ? `/api/movies/${filmId}`
              : `/api/tv/${filmId}`;

          const res = await axios.get(url);
          console.log("info : " , res.data.backdrop_path);
          return `https://image.tmdb.org/t/p/w500${res.data.backdrop_path}`;
          
          } catch (err) {
            console.error(`Error fetching poster for ${mediaType}/${filmId}`, err);
            return null;
          }
        };


  const fetchTheaters = async () => {
    try {
      const theatersData = await theaterService.getAllTheaters();
      setTheaters(theatersData);

      const posters = await Promise.all(
        theatersData.map(async (theater) => {
          if (!theater.film_id || !theater.media_type) return [theater._id, null];
          const posterUrl = await fetchPoster(theater.media_type, theater.film_id);
          return [theater._id, posterUrl];
        })
      );

      // Convert to object: { [id]: posterUrl }
      const posterMap = Object.fromEntries(posters);
      setPosterMap(posterMap);
    } catch (err) {
      console.error("Failed to fetch theaters:", err);
    }
  };

  console.log("poster : ",  posterMap);

  return (
    <div>
      <div className="flex flex-col mx-auto mt-20 w-19/20 rounded-xl bg-stone-950/20 border-t-3 backdrop-blur-sm">
        <FaMasksTheater className="absolute size-10 left-5 top-5" />
        <h1 className="w-full h-20 text-left pl-20 text-3xl pt-5 font-semibold">
          Theatres
        </h1>

        <CreateThread />

        {/* Theater Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 px-6 pb-10">
          {theaters?.map((theater) => (
            <div onClick={() => {navigate(`/theatre/${theater._id}`)}}
              key={theater._id}
              className="relative bg-rose-950/80 border-b-2 lg:h-72 h-60 m-3 rounded-2xl cursor-pointer hover:brightness-110 transition-all hover:border-b-4 overflow-hidden"
            >
              <img
                src={posterMap[theater._id]}
                alt="poster"
                className="absolute size-full top-0 left-0 object-cover opacity-70"
              />
              <p className="relative w-19/20 mx-auto rounded-xl pt-3 bg-stone-950/50 h-12 top-2 font-bold text-center text-rose-200 backdrop-blur-sm">
                {theater.title}
              </p>
              {theater.is_private ? (
                <FaLock className="absolute bottom-5 left-5 size-10 text-rose-300 bg-stone-900/50 p-2 backdrop-blur-sm rounded-lg" />
              ) : (
                <FaLockOpen className="absolute bottom-5 left-5 size-10 text-emerald-300 bg-stone-900/50 p-2 backdrop-blur-sm rounded-lg" />
              )}
            </div>
          ))}
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default TheaterPage;
