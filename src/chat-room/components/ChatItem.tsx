import { Avatar } from "flowbite-react";
import type { ConversationType } from "../../types/Conversation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatDateTime } from "../../utils/formatDate";
import { useEffect } from "react";

type Props = {
  conversation: ConversationType;
};

export default function ChatItem({ conversation }: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const onClick = () => {
    if (id === conversation._id) return;
    navigate(`/chat?id=${conversation._id}`);
  };

  useEffect(() => {
    console.log(conversation);
  }, [conversation]);

  return (
    <button
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center gap-4 rounded-lg px-3 py-2 text-left text-sm transition-colors focus:ring-2 focus:ring-blue-300 focus:outline-none ${
        id === conversation._id
          ? "bg-blue-50 dark:bg-blue-900"
          : "bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
      }`}
    >
      <div className="shrink-0">
        <Avatar
          img={
            "https://flowbite-react.com/_next/image?url=%2Fimages%2Fpeople%2Fprofile-picture-5.jpg&w=48&q=75"
          }
          rounded
          statusPosition="bottom-right"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center">
          <span className="flex-1 font-semibold text-gray-900 dark:text-gray-100">
            {conversation.name}
          </span>
          {conversation.createdAt && (
            <span className="text-xs text-gray-400">
              {formatDateTime(conversation.createdAt)}
            </span>
          )}
        </div>
        <div className="mt-1 line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
          {conversation?.lastMessage?._id
            ? `@${conversation.lastMessage.sender.username}: ${conversation.lastMessage.content}`
            : "Chưa có tin nhắn"}
        </div>
      </div>

      {conversation.unreadCount > 0 && (
        <div className="ml-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-600 px-2 text-[11px] font-semibold text-white">
          {conversation.unreadCount}
        </div>
      )}
    </button>
  );
}
