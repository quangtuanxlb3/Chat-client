import ChatItem from "./ChatItem";

export type Chat = {
  id: number;
  name: string;
  lastMessage?: string;
  time?: string;
  unread?: number;
  avatar?: string;
};

type Props = {
  chats: Chat[];
  activeId: number | null;
  onSelect: (id: number) => void;
};

export default function ChatList({ chats, activeId, onSelect }: Props) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-200 p-3 dark:border-gray-700">
        <h2 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
          Chats
        </h2>
        <input
          aria-label="Search chats"
          className="w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-800 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
          placeholder="Search by name or message"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {chats.map((c) => (
            <li key={c.id}>
              <ChatItem
                name={c.name}
                lastMessage={c.lastMessage}
                time={c.time}
                unread={c.unread}
                active={activeId === c.id}
                onClick={() => onSelect(c.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
