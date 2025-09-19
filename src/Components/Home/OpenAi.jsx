import { useState } from "react";
import useURL from "../shared/Hooks/useURL";

function OpenAi() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

    const axiosInstance = useURL()

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    setMessages([...messages, { sender: "user", text: input }]);

    try {
    //   const res = await fetch("http://localhost:5000/chat", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ message: input }),
    //   });

        const {data} =await axiosInstance.post(`/chat`, { message: input }) 

    //   const data = await res.json();
       console.log(data);

      // Add AI reply
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      console.error(error);
    }

    setInput("");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">💬 AI Chatbot</h1>

      <div className="border p-4 h-96 overflow-y-auto rounded mb-4">
        {messages?.map((msg, idx) => (
          <p
            key={idx}
            className={msg.sender === "user" ? "text-blue-600" : "text-green-600"}
          >
            <b>{msg.sender}:</b> {msg.text}
          </p>
        ))}

        <button
        onClick={()=> setMessages([])}
        className="btn"
        >clear History</button>
      </div>

      <div className="flex gap-2">
        <input
          className="border flex-1 p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-500 text-white px-4 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default OpenAi;
