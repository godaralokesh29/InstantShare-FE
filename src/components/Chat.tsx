import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "./Loading";

interface Message {
  text: string;
  userId: string;
  username?: string;
}

function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userCount, setUserCount] = useState(1);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const wsRef = useRef<WebSocket | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { roomId, username } = useParams()

  // To scroll down to Latest msg
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  useEffect(() => {
    const ws = new WebSocket("https://instantcode-be.onrender.com");
    
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "chat") {
        setMessages(m => [...m, {text:data.message, userId:data.userId, username:data.username}]);
      
      } else if (data.type === "roomCount") {
        setUserCount(data.count);
        // console.log("Users in room:", data.count);
      } else if (data.type === "userId") {
        setUserId(data.userId); // Store assigned userId
      }
    }

    wsRef.current = ws

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: roomId,
          username: username,
        }
      }))
      
      setLoading(false)
    }

    //Cleanup
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
        setUserCount(c=>c-1)
      }
    };
  }, [roomId, username])

  const sendMessage = () => {
    const msg = inputRef.current?.value;
    if (!msg ) return; // Prevent sending empty messages

    wsRef.current?.send(JSON.stringify({
      type: "chat",
      payload: {
        text: msg,
        userId: userId,
        username: username
      }
    }))

    if(inputRef.current) inputRef.current.value = ""; // Clear input after sending
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  

  return (
    loading ? <Loading/> : (
      <div className="h-screen bg-white flex flex-col items-center justify-center p-4">
        {/* Chat Card */}
        <div className="w-full max-w-2xl bg-gray-50 shadow-sm rounded-lg border border-gray-200 p-4 flex flex-col h-[90vh]">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <h2 className="text-sm font-medium text-gray-600">Room: {roomId}</h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{username}</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-500">{userCount} online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`flex flex-col ${msg.userId === userId ? "items-end" : "items-start"} mb-2`}>
                {msg.userId !== userId && (
                  <span className="text-xs text-gray-500 mb-1">
                    {msg.username}
                  </span>
                )}
                <div className={`px-4 py-2 rounded-lg max-w-xs ${
                  msg.userId === userId 
                    ? "bg-gray-100 text-gray-800" 
                    : "bg-white border border-gray-200 text-gray-800"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Field */}
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-300"
                onKeyDown={handleKeyDown}
              />
              <button 
                onClick={sendMessage}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-xs text-gray-400">
          Messages are end-to-end encrypted
        </div>
      </div>
    )
  );
}

export default ChatRoom;