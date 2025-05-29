import { useEffect, useState, useContext } from "react";
import reviewService from "../api_services/review.service.js";
import { AuthContext } from "../context/AuthContext";

const Reviews = ({ film_id, media_type }) => {
  const [allReviews, setAllReviews] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const {user, isloading} = useContext(AuthContext);

  if (!user) {
    return (<div>NO USER FOUND</div>)
  }

  const fetchRevs = async (f_id) => {
    try {
      const revs = await reviewService.getReviewsByFilmId(f_id);
      revs.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      setAllReviews(revs);
    } catch (err) {
      console.error("Failed to fetch reviewss:", err);
    }
  };

  useEffect(() => {
    fetchRevs(film_id);
  }, [film_id, user, isloading, text]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.username.trim() || !text.trim()) return;

    console.log("userid : ", user.id);
    console.log("filmid : ", film_id);

    try {
      await reviewService.createReview({
        user_id: user.id,
        film_id: film_id,
        rating : rating,
        review : text,
        media_type: media_type
      });
      setText(""); // clear input
      await fetchRevs(film_id); // refresh comments
    } catch (err) {
      console.error("Failed to post review:", err);
    }
  };

  console.log(allReviews);

  return (
    <div className="w-29/30 mx-auto mt-5 p-4 bg-rose-950/30 backdrop-blur-sm rounded-2xl shadow-md">
      <h2 className="text-3xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100 uppercase">AVIS</h2>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <div className="m-2">
          <input type="range" min="0" max="100" step="5" value={rating} onChange={(e) => setRating(e.target.value)} className="w-9/10 accent-emerald-500 mx-10"></input>
          <label className=" text-5xl font-kumar"> 🟊 {rating}</label>
        </div>
        <textarea
          placeholder="Vos avis..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-9/10 my-5 max-h-100 h-30 p-2 rounded-lg bg-stone-950/20 outline-none text-white border-1 border-emerald-500/50"
        ></textarea>
        <button
          type="submit"
          className="px-2 py-2 ml-5 bg-emerald-600 text-white text-xl rounded-lg w-auto px-5 font-bold h-12 cursor-pointer hover:bg-white hover:text-emerald-500"
        >
          Partager ➥
        </button>
      </form>

      {allReviews.length === 0 && (
        <p className="text-zinc-500 text-sm">Be the first to comment!</p>
      )}

      {/* Reveiews List */}
      <ul className="space-y-4">
        {allReviews.map((rev) => (          
          <li
            key={rev._id}
            className="p-4 rounded-xl bg-stone-950/20 border-emerald-500/50 border backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold bg-emerald-500/20 px-3 mb-2 rounded-sm text-white">
                {rev.user_id.username} ⮞ {rev.user_id.email}
              </span>

              {rev.user_id.is_admin && (
                <span className="font-semibold bg-rose-500/20 px-3 rounded-lg text-white">
                  🛡 Admin
                </span>)}
            </div>
            <div className="inline-flex w-full">
              <p className="text-zinc-600 rounded-sm h-auto w-7/10 dark:text-zinc-300 font-bold text-xl text-left pl-2 tracking-wide mt-1">
                - {rev.review}
              </p>
              <p className={`h-25 z-2 w-25 rounded-2xl tracking-tight m-auto right-0 ${rev.rating > 50 ? "bg-emerald-400/75 -rotate-0" : "bg-rose-500/75 rotate-0"} text-6xl p-7 font-kumar border-l-5`}>{rev.rating}</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
