import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NavBar from "../components/navbar";
import { FaUserFriends } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import friendService from "../api_services/friend.service";
import axios from "axios";

import male from "../assets/male.jpg";
import female from "../assets/female.jpg";

export default function UserPage() {
  const { id } = useParams();
  const [Pageuser, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>HOLD UP</div>;
  }

  const isOwnProfile = user?.id === id;

  const handleAdd = async () => {
    try {
      await friendService.addFriend(user.id, id);
    } catch (err) {
      console.log("noo : ", err);
    }
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? e.target.checked : value;
    setUser((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`/api/users/${user.id}`, {
        username: Pageuser.username,
        email: Pageuser.email,
        sexe: Pageuser.sexe,
        location: Pageuser.location,
        bio: Pageuser.bio,
      });
      setUser(res.data); // sync updated data
      setEditMode(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) {
          throw new Error("User not found");
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 animate-pulse">
        Loading user...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-9/10 mx-auto mt-30 p-6 bg-rose-950/50 rounded-2xl shadow-lg">
      {!isOwnProfile && (
        <button
          onClick={handleAdd}
          className="absolute flex size-12 active:mt-2 bg-emerald-500 rounded-lg font-black text-2xl text-center p-3 cursor-pointer hover:bg-white hover:text-emerald-400 transition-all"
        >
          <FaUserFriends />
        </button>
      )}
      {!isOwnProfile && (
        <button className="absolute flex ml-15 size-12 active:mt-2 bg-rose-500 rounded-lg font-black text-2xl text-center p-3 cursor-pointer hover:bg-white hover:text-rose-400 transition-all">
          <IoChatboxEllipses />
        </button>
      )}
      {isOwnProfile && (
        <button
          onClick={handleEditToggle}
          className="absolute flex size-12 active:mt-2 bg-emerald-500 rounded-lg font-black text-2xl text-center p-3 cursor-pointer hover:bg-white hover:text-emerald-400 transition-all"
        >
          <MdEdit />
        </button>
      )}

      <img
        src={Pageuser.sexe ? male : female}
        className="size-50 m-auto rounded-full my-10"
      />

      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        {Pageuser.name}
      </h1>

      <div className="text-white m-auto mb-8 text-4xl font-bold">
        {editMode ? (
          <input
            name="username"
            value={Pageuser.username}
            onChange={handleChange}
            className="text-white rounded p-2 outline-none bg-rose-500/50"
          />
        ) : (
          Pageuser.username
        )}{" "}
        {Pageuser?.sexe ? "♂" : "♀"}
      </div>

      <p className="text-white mb-2 text-2xl">
        <strong>Email:</strong>{" "}
        {editMode ? (
          <input
            name="email"
            value={Pageuser.email}
            onChange={handleChange}
            className="text-white rounded p-2 outline-none bg-rose-500/50"
          />
        ) : (
          Pageuser.email
        )}
      </p>

      <p className="text-white mb-4">
        <strong>Bio:</strong>{" "}
        {editMode ? (
          <textarea
            name="bio"
            value={Pageuser.bio || ""}
            onChange={handleChange}
            rows={3}
            className="w-full mt-1 rounded p-2 outline-none bg-rose-500/50 text-white"
            placeholder="Ajoutez une bio..."
          />
        ) : (
          Pageuser.bio || "Pas de biographie"
        )}
      </p>

      <p className="text-white mb-4">
        <strong>Location :</strong>{" "}
        {editMode ? (
          <input
            name="location"
            value={Pageuser.location || ""}
            onChange={handleChange}
            className="text-white rounded p-2 outline-none bg-rose-500/50"
          />
        ) : (
          Pageuser.location || "No Location"
        )}
      </p>

      {editMode && (
        <div className="text-white mb-4">
          <label>
            <strong>Sexe:</strong>{" "}
            <input
              type="checkbox"
              name="sexe"
              checked={Pageuser.sexe}
              onChange={handleChange}
              className="ml-2"
            />{" "}
            Male
          </label>
        </div>
      )}

      {editMode && (
        <button
          className="bg-rose-500 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleSave}
        >
          Sauveguarder
        </button>
      )}

      <NavBar />
    </div>
  );
}
