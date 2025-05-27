import { useEffect, useState, useContext } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import {
  getCommentsByFilmId,
  createComment,
} from "../api_services/comment.service";

import { AuthContext } from "../context/AuthContext";

const CommentSection = ({ film_id }) => {
  const [allComments, setAllComments] = useState([]);
  const [text, setText] = useState("");
  const {user, isloading} = useContext(AuthContext);

  const fetchComms = async () => {
    try {
      const comms = await getCommentsByFilmId(film_id);
      setAllComments(comms);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  useEffect(() => {
    fetchComms();
  }, [film_id]);

  const handleLike = (id) => {
    setAllComments((prev) =>
      prev.map((c) =>
        c._id === id ? { ...c, likes: c.likes + 1 } : c
      )
    );
  };

  const handleDislike = (id) => {
    setAllComments((prev) =>
      prev.map((c) =>
        c._id === id ? { ...c, dislikes: c.dislikes + 1 } : c
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !text.trim()) return;

    try {
      await createComment({
        filmid: film_id,
        username,
        text,
      });
      setText(""); // clear input
      await fetchComms(); // refresh comments
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  return (
    <div className="w-29/30 mx-auto p-4 bg-rose-950/30 backdrop-blur-sm rounded-2xl shadow-md">
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
            className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-zinc-700 dark:text-zinc-200">
                {comment.username}
              </span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-300 mt-1">
              {comment.text}
            </p>
            <div className="flex items-center gap-4 mt-3">
              <button
                onClick={() => handleLike(comment._id)}
                className="flex items-center text-sm gap-1 text-green-600 hover:text-green-800"
              >
                <ThumbsUp className="w-4 h-4" /> {comment.likes}
              </button>
              <button
                onClick={() => handleDislike(comment._id)}
                className="fAllCommentslex items-center text-sm gap-1 text-red-600 hover:text-red-800"
              >
                <ThumbsDown className="w-4 h-4" /> {comment.dislikes}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
