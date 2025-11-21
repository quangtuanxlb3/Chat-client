import { useState } from "react";
import ChatList, { Chat } from "./components/ChatList";
import Conversation from "./components/Conversation";
import type { Message } from "./types";
import Header from "./components/Header";

const initialChats: Chat[] = [
  {
    id: 1,
    name: "Nhóm UTH",
    lastMessage: "Mai 7h tập trung cổng trường nha.",
    time: "09:21",
    unread: 2,
  },
  {
    id: 2,
    name: "Thầy Tuan - CNPM",
    lastMessage: "Nhớ nộp báo cáo trước thứ 6.",
    time: "Hôm qua",
    unread: 0,
  },
  {
    id: 3,
    name: "Gia đình",
    lastMessage: "Cuối tuần nhớ về nhà ăn cơm.",
    time: "Thứ 2",
    unread: 1,
  },
];

export default function ChatRoom() {
  const [chats] = useState<Chat[]>(initialChats);
  const [activeId, setActiveId] = useState<number | null>(chats[0]?.id ?? null);

  const selected = chats.find((c) => c.id === activeId) ?? null;

  const initialMessages: Message[] = [
    {
      id: 1,
      fromMe: false,
      text: "Hello, đây là demo tin nhắn của DotChat.",
      time: "09:00",
    },
    {
      id: 2,
      fromMe: true,
      text: "OK, giao diện mới nhìn cũng ổn 😄",
      time: "09:01",
    },
  ];

  const [messagesByChat, setMessagesByChat] = useState<Record<number, Message[]>>(() => {
    const map: Record<number, Message[]> = {};
    for (const c of chats) map[c.id] = [...initialMessages];
    return map;
  });

  const nowString = () =>
    new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const sendMessage = (chatId: number, text: string) => {
    const msg: Message = { id: Date.now(), fromMe: true, text, time: nowString() };
    setMessagesByChat((prev) => ({ ...prev, [chatId]: [...(prev[chatId] ?? []), msg] }));
  };

  const sendImage = (chatId: number, file: File) => {
    const url = URL.createObjectURL(file);
    const msg: Message = { id: Date.now(), fromMe: true, image: url, time: nowString() };
    setMessagesByChat((prev) => ({ ...prev, [chatId]: [...(prev[chatId] ?? []), msg] }));
  };

  const sendFile = (chatId: number, file: File) => {
    const url = URL.createObjectURL(file);
    const msg: Message = { id: Date.now(), fromMe: true, file: { name: file.name, size: file.size, url }, time: nowString() };
    setMessagesByChat((prev) => ({ ...prev, [chatId]: [...(prev[chatId] ?? []), msg] }));
  };

  const sendSticker = (chatId: number, stickerUrl: string) => {
    const msg: Message = { id: Date.now(), fromMe: true, sticker: stickerUrl, time: nowString() };
    setMessagesByChat((prev) => ({ ...prev, [chatId]: [...(prev[chatId] ?? []), msg] }));
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 min-w-[280px] border-r border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 flex flex-col">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-sm text-gray-700 dark:text-gray-200">YT</div>
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-900 dark:text-gray-100">Your Name</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Online</div>
              </div>
            </div>

            <div className="mt-4">
              <input
                aria-label="Search chats"
                placeholder="Search or start new chat"
                className="w-full px-3 py-2 rounded-md border bg-white dark:bg-gray-700 text-sm placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <ChatList chats={chats} activeId={activeId} onSelect={(id) => setActiveId(id)} />
          </div>
        </aside>

        <main className="flex-1 flex flex-col">
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-auto">
              <Conversation
                chat={selected}
                messages={selected ? messagesByChat[selected.id] ?? [] : []}
                onSend={(text) => selected && sendMessage(selected.id, text)}
                onSendImage={(file) => selected && sendImage(selected.id, file)}
                onSendFile={(file) => selected && sendFile(selected.id, file)}
                onSendSticker={(url) => selected && sendSticker(selected.id, url)}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
