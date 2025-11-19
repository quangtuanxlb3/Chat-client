import ChatRoom from "./chat-room/ChatRoom";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <AppRouter />
    </div>
  );
}
