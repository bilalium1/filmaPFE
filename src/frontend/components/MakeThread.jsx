import { useEffect, useState } from "react";
import SearchBar from "./searchBar";

export default function CreateThread({ onCreate }) {
  const [title, setTitle] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [film, setFilm] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return alert("Thread title can't be empty!");
    onCreate({ title: title.trim(), isPrivate });
    setTitle("");
    setIsPrivate(false);
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
        className="w-full p-2 rounded bg-stone-800 text-rose-300 border border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p onClick={() => setFilm([])} className={`p-2 rounded-sm font-bold hover:bg-rose-800 cursor-pointer transition-all ${film.length==0 ? "bg-rose-800" : "bg-rose-500"}`}>
            {(film.length==0) ? "Sans film." : `${film?.title || ''} ${film?.name || ''}`}
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

      <button
        type="submit"
        className="w-full py-2 bg-rose-500 hover:bg-rose-400 text-stone-950 font-semibold rounded"
      >
        Ouvrir le Theatre
      </button>
    </form>
  );
}
