import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import theaterService from "../api_services/theater.service";
import theaterChatService from "../api_services/th_chat.service"; // importer votre service API
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function ForumPage() {
  const { id } = useParams();
  const [theater, setTheater] = useState(null);
  const [film, setFilm] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const {user} = useContext(AuthContext);

  const navigate = useNavigate();

  // Récupérer les infos du théâtre et du film comme avant
  useEffect(() => {
    const fetchTheaterAndFilm = async () => {
      try {
        const theaterData = await theaterService.getTheaterById(id);
        setTheater(theaterData);

        if (theaterData?.media_type && theaterData?.film_id) {
          const endpoint =
            theaterData.media_type === "movie"
              ? `/api/movies/${theaterData.film_id}`
              : `/api/tv/${theaterData.film_id}`;
          const filmResponse = await axios.get(endpoint);
          setFilm(filmResponse.data);
        }
      } catch (err) {
        console.error("Échec de la récupération du théâtre ou du film :", err);
      }
    };

    fetchTheaterAndFilm();
  }, [id]);

  // Récupérer tous les messages du forum lors du montage du composant
  useEffect(() => {
  const fetchMessages = async () => {
    try {
      const data = await theaterChatService.getMessagesByTheaterId(id); // You need a method like this
      console.log("theater posts ", data)
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch forum messages:", error);
    }
  };

  fetchMessages();
}, [id]);


  const handlePost = async () => {
    if (newPost.trim() === "") return;

    // Poster le nouveau message au backend
    try {
      console.log(user.id);
      const postData = {
        user_id: user.id, // Remplacez par l’ID réel de l’utilisateur connecté
        theater_id: id,
        message: newPost,
      };
      const savedPost = await theaterChatService.createMessage(postData);

      // Ajouter le nouveau post en haut de la liste
      setPosts((prev) => [savedPost, ...prev]);
      setNewPost("");
    } catch (error) {
      console.error("Échec de l’envoi du message :", error);
    }
  };

  const watchPath =
    film?.id &&
    (theater?.media_type === "movie"
      ? `/films/${film.id}`
      : `/series/${film.id}/1/1`);

  // Aide pour formater la date joliment
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleString(); // Vous pouvez personnaliser ce format
  };

  return (
    <div className="min-h-screen mt-20 text-rose-300 p-6 space-y-6">
      <NavBar />

      <header className="text-3xl font-bold text-rose-500">
        {theater?.title || "Chargement..."}
        {theater?.host_id?.username && (
          <div className="text-sm text-rose-300 font-normal">
            Hébergé par{" "}
            <Link
              to={`/user/${theater.host_id._id}`}
              className="italic text-rose-400 underline hover:text-rose-200"
            >
              {theater.host_id.username}
            </Link>
          </div>
        )}
      </header>

      {film && (
        <div className="flex flex-col md:flex-row gap-6 items-start bg-stone-900/50 backdrop-brightness-200 backdrop-blur-[5px] p-4 rounded-xl border border-rose-800">
          {film.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
              alt="Affiche"
              className="w-48 rounded-xl border border-rose-400"
            />
          )}

          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-semibold text-rose-300">
              {film.title || film.name}
            </h2>
            <p className="text-sm text-gray-400">
              {film.genres?.map((g) => g.name).join(", ")}
            </p>
            <p className="text-rose-100">{film.overview}</p>

            {film.homepage && (
              <a
                href={film.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block underline text-rose-400 hover:text-rose-200 mx-10"
              >
                Site Officiel ⭷
              </a>
            )}

            {watchPath && (
              <Link
                to={watchPath}
                className="inline-block mt-2 px-4 py-2 bg-rose-500 hover:scale-[110%] hover:text-white text-stone-950 font-semibold rounded transition-all"
              >
                Regarder ▶
              </Link>
            )}
          </div>
        </div>
      )}

      <p className="text-rose-400">
        Bienvenue dans le fil. Partagez vos pensées ci-dessous !
      </p>

      <div className="flex gap-2">
        <textarea
          rows={5} // ajustez la hauteur comme vous voulez
          className="flex-1 p-2 rounded bg-stone-900 text-rose-100 border border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
          placeholder="Qu’est-ce que tu as en tête ?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // empêcher le saut de ligne sur Enter
            handlePost();
          }
        }}
        />

        <button
          className="px-4 py-2 bg-rose-500 hover:scale-[90%] hover:text-white cursor-pointer active:bg-white text-stone-950 font-semibold rounded transition-all"
          onClick={handlePost}
        >
          Envoyer
        </button>
      </div>

      <div className="space-y-4">
        {posts?.length === 0 && (
          <p className="text-rose-400 italic">Pas encore de messages. Soyez le premier !</p>
        )}

        {posts?.map((post) => {
  const isOriginalPoster = post.user_id?._id === theater?.host_id?._id;
  return (
    <div
      key={post._id || post.id}
      className="bg-rose-950/20 backdrop-blur-[5px] rounded-xl border-b border-rose-500 p-4"
    >
      <p onClick={() => navigate(`/user/${post.user_id._id}`)} className="font-bold text-left text-rose-400 flex items-center gap-2 cursor-pointer hover:text-white">
        {post.user_id?.username || post.author || "Anonyme"}
        {isOriginalPoster && (
          <span className="ml-2 px-2 py-0.5 text-xs font-semibold text-rose-100 bg-rose-600 rounded-sm italic">
            Auteur
          </span>
        )}
            </p>
            <p className="text-left text-xs text-rose-500 mb-1">
              {formatDate(post.createdAt || post.date || new Date())}
            </p>
            <p className="text-md tracking-wide text-left text-white">{post.message || post.content}</p>
          </div>
        );
        })}

      </div>
    </div>
  );
}
