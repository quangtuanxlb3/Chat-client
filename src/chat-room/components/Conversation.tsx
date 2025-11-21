import { useState, useEffect, KeyboardEvent, useRef } from "react";

type Message = {
  id: number;
  fromMe: boolean;
  text?: string;
  time: string;
  image?: string;
  file?: {
    name: string;
    size: number;
    url: string;
  };
  sticker?: string;
};

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

type Props = {
  chat?: { id: number; name: string } | null;
  messages?: Message[];
  onSend?: (text: string) => void;
  onSendImage?: (file: File) => void;
  onSendFile?: (file: File) => void;
  onSendSticker?: (stickerUrl: string) => void;
};

export default function Conversation({ chat, messages: messagesProp, onSend, onSendImage, onSendFile, onSendSticker }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  // TEST KẾT NỐI SERVER
  useEffect(() => {
    fetch("http://localhost:5000/api/messages")
      .then((res) => res.json())
      .then((data) => console.log("Kết nối server OK:", data))
      .catch((err) => console.error("Lỗi kết nối server:", err));
  }, []);

  const nowString = () =>
    new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  // Gửi text
  const sendMessage = () => {
    const content = input.trim();
    if (!content) return;

    const msg: Message = {
      id: Date.now(),
      fromMe: true,
      text: content,
      time: nowString(),
    };

    if (onSend) {
      onSend(content);
    } else {
      setMessages((prev) => [...prev, msg]);
    }
    setInput("");
  };

  // Gửi ảnh
  const sendImage = (file: File) => {
    if (onSendImage) return onSendImage(file);

    const url = URL.createObjectURL(file);
    const msg: Message = {
      id: Date.now(),
      fromMe: true,
      image: url,
      time: nowString(),
    };

    setMessages((prev) => [...prev, msg]);
  };

  // Gửi file
  const sendFile = (file: File) => {
    if (onSendFile) return onSendFile(file);

    const url = URL.createObjectURL(file);
    const msg: Message = {
      id: Date.now(),
      fromMe: true,
      file: {
        name: file.name,
        size: file.size,
        url,
      },
      time: nowString(),
    };

    setMessages((prev) => [...prev, msg]);
  };

  // Gửi sticker
  const sendSticker = (stickerUrl: string) => {
    if (onSendSticker) return onSendSticker(stickerUrl);

    const msg: Message = {
      id: Date.now(),
      fromMe: true,
      sticker: stickerUrl,
      time: nowString(),
    };

    setMessages((prev) => [...prev, msg]);
  };

  // reset or load messages when selected chat changes (placeholder behavior)
  useEffect(() => {
    if (messagesProp) return; // parent is controlling messages
    setMessages(initialMessages);
  }, [chat?.id]);

  // auto-scroll when messages change
  useEffect(() => {
    const node = listRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, messagesProp]);

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
      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {(messagesProp ?? messages).map((m) => (
          <div
            key={m.id}
            className={`flex ${m.fromMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                m.fromMe
                  ? "rounded-br-none bg-blue-600 text-white"
                  : "rounded-bl-none bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
              }`}
            >
              {/* TEXT */}
              {m.text && <div>{m.text}</div>}

              {/* IMAGE */}
              {m.image && (
                <img
                  src={m.image}
                  className="mt-1 max-h-60 rounded-lg border border-gray-300 dark:border-gray-600"
                />
              )}

              {/* FILE */}
              {m.file && (
                <a
                  href={m.file.url}
                  download={m.file.name}
                  className="mt-2 flex flex-col rounded-md bg-gray-200 p-2 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                >
                  <span className="font-semibold">{m.file.name}</span>
                  <span>{(m.file.size / 1024).toFixed(1)} KB</span>
                </a>
              )}

              {/* STICKER */}
              {m.sticker && <img src={m.sticker} className="mt-1 h-20 w-20" />}

              {/* TIME */}
              <div className="mt-1 text-right text-[10px] opacity-70">
                {m.time}
              </div>
            </div>
          </div>
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
