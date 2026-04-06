import { useState } from "react";

export default function MenmexAI() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message) return;

    const newChat = [...chat, { role: "user", text: message }];
    setChat(newChat);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await res.json();

      setChat([
        ...newChat,
        { role: "ai", text: data.reply }
      ]);
    } catch (err) {
      setChat([
        ...newChat,
        { role: "ai", text: "Error connecting to Menmex AI." }
      ]);
    }

    setLoading(false);
  };

  const clearChat = () => {
    setChat([]);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">🤖 Menmex AI</h1>

      <div className="w-full max-w-2xl bg-gray-900 rounded-2xl p-4 h-[400px] overflow-y-auto">
        {chat.map((c, i) => (
          <div
            key={i}
            className={`mb-2 ${
              c.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-2xl ${
                c.role === "user" ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              {c.text}
            </span>
          </div>
        ))}

        {loading && (
          <div className="text-left text-gray-400">
            ⏳ Menmex is thinking...
          </div>
        )}
      </div>

      <div className="flex w-full max-w-2xl mt-4 gap-2">
        <input
          className="flex-1 p-3 rounded-xl bg-gray-800"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Talk to Menmex..."
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 rounded-xl"
        >
          Send
        </button>

        <button
          onClick={clearChat}
          className="bg-red-600 px-4 rounded-xl"
        >
          Clear
        </button>
      </div>
    </div>
  );
    }
