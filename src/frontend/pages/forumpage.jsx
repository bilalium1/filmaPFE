import { useState } from "react";
import NavBar from "../components/navbar";

export default function ForumPage() {
  const [posts, setPosts] = useState([
    { id: 1, author: "User123", content: "Hello everyone!" },
    { id: 2, author: "Bilal", content: "Anyone working on a React project?" },
  ]);
  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (newPost.trim() === "") return;
    const post = {
      id: posts.length + 1,
      author: "You",
      content: newPost,
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <div className="min-h-screen mt-20 text-rose-300 p-6 space-y-6">
      <NavBar/>
      <header className="text-3xl font-bold text-rose-500">React Discussions</header>
      <p className="text-rose-400">Welcome to the thread. Share your thoughts below!</p>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded bg-stone-900 text-rose-100 border border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
          placeholder="What's on your mind?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-stone-950 font-semibold rounded"
          onClick={handlePost}
        >
          Post
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-rose-950 rounded-xl border-b-1 border-rose-500 p-4"
          >
            <p className="font-bold text-rose-400">{post.author}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}