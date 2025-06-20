import { useEffect, useState, useContext } from "react";
import SearchBar from "./searchBar";
import theaterService from "../api_services/theater.service";
import { AuthContext } from "../context/AuthContext";

export default function CreateThread({ onCreate }) {
  const [title, setTitle] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [film, setFilm] = useState(null);
  const [code, setCode] = useState("");
  const {user} = useContext(AuthContext);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (title.trim() === "") {
    return alert("Thread title can't be empty!");
  }

  console.log("media : ", film.media_type);

  // Build payload dynamically
  const payload = {
    title: title.trim(),
    is_private: isPrivate,
    host_id: user.id, // 🔐 Replace with actual user ID from auth context/store
  };

  if (film.id) {
    payload.film_id = film.id;
    payload.media_type = film.media_type;
  }

  if (isPrivate) {
    if (code.trim() === "") return alert("Private threads require a code.");
    payload.code = code.trim();
  }

  try {
    const newThread = await theaterService.createTheater(payload);
    onCreate?.(newThread); // optional chaining in case it's not provided

    // Reset state
    setTitle("");
    setIsPrivate(false);
    setFilm([]);
    setCode("");

  } catch (err) {
    console.error("Failed to create theater:", err);
    alert("Erreur lors de la création du théâtre.");
  }
};

  useEffect(() => {
    console.log(film);
  }, [film])

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-transparent border-rose-500 border-1 z-10 p-6 rounded-xl w-19/20 mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-rose-500">Nouvelle Theatre</h2>

      <input
        type="text"
        placeholder="Titre de Theatre"
        className="w-full p-2 rounded bg-stone-800 text-center text-rose-300 border border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <p
        onClick={() => setFilm(null)}
        className={`p-2 rounded-sm font-bold hover:bg-rose-800 cursor-pointer transition-all ${!film ? "bg-rose-800" : "bg-rose-500"}`}
      >
        {!film ? "Sans film." : `${film.title || film.name}`}
      </p>


        <SearchBar css="" parent="theatre" setFilm={setFilm}/>

      <label className="flex items-center space-x-3 text-rose-300 select-none cursor-pointer">
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={() => setIsPrivate(!isPrivate)}
          className="w-5 h-5 rounded bg-stone-800 border border-rose-500 focus:ring-rose-500"
        />
        <span>{isPrivate ? "Theatre Privee" : "Theatre Publique"}</span>
      </label>

      {isPrivate && (<input
        type="text"
        placeholder="Code du Theatre"
        className="w-5/10 p-2 rounded bg-stone-800 text-center text-rose-300 border border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />)}

      <button
        type="submit"
        className="w-full py-2 bg-rose-500 hover:bg-rose-400 text-stone-950 font-semibold rounded"
      >
        Ouvrir le Theatre
      </button>
    </form>
  );
}
