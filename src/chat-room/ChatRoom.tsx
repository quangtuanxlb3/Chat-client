import { useEffect, useState } from "react";
import ChatList from "./components/ChatList";
import Header from "./components/Header";
import { ConversationType } from "../types/Conversation";
import ConversationService from "../services/ConversationService";
import { UserType } from "../types/User";
import UserService from "../services/UserService";
import SocketService from "../services/SocketService";
import { useSearchParams } from "react-router-dom";
import Conversation from "./components/Conversation";
import type { MessageType } from "../types/Message";
import MessageService from "../services/MessageService";

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
  const [searchParams] = useSearchParams();
  const curId = searchParams.get("id");
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [currentConversation, setCurrentConversation] =
    useState<ConversationType | null>(null);
  const [users, setUsers] = useState<UserType[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [newConversationName, setNewConversationName] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const selectUser = (userId: string) => {
    if (userIds.includes(userId)) {
      setUserIds(userIds.filter((id) => id !== userId));
    } else {
      setUserIds([...userIds, userId]);
    }
  };

  const clearPopup = () => {
    setUserIds([]);
    setNewConversationName("");
  };

  const openPopupCreateConversation = () => {
    setIsOpenPopup(true);
    clearPopup();
  };

  const cancelCreateConversation = () => {
    setIsOpenPopup(false);
    clearPopup();
  };

  const confirmCreateConversation = async () => {
    const dataSubmit = { name: newConversationName, userIds: userIds };
    try {
      const res = await ConversationService.create(dataSubmit);
      if (res.status === "success") {
        cancelCreateConversation();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (content: string) => {
    if (currentConversation && content) {
      const res = await MessageService.sendMessage({
        conversationId: currentConversation._id,
        content,
      });

      if (res.status === "success") {
        setMessages([res.data, ...messages]);
      }
    }
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await ConversationService.getALl();
        if (res.status === "success") {
          setConversations(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await UserService.getALl();
        if (res.status === "success") {
          setUsers(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchConversations();
    fetchUsers();
  }, []);

  const fetchMessages = async (conversationId: string) => {
    if (conversationId) {
      try {
        const res = await MessageService.getByConversation(conversationId);
        if (res.status === "success") {
          setMessages(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const fetchConversation = async () => {
    if (curId) {
      try {
        const res = await ConversationService.getById(curId);
        console.log(res);

        if (res.status === "success") {
          setCurrentConversation(res.data);
          await fetchMessages(res.data._id);
          SocketService.joinConversation(res.data._id);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log(curId);

    if (!curId) return;
    fetchConversation();
  }, [curId]);

  // Xử lý socket
  useEffect(() => {
    SocketService.connect();

    SocketService.onNewConversation((data) => {
      setConversations((prev) => [data, ...prev]);
    });

    SocketService.onNewMessage((data) => {
      console.log(data);
      setMessages((prev) => [data, ...prev]);
    });

    return () => {
      SocketService.disconnect();
    };
  }, []);

  return (
    <div>
      <Header />

      <div className="flex flex-row">
        {/* LEFT SIDE */}
        <div className="h-[calc(100vh-60px)] w-[400px] border-r border-gray-200 bg-gray-100 dark:bg-gray-800">
          <ChatList
            onOpenCreateConversation={openPopupCreateConversation}
            conversations={conversations}
          />
        </div>

        {/* RIGHT SIDE */}
        <Conversation messages={messages} onSend={sendMessage} />
      </div>

      {/* POPUP TẠO NHÓM */}
      {isOpenPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-white p-4 shadow-lg dark:bg-gray-900">
            <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Tạo nhóm chat mới
            </h3>

            {/* input Đặt tên nhóm */}
            <input
              type="text"
              placeholder="Đặt tên nhóm (không bắt buộc)"
              value={newConversationName}
              onChange={(e) => setNewConversationName(e.target.value)}
              className="mb-3 w-full rounded-md border border-gray-300 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />

            <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Chọn thành viên tham gia nhóm:
            </p>

            <div className="mb-3 max-h-60 space-y-1 overflow-y-auto rounded-md border border-gray-200 p-2 dark:border-gray-700">
              {users.map((u) => (
                <label
                  key={u._id}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <input
                    type="checkbox"
                    checked={userIds.includes(u._id)}
                    onChange={() => selectUser(u._id)}
                  />
                  <span className="text-gray-800 dark:text-gray-100">
                    {u.fullname || `@${u.username}`}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={cancelCreateConversation}
                className="rounded-md border px-3 py-1 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Hủy
              </button>
              <button
                onClick={confirmCreateConversation}
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
