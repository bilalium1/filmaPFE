import { useEffect, useState, useContext } from "react";
import {
  getCommentsByFilmId,
  createComment,
  getAllComments,
  likeComment,
  dislikeComment
} from "../api_services/comment.service";

import { AuthContext } from "../context/AuthContext";

const CommentSection = ({ film_id, media_type }) => {
  const [allComments, setAllComments] = useState([]);
  const [text, setText] = useState("");
  const {user, isloading} = useContext(AuthContext);
  const [commentChange, setCchange] = useState(false);

  if (!user) {
    return (<div>NO USER FOUND</div>)
  }

  const fetchComms = async (f_id) => {
    try {
      const comms = await getCommentsByFilmId(f_id);
      comms.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
      setAllComments(comms);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  useEffect(() => {
    fetchComms(film_id);
  }, [film_id, commentChange, user, isloading, allComments, text]);

  const handleLike = async (id) => {

    try {
      await likeComment(id, user.id);
      await fetchComms(film_id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async (id) => {

    try {
      await dislikeComment(id, user.id);
      await fetchComms(film_id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.username.trim() || !text.trim()) return;

    console.log("userid : ", user.id);
    console.log("filmid : ", film_id);

    try {
      await createComment({
        user_id: user.id,
        film_id: film_id,
        value : text,
        likes : [],
        dislikes : [],
        media_type: media_type
      });
      setText(""); // clear input
      await fetchComms(film_id); // refresh comments
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  console.log(allComments);

  return (
    <div className="w-29/30 mx-auto mt-5 p-4 bg-rose-950/30 backdrop-blur-sm rounded-2xl shadow-md">
      <h2 className="text-3xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100 uppercase">Commentaires</h2>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          placeholder="Leave a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-9/10 h-12 p-2 rounded-lg bg-stone-950/20 outline-none text-white border-1 border-emerald-500/50"
        ></input>
        <button
          type="submit"
          className="px-2 py-2 ml-5 bg-emerald-600 text-white text-xl rounded-lg w-12 h-12 cursor-pointer hover:bg-white hover:text-emerald-500"
        >
          ➥
        </button>
      </form>

      {allComments.length === 0 && (
        <p className="text-zinc-500 text-sm">Be the first to comment!</p>
      )}

      {/* Comments List */}
      <ul className="space-y-4">
        {allComments.map((comment) => (          
          <li
            key={comment._id}
            className="p-4 rounded-xl bg-stone-950/20 border-emerald-500/50 border backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold bg-emerald-500/20 px-3 mb-2 rounded-sm text-white">
                {comment.user_id.username} ⮞ {comment.user_id.email}
              </span>

              {comment.user_id.is_admin && (
                <span className="font-semibold bg-rose-500/20 px-3 rounded-lg text-white">
                  🛡 Admin
                </span>)}
            </div>
            <p className="text-zinc-600 rounded-sm h-auto dark:text-zinc-300 font-bold text-xl text-left pl-2 tracking-wide mt-1">
              - {comment.value}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => handleLike(comment._id)}
                className="flex items-center text-sm gap-1 text-xl text-green-400 hover:text-emerald-200 cursor-pointer px-2 bg-stone-950/50 rounded-lg hover:ml-1 transition-all active:mt-2"
              >
                ⮝ {Array.isArray(comment.likes) ? comment.likes.length : 0}
              </button>
              <button
                onClick={() => handleDislike(comment._id)}
                className="fAllCommentslex items-center text-sm gap-1 text-xl text-rose-400 hover:text-rose-200 cursor-pointer bg-stone-950/50 px-2 rounded-lg hover:ml-1 transition-all active:mt-2"
              >
                ⮟ {Array.isArray(comment.dislikes) ? comment.dislikes.length : 0}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
