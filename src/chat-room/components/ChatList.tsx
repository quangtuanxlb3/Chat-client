import ChatItem from "./ChatItem";
import type { ConversationType } from "../../types/Conversation";

type Props = {
  onOpenCreateConversation: () => void; // ⭐ thêm props mới
  conversations: ConversationType[];
};

export default function ChatList({
  onOpenCreateConversation,
  conversations,
}: Props) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-200 p-3 dark:border-gray-700">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Chats
          </h2>

          {/* ⭐ Nút Tạo Nhóm */}
          <button
            onClick={onOpenCreateConversation}
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow hover:bg-blue-700"
          >
            +
          </button>
        </div>

        <input
          aria-label="Search chats"
          className="w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-800 outline-none focus:border-blue-500 dark:bg-gray-600 dark:text-gray-100"
          placeholder="Search by name or message"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {conversations.map((c) => (
            <li key={c._id}>
              <ChatItem conversation={c} onClick={() => {}} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
