import { Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";
import JoinRoom from "./components/JoinRoom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<JoinRoom />} />
      <Route path="/chat/:roomId/:username" element={<Chat />} />
    </Routes>
  );
}
