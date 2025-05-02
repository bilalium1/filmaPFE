import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

const predefinedResponses = {
  "bonjour": [
    "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
    "Salut ! Que souhaitez-vous regarder ?",
    "Bonjour, je suis là pour vous aider à trouver votre prochain film préféré !"
  ],
  "hello": [
    "Hello! How can I help you today?",
    "Hi! What would you like to watch?",
    "Hello, I'm here to help you find your next favorite movie!"
  ],
  "film": [
    "Nous avons de nombreux films disponibles. Quel genre vous intéresse ?",
    "Je peux vous recommander des films populaires ou par genre. Que préférez-vous ?"
  ],
  "movie": [
    "We have many movies available. What genre interests you?",
    "Do you have a favorite director or actor in mind?"
  ],
  "series": [
    "We have series in all genres. What do you like to watch?",
    "I can recommend our most popular series if you'd like."
  ],
  "série": [
    "Nous avons des séries dans tous les genres. Qu'aimez-vous regarder ?",
    "Préférez-vous les séries courtes ou avec plusieurs saisons ?"
  ],
  "recommend": [
    "You might enjoy 'Stranger Things' or 'The Crown'.",
    "Have you tried 'Squid Game'? Very popular lately!",
    "Fans of classics love 'Breaking Bad' and 'Friends'."
  ],
  "recommandation": [
    "Vous pourriez aimer 'Stranger Things' ou 'The Crown'.",
    "Avez-vous essayé 'Squid Game' ? Très populaire en ce moment !",
    "Les classiques comme 'Breaking Bad' ou 'Friends' sont souvent appréciés."
  ],
  "help": [
    "Would you like to search for movies or get recommendations?",
    "Tell me what you're into, and I'll help you out!"
  ],
  "aide": [
    "Souhaitez-vous des recommandations ou chercher un film précis ?",
    "Dites-moi ce que vous aimez et je m'en occupe !"
  ]
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      content: "👋 Hello! How can I help you with FIL.MA today?\n💬 Bonjour ! Comment puis-je vous aider avec FIL.MA aujourd'hui ?",
      type: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    const trimmed = inputMessage.trim();
    if (!trimmed) return;

    const userMessage = {
      id: Date.now().toString(),
      content: trimmed,
      type: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    setTimeout(() => {
      const response = generateBotResponse(trimmed);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        type: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 600);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();

    for (const keyword in predefinedResponses) {
      if (input.includes(keyword)) {
        const responses = predefinedResponses[keyword];
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }

    const fallbackResponses = [
      "❓ Je ne suis pas sûr de comprendre. Pouvez-vous reformuler ?",
      "Vous pouvez me parler de films, séries ou me demander une recommandation !",
      "Besoin d'idées ? Dites-moi un genre, un acteur ou une humeur 🎬"
    ];

    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      toast("🤖 Assistant NetStream activé", {
        description: "Comment puis-je vous aider aujourd'hui ?",
      });
    }
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 rounded-full border-t-2 cursor-pointer backdrop-blur-sm size-12 flex items-center justify-center shadow-lg z-50 transition-all ${
          isOpen ? "bg-gray-700" : "bg-linear-to-b from-red-600/80 to-pink-500/50"
        } active:bottom-4 hover:bottom-5`}
      >
        {isOpen ? (
          <span className="text-white text-xl">×</span>
        ) : (
          <span className="text-white text-2xl">✦</span>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 h-96 flex flex-col z-40 bg-stone-900/50 backdrop-blur-sm rounded-lg">
          <div className="bg-linear-to-br from-red-600/50 to-pink-500/20 text-white py-3 px-4 text-center font-light rounded-t-lg">
            FIL.MA CHAT
          </div>
          <div className="flex-grow overflow-y-auto p-3 space-y-4 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-xl text-sm whitespace-pre-line ${
                    msg.type === "user"
                      ? "bg-linear-to-b from-red-600/80 to-pink-500/50 text-white"
                      : "bg-linear-to-t from-red-600/50 to-pink-500/20 text-gray-100"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-gray-700 bg-neutral-950 rounded-b-lg">
            <div className="flex w-full items-center gap-2">
              <input
                type="text"
                placeholder="Écrivez votre message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow bg-gray-800 border-gray-600 text-white px-3 py-2 rounded border"
              />
              <button
                onClick={handleSendMessage}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
              >
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;