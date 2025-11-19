import ChatList from "./components/ChatList";
import Conversation from "./components/Conversation";
import Header from "./components/Header";

export default function ChatRoom() {
  return (
    <div>
      <Header />
      <div className="flex flex-row">
        {/* width 400px */}
        <div className="h-[calc(100vh-60px)] w-[400px] border-r border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
          <ChatList />
        </div>
        <Conversation />
      </div>
    </div>
  );
}
