import { useState } from "react";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { IoSendSharp } from "react-icons/io5";

// Sample fake data
const friends = [
  { id: "mehdi", name: "Mehdi" },
  { id: "sara", name: "Sara" },
  { id: "ali", name: "Ali" },
];

export default function ChatApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(friends[0]);
  const [conversations, setConversations] = useState({
    mehdi: [
      { sender: "them", text: "Hey Mehdi!" },
      { sender: "me", text: "Yo, what's up?" },
    ],
    sara: [{ sender: "them", text: "Did you do the thing?" }],
    ali: [],
  });
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setConversations((prev) => ({
      ...prev,
      [selectedFriend.id]: [
        ...prev[selectedFriend.id],
        { sender: "me", text: input },
      ],
    }));
    setInput("");
  };

  return (
    <div className={`fixed bottom-20 right-6 z-50`}>
      {(
        <div className={`flex max-w-[400px] h-120 bg-rose-400/10 backdrop-blur-xl rounded-xl shadow-2xl border-white/20 border transition-all duration-500 ${ isOpen ? "opacity-100 scale-100 block pointer-events-auto" : "scale-80 opacity-0 blur-sm pointer-events-none -mr-90"}`}>
          {/* Sidebar */}
          <div className="w-1/3 m-3 rounded-xl bg-rose-500/50 flex flex-col text-white overflow-hidden">
            {friends.map((friend) => (
              <button
                key={friend.id}
                onClick={() => setSelectedFriend(friend)}
                className={`py-3 px-2 text-sm font-semibold hover:bg-[#a11944] transition text-center ${
                  friend.id === selectedFriend.id
                    ? "bg-rose-500 text-black"
                    : ""
                }`}
              >
                {friend.name}
              </button>
            ))}
          </div>

          {/* Chat window */}
          <div className="max-w-full flex-1 bg-rose-900/70 flex flex-col rounded-xl">
            {/* Header */}
            <div className="bg-rose-500 text-white text-center py-2 font-bold text-sm w-9/10 mt-3 m-auto rounded-lg">
              {selectedFriend.name}
            </div>

            {/* Messages */}
            <div className="max-w-full flex-1 p-3 space-y-2 overflow-y-auto text-sm text-white">
              {conversations[selectedFriend.id]?.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[70%] whitespace-pre-wrap px-3 py-2 rounded-lg shadow-sm ${
                    msg.sender === "me"
                      ? "bg-[#4d061e] self-end ml-auto text-right"
                      : "bg-[#a11944] text-left"
                  }`}
                >
                  <span className="break-words overflow-hidden break-all">
                    {msg.text}
                  </span>
                  
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="bg-white/0 p-2 flex items-center gap-2 border-[#ff2d55]">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
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
      )}

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-rose-500 p-3 rounded-xl shadow-lg hover:bottom-5 active:scale-80 transition-all"
      >
        <IoChatboxEllipsesSharp className="text-white w-5 h-5" />
      </button>
    </div>
  );
}
