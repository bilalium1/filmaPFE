// components/UserSearch.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserSearch = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.get("/api/users");
      const users = res.data;

      const matchedUser = users.find(
        (user) => user.username.toLowerCase() === username.toLowerCase()
      );

      if (matchedUser) {
        navigate(`/user/${matchedUser._id}`);
      } else {
        setError("❌ Aucun utilisateur trouvé avec ce nom.");
      }
    } catch (err) {
      console.error(err);
      setError("⚠️ Une erreur est survenue.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-stone-900 rounded-2xl shadow-xl mt-10">
      <h2 className="text-2xl font-bold text-rose-300 mb-4">Rechercher un utilisateur</h2>
      <form onSubmit={handleSearch} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 rounded-lg bg-stone-800 text-emerald-300 placeholder-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
        />
        <button
          type="submit"
          className="bg-rose-600 cursor-pointer hover:scale-[105%] hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
        >
          Rechercher
        </button>
        {error && (
          <div className="text-rose-400 text-sm font-medium bg-stone-800 p-2 rounded-lg border border-rose-500">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default UserSearch;
