import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NavBar from "../components/navbar";
import { FaUserFriends } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import friendService from "../api_services/friend.service";

import male from "../assets/male.jpg";
import female from "../assets/female.jpg";

export default function UserPage() {
  const { id } = useParams();
  const [Pageuser, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user} = useContext(AuthContext);

  if (!user) {
    return (<div>HOLD UP</div>)
  }

  const isOwnProfile = user?.id === id;

  console.log(user?.id, id);

  const handleAdd = async () => {
    try {
        await friendService.addFriend(user.id, id);
    } catch (err) {
        console.log("noo : ", err);
    }
  }

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
        { !isOwnProfile && (<button onClick={handleAdd} className="fixed flex size-12 active:mt-2 bg-emerald-500 rounded-lg font-black text-2xl text-center p-3 cursor-pointer hover:bg-white hover:text-emerald-400 transition-all"><FaUserFriends /></button>)}
        { !isOwnProfile && (<button className="fixed flex ml-15 size-12 active:mt-2 bg-rose-500 rounded-lg font-black text-2xl text-center p-3 cursor-pointer hover:bg-white hover:text-rose-400 transition-all"><IoChatboxEllipses /></button>)}
        { isOwnProfile && (<button className="fixed flex size-12 active:mt-2 bg-emerald-500 rounded-lg font-black text-2xl text-center p-3 cursor-pointer hover:bg-white hover:text-emerald-400 transition-all"><MdEdit /></button>)}

      <img src={Pageuser.sexe ? male : female} className="size-50 m-auto rounded-full my-10"></img>
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        {Pageuser.name}
      </h1>
      <p className="text-white m-auto mb-8 text-4xl font-bold">
        {Pageuser.username} {Pageuser?.sexe ? "♂" : "♀"}
      </p>
      <p className="text-white mb-2 text-2xl">
        <strong>Email:</strong> {Pageuser.email}
      </p>
      <p className="text-white">
        <strong>Bio:</strong> {Pageuser.bio || "Pas de biographie"}
      </p>
      <p className="text-white">
        <strong>Location :</strong> {Pageuser.location || "No Location"}
      </p>
      <NavBar/>
    </div>
  );
}
