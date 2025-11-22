import { useState } from "react";
import ChatList from "./components/ChatList";
import Conversation from "./components/Conversation";
import Header from "./components/Header";

export type Chat = {
  id: number;
  name: string;
  lastMessage?: string;
  time?: string;
  unread?: number;
  avatar?: string;
  isGroup?: boolean;
};

export default function ChatRoom() {
  // danh sách chat
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      name: "Minh",
      lastMessage: "Mai đi học nha",
      time: "08:31",
      isGroup: false,
    },
    {
      id: 2,
      name: "Thầy Tuan - CNPM",
      lastMessage: "Nộp bài nhé",
      time: "Hôm qua",
      isGroup: false,
    },
    {
      id: 3,
      name: "Sister",
      lastMessage: "Về ăn cơm",
      time: "Thứ 2",
      isGroup: false,
    },
    {
      id: 4,
      name: "Tuan",
      lastMessage: "Về ăn cơm",
      time: "Thứ 2",
      isGroup: false,
    },
  ]);

  const [activeId, setActiveId] = useState<number | null>(1);

  // popup state
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>([]);
  const [groupName, setGroupName] = useState("");
  const [baseChatId, setBaseChatId] = useState<number | null>(null);

  // mở popup tạo nhóm
  const openCreateGroup = (fromChatId: number) => {
    const base = chats.find((c) => c.id === fromChatId);
    if (!base) return;

    setBaseChatId(fromChatId);

    if (!base.isGroup) {
      setSelectedMemberIds([fromChatId]);
    } else {
      setSelectedMemberIds([]);
    }

    setGroupName("");
    setIsCreatingGroup(true);
  };

  // tick/untick
  const toggleMember = (id: number) => {
    setSelectedMemberIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const cancelCreateGroup = () => {
    setIsCreatingGroup(false);
    setSelectedMemberIds([]);
    setGroupName("");
    setBaseChatId(null);
  };

  // xác nhận tạo nhóm
  const confirmCreateGroup = () => {
    if (selectedMemberIds.length === 0) {
      alert("Hãy chọn ít nhất một thành viên.");
      return;
    }

    const memberNames = chats
      .filter((c) => selectedMemberIds.includes(c.id))
      .map((c) => c.name.trim());

    const uniqueNames = Array.from(new Set(memberNames));
    if (uniqueNames.length === 0) return;

    const finalGroupName =
      groupName.trim().length > 0 ? groupName.trim() : uniqueNames.join(", ");

    const newChat: Chat = {
      id: Date.now(),
      name: finalGroupName,
      lastMessage: "Thành viên: " + uniqueNames.join(", "),
      time: "Vừa xong",
      isGroup: true,
    };

    setChats((prev) => [...prev, newChat]);
    setActiveId(newChat.id);

    cancelCreateGroup();
  };

  // chỉ chọn cá nhân
  const candidateMembers = chats.filter((c) => !c.isGroup);

  return (
    <div>
      <Header />

      <div className="flex flex-row">
        {/* LEFT SIDE */}
        <div className="h-[calc(100vh-60px)] w-[400px] border-r border-gray-200 bg-gray-100 dark:bg-gray-800">
          <ChatList
            chats={chats}
            activeId={activeId}
            onSelect={(id) => setActiveId(id)}
            onCreateGroup={(id) => openCreateGroup(id)}
          />
        </div>

        {/* RIGHT SIDE */}
        <Conversation chatId={activeId} />
      </div>

      {/* POPUP TẠO NHÓM */}
      {isCreatingGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-white p-4 shadow-lg dark:bg-gray-900">
            <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Tạo nhóm chat mới
            </h3>

            {/* input Đặt tên nhóm */}
            <input
              type="text"
              placeholder="Đặt tên nhóm (không bắt buộc)"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="mb-3 w-full rounded-md border border-gray-300 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />

            <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Chọn thành viên tham gia nhóm:
            </p>

            <div className="mb-3 max-h-60 space-y-1 overflow-y-auto rounded-md border border-gray-200 p-2 dark:border-gray-700">
              {candidateMembers.map((c) => (
                <label
                  key={c.id}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <input
                    type="checkbox"
                    checked={selectedMemberIds.includes(c.id)}
                    onChange={() => toggleMember(c.id)}
                  />
                  <span className="text-gray-800 dark:text-gray-100">
                    {c.name}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={cancelCreateGroup}
                className="rounded-md border px-3 py-1 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Hủy
              </button>
              <button
                onClick={confirmCreateGroup}
                className="rounded-md bg-blue-600 px-3 py-1 font-semibold text-white hover:bg-blue-700"
              >
                Tạo nhóm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
