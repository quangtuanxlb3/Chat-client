import { useState, useEffect, KeyboardEvent, useRef } from "react";
import type { MessageType } from "../../types/Message";
import ConversationItem from "./ConversationItem";

type Props = {
  messages: MessageType[];
  onSend?: (text: string) => void;
  onSendImage?: (file: File) => void;
  onSendFile?: (file: File) => void;
  onSendSticker?: (stickerUrl: string) => void;
};

export default function Conversation({ messages = [], onSend }: Props) {
  const [input, setInput] = useState("");
  const user = JSON.parse(localStorage.getItem("chat-user") || "{}");
  const listRef = useRef<HTMLDivElement | null>(null);

  const nowString = () =>
    new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  // Gửi text
  const sendMessage = () => {
    const content = input.trim();
    if (!content) return;

    if (onSend) {
      onSend(content);
    }
    setInput("");
  };

  // Gửi ảnh
  const sendImage = (file: File) => {};

  // Gửi file
  const sendFile = (file: File) => {};

  // Gửi sticker
  const sendSticker = (stickerUrl: string) => {};

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-60px)] flex-1 flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2 text-sm dark:border-gray-800 dark:bg-gray-900">
        <div>
          <div className="font-semibold text-gray-900 dark:text-gray-100">
            Nhóm UTH
          </div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400">
            Đang hoạt động
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex flex-1 flex-col-reverse overflow-y-auto p-5"
        ref={listRef}
      >
        {messages.map((m, i) => (
          <ConversationItem key={i} message={m} />
        ))}
      </div>

      {/* ----- INPUT MỚI (ICON ĐẸP) ----- */}
      <div className="border-t border-gray-200 bg-white px-3 py-2 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          {/* ICON ẢNH */}
          <label className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.6"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16l4-4a1 1 0 011.414 0L14 17m1-5l2-2a1 1 0 011.414 0L21 13M3 7h18M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
              />
            </svg>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) sendImage(f);
              }}
            />
          </label>

          {/* ICON FILE */}
          <label className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.6"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l7.778-7.778a4 4 0 10-5.657-5.657L5.93 10.586a6 6 0 108.485 8.485"
              />
            </svg>
            <input
              type="file"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) sendFile(f);
              }}
            />
          </label>

          {/* ICON STICKER */}
          <button
            onClick={() =>
              sendSticker(
                "https://cdn-icons-png.flaticon.com/512/742/742751.png",
              )
            }
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.6"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.362 5.214A8.002 8.002 0 104.64 15.36m10.722-10.147A8.003 8.003 0 0119.36 15.36M9 10h.01M15 10h.01M9.172 16.586a4 4 0 005.656 0"
              />
            </svg>
          </button>

          {/* TEXTAREA */}
          <textarea
            className="max-h-32 min-h-[40px] flex-1 resize-none rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* ICON GỬI */}
          <button
            onClick={sendMessage}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12l14-7-7 14-2-5-5-2z"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* ----- END INPUT ----- */}
    </div>
  );
}
