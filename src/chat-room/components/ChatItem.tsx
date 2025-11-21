import { Avatar } from "flowbite-react";

type Props = {
  name: string;
  lastMessage?: string;
  time?: string;
  unread?: number;
  avatar?: string;
  active?: boolean;
  onClick?: () => void;
};

export default function ChatItem({
  name,
  lastMessage,
  time,
  unread,
  avatar,
  active,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full cursor-pointer items-center gap-4 rounded-lg px-3 py-2 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${
        active
          ? "bg-blue-50 dark:bg-blue-900"
          : "bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
      }`}
    >
      <div className="shrink-0">
        <Avatar
          img={
            avatar ??
            "https://flowbite-react.com/_next/image?url=%2Fimages%2Fpeople%2Fprofile-picture-5.jpg&w=48&q=75"
          }
          rounded
          status={unread && unread > 0 ? "online" : undefined}
          statusPosition="bottom-right"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center">
          <span className="flex-1 font-semibold text-gray-900 dark:text-gray-100">{name}</span>
          {time && <span className="text-xs text-gray-400">{time}</span>}
        </div>
        {lastMessage && (
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{lastMessage}</div>
        )}
      </div>

      {unread && unread > 0 && (
        <div className="ml-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-600 px-2 text-[11px] font-semibold text-white">
          {unread}
        </div>
      )}
    </button>
  );
}
