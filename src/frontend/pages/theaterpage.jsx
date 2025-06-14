import { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import male from "../assets/dunepost.jpg"; // fallback
import { FaLock, FaLockOpen } from "react-icons/fa";
import { FaMasksTheater } from "react-icons/fa6";
import CreateThread from "../components/MakeThread";
import theaterService from "../api_services/theater.service";

const TheaterPage = () => {
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const res = await theaterService.getAllTheaters();
        console.log(res.data);
        setTheaters(res.data);
      } catch (err) {
        console.error("Failed to fetch theaters:", err);
      }
    };

    fetchTheaters();
  }, [theaters]);

  console.log(theaters);
  console.log(theaters);

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
            <div
              key={theater._id}
              className="relative bg-rose-950/80 border-b-2 lg:h-72 h-60 m-3 rounded-2xl cursor-pointer hover:brightness-110 transition-all hover:border-b-4 overflow-hidden"
            >
              <img
                src={theater?.film?.poster || male}
                alt="poster"
                className="absolute size-full top-0 left-0 object-cover mix-blend-overlay"
              />
              <p className="relative w-19/20 mx-auto rounded-xl pt-3 bg-stone-950/20 h-12 top-2 font-bold text-center text-rose-200">
                {theater.title}
              </p>
              {theater.is_private ? (
                <FaLock className="absolute bottom-5 left-5 size-6 text-rose-300" />
              ) : (
                <FaLockOpen className="absolute bottom-5 left-5 size-6 text-rose-300" />
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
