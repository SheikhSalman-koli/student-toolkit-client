import { useState } from "react";
import useURL from "../shared/Hooks/useURL";
import Spinner from '../shared/Loader/Spinner'
import AiActionButtons from "../actions/AiActionButtons";
import Markdown from 'react-markdown'


function OpenAi() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false)

  const axiosInstance = useURL()
  console.log(messages);


  const sendMessage = async () => {
    setLoading(true)

    if (!input.trim()) return;
    // Add user message to chat
    setMessages([...messages, { sender: "user", text: input }]);

    try {
      const { data } = await axiosInstance.post(`/chat`, { message: input })
      // console.log(data);
      // Add AI reply
      setMessages((prev) => [...prev, { sender: "bot", replay: data?.reply }]);
    } catch (error) {
      console.error(error);
    }

    setInput("");
    setLoading(false)
  };

  const handleKeyDown =(e)=>{
    if(e.key === "Enter"){
      e.preventDefault()
      sendMessage()
    }
  }



  return (
    <div className="p-6 max-w-10/12 mx-auto">
      <h1 className="text-xl font-bold mb-4">💬 AI Chatbot</h1>

      <div className="p-4 h-96 overflow-y-auto rounded mb-4">
        {messages?.map((msg, idx) => (

          <div key={idx}>
            <p
              className={msg?.sender === "user" && "text-gray-700 bg-gray-100 py-1 px-3 rounded-3xl mb-5"}
            >
              {msg?.text}
            </p>
            {
              msg?.replay &&
              <div className="mb-8">
                {loading && <Spinner />}
                <Markdown>
      
                  {msg?.replay}
          
                </Markdown>

                <AiActionButtons 
                 replay={msg?.replay}
                />

              </div>
            }

          </div>

        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="border text-gray-700 flex-1 p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="ask anything"
        />
        <button
          disabled={loading}
          className={`bg-blue-500 text-white px-4 rounded ${loading ? "cursor-not-allowed" : ""} `}
          onClick={sendMessage}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default OpenAi;
