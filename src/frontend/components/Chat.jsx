import { useState, useEffect, useContext } from "react";
import { IoChatboxEllipsesSharp, IoSendSharp } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import friendService from "../api_services/friend.service";
import chatService from "../api_services/chat.service";

export default function ChatApp() {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [conversations, setConversations] = useState({});
  const [input, setInput] = useState("");

  // Fetch friends when chat opens
  useEffect(() => {
    if (isOpen && user) {
      (async () => {
        try {
          const friendList = await friendService.getFriends(user.id);
          setFriends(friendList);
          if (friendList.length > 0) setSelectedFriend(friendList[0]);
        } catch (err) {
          console.error("Failed to fetch friends:", err);
          setFriends([]);
          setSelectedFriend(null);
        }
      })();
    }
  }, [isOpen, user]);

  // Fetch conversation with selected friend
  useEffect(() => {
    if (!selectedFriend || !user) return;

    (async () => {
      try {
        const msgs = await chatService.getConversation(user.id, selectedFriend._id);
        setConversations((prev) => ({
          ...prev,
          [selectedFriend._id]: msgs.map((m) => ({
            sender: m.user_id === user.id ? "me" : "them",
            text: m.value,
            _id: m._id,
          })),
        }));
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    })();
  }, [selectedFriend, user]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || !selectedFriend) return;

    try {
      const newMsg = await chatService.sendMessage(user.id, selectedFriend._id, input);
      setConversations((prev) => ({
        ...prev,
        [selectedFriend._id]: [
          ...(prev[selectedFriend._id] || []),
          { sender: "me", text: newMsg.value, _id: newMsg._id },
        ],
      }));
      setInput("");
    } catch (err) {
      console.error("Message send failed:", err);
    }
  };

  return (
    <div className="fixed bottom-20 right-6 z-50">
      <div
        className={`flex max-w-[400px] h-120 bg-rose-400/10 backdrop-blur-xl rounded-xl shadow-2xl border-white/20 border transition-all duration-500 ${
          isOpen
            ? "opacity-100 scale-100 block pointer-events-auto"
            : "scale-80 opacity-0 blur-sm pointer-events-none -mr-90"
        }`}
      >
        {/* Sidebar */}
        <div className="w-1/3 m-3 rounded-xl bg-rose-500/50 flex flex-col text-white overflow-hidden">
          {friends.length === 0 && (
            <div className="p-3 text-center text-sm text-gray-300">No friends found</div>
          )}
          {friends.map((friend) => (
            <button
              key={friend._id}
              onClick={() => setSelectedFriend(friend)}
              className={`py-3 px-2 text-sm font-semibold hover:bg-[#a11944] transition text-center ${
                friend._id === selectedFriend?._id ? "bg-rose-500 text-black" : ""
              }`}
            >
              {friend.username}
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div className="max-w-full flex-1 bg-rose-900/70 flex flex-col rounded-xl">
          {/* Header */}
          <div className="bg-rose-500 text-white text-center py-2 font-bold text-sm w-9/10 mt-3 m-auto rounded-lg">
            {selectedFriend ? selectedFriend.username : "Aucun ami sélectionné"}
          </div>

          {/* Messages */}
          <div className="max-w-full flex-1 p-3 space-y-2 overflow-y-auto text-sm text-white">
            {(conversations[selectedFriend?._id] || []).map((msg) => (
              <div
                key={msg._id}
                className={`max-w-[70%] whitespace-pre-wrap px-3 py-2 rounded-lg shadow-sm ${
                  msg.sender === "me"
                    ? "bg-[#4d061e] self-end ml-auto text-right"
                    : "bg-[#a11944] text-left"
                }`}
              >
                <span className="break-words overflow-hidden break-all">{msg.text}</span>
              </div>
            ))}
            {(!conversations[selectedFriend?._id] ||
              conversations[selectedFriend._id]?.length === 0) && (
              <p className="text-center text-gray-400">Aucun message</p>
            )}
          </div>

          {/* Input */}
          <div className="bg-white/0 p-2 flex items-center gap-2 border-[#ff2d55]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Écrivez votre message..."
              className="flex-1 p-2 rounded-lg bg-[#2a0313] text-white text-sm outline-none"
            />
            <button
              onClick={sendMessage}
              className="p-2 rounded-lg bg-rose-500 text-white cursor-pointer transition"
            >
              <IoSendSharp size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 cursor-pointer right-6 bg-rose-500 p-3 rounded-xl shadow-lg hover:bottom-5 active:scale-80 transition-all"
      >
        <IoChatboxEllipsesSharp className="text-white w-5 h-5" />
      </button>
    </div>
  );
}
