import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default  function JoinRoom() {
    const [username, setUsername] = useState("");
    const [joinRoomId, setJoinRoomId] = useState("");
    const navigate = useNavigate();

    const generate = () => {
        const room = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        setJoinRoomId(room);
    };

    const joinRoom = () => {
        if (!username.trim()) {
            alert("Please enter a username.");
            return;
        }
        if (!joinRoomId.trim()) {
            alert("Please enter or generate a room ID.");
            return;
        }
        navigate(`/chat/${joinRoomId}/${username}`);
    };

    return (
        <div className="h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-50 shadow-sm rounded-lg border border-gray-200 p-6">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <h2 className="text-sm font-medium text-gray-600">Join Chat Room</h2>
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                    <p className="text-xs text-gray-500">Enter your details to start chatting</p>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    {/* Username Input */}
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Username</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-300 text-sm"
                        />
                    </div>

                    {/* Room ID Input */}
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Room ID</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter room code"
                                value={joinRoomId}
                                onChange={(e) => setJoinRoomId(e.target.value)}
                                className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-300 text-sm"
                            />
                            <button
                                onClick={generate}
                                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                            >
                                Generate
                            </button>
                        </div>
                    </div>

                    {/* Join Button */}
                    <button
                        onClick={joinRoom}
                        className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm mt-6"
                    >
                        Join Room
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400">
                        Room will expire when all users leave
                    </p>
                </div>
            </div>
        </div>
    );
}

