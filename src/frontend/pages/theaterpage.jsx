import { useEffect, useState, useContext } from "react";
import NavBar from "../components/navbar";
import male from "../assets/dunepost.jpg"; // fallback image
import { FaLock, FaLockOpen } from "react-icons/fa";
import { FaMasksTheater } from "react-icons/fa6";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import CreateThread from "../components/MakeThread";
import theaterService from "../api_services/theater.service";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TheaterPage = () => {
  const [theaters, setTheaters] = useState([]);
  const [posterMap, setPosterMap] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Modal state
  const [showCodePrompt, setShowCodePrompt] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");

  // Toggle CreateThread
  const [showCreateThread, setShowCreateThread] = useState(false);

  useEffect(() => {
    fetchTheaters();
  }, []);

  const fetchPoster = async (mediaType, filmId) => {
    try {
      const url =
        mediaType === "movie"
          ? `/api/movies/${filmId}`
          : `/api/tv/${filmId}`;
      const res = await axios.get(url);
      return `https://image.tmdb.org/t/p/w500${res.data.backdrop_path}`;
    } catch (err) {
      console.error(`Erreur lors de la récupération du poster`, err);
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

      const posterMap = Object.fromEntries(posters);
      setPosterMap(posterMap);
    } catch (err) {
      console.error("Échec de récupération des théâtres :", err);
    }
  };

  const handleTheaterClick = (theater) => {
    if (theater.is_private) {
      setSelectedTheater(theater);
      setShowCodePrompt(true);
    } else {
      navigate(`/theatre/${theater._id}`);
    }
  };

  const verifyCodeAndEnter = () => {
    if (accessCode === selectedTheater?.code) {
      setShowCodePrompt(false);
      setAccessCode("");
      setError("");
      navigate(`/theatre/${selectedTheater._id}`);
    } else {
      setError("Code incorrect. Réessaie.");
    }
  };

  const closeModal = () => {
    setShowCodePrompt(false);
    setAccessCode("");
    setError("");
  };

  return (
    <div>
      <div className="flex flex-col mx-auto mt-30 w-19/20 rounded-xl bg-stone-950/20 border-t-3 backdrop-blur-sm">
        <FaMasksTheater className="absolute size-10 left-5 top-5" />
        <h1 className="w-full h-20 text-left pl-20 text-3xl pt-5 font-semibold">
          Théâtres
        </h1>

        {/* Toggle Button */}
        <div className="flex items-center justify-between px-6 mb-4">
          <button
            className="flex items-center gap-2 text-rose-400 font-medium hover:text-rose-300 transition"
            onClick={() => setShowCreateThread(!showCreateThread)}
          >
            {showCreateThread ? (
              <>
                <ChevronUpIcon className="h-5 w-5" />
                Masquer la création d’un théâtre
              </>
            ) : (
              <>
                <ChevronDownIcon className="h-5 w-5" />
                Créer un nouveau théâtre
              </>
            )}
          </button>
        </div>

        {/* Conditional Create Thread */}
        {showCreateThread && <CreateThread />}

        {/* Theater Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-10">
          {theaters?.map((theater) => (
            <div
              onClick={() => handleTheaterClick(theater)}
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
                <FaLock className="absolute bottom-5 left-5 size-10 text-white bg-rose-500/70 p-2 backdrop-blur-sm rounded-lg" />
              ) : (
                <FaLockOpen className="absolute bottom-5 left-5 size-10 text-white bg-emerald-500/70 p-2 backdrop-blur-sm rounded-lg" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showCodePrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-stone-900 p-6 rounded-2xl shadow-lg w-11/12 max-w-md border border-rose-400">
            <h2 className="text-xl font-bold text-rose-200 mb-4">
              Code d'accès requis
            </h2>
            <input
              type="text"
              placeholder="Entrez le code..."
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="w-full p-2 mb-3 rounded bg-stone-800 text-rose-100 border border-rose-500 focus:outline-none"
            />
            {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
              >
                Annuler
              </button>
              <button
                onClick={verifyCodeAndEnter}
                className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-500"
              >
                Entrer
              </button>
            </div>
          </div>
        </div>
      )}

      <NavBar />
    </div>
  );
};

export default TheaterPage;
