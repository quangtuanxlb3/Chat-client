import { Avatar } from "flowbite-react";
import type { MessageType } from "../../types/Message";

type Props = {
  message: MessageType;
};

export default function ConversationItem({ message }: Props) {
  const user = JSON.parse(localStorage.getItem("chat-user") || "{}");

  // Kiểm tra xem message có phải của user hiện tại
  const isOwnMessage = user._id === message.sender._id;

  return (
    <div
      className={`mb-5 flex items-start gap-3 ${
        isOwnMessage ? "flex-row-reverse text-right" : "flex-row"
      }`}
    >
      <Avatar
        size="sm"
        img={
          message.sender.avatar ||
          "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        }
        alt={`avatar of ${message.sender.username}`}
        rounded
      />
      <div className="flex max-w-[70%] flex-col gap-2">
        <span
          className={`text-md font-semibold ${
            isOwnMessage
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-900 dark:text-white"
          }`}
        >
          {message.sender.fullname || "@" + message.sender.username || ""}
          <span className="ms-3 text-sm font-normal text-gray-500 dark:text-gray-400">
            {new Date(message.createdAt).toLocaleTimeString()}
          </span>
        </span>
        <div
          className={`w-fit rounded-xl p-3 ${
            isOwnMessage
              ? "self-end bg-blue-100 text-gray-900 dark:bg-blue-700 dark:text-white"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
          }`}
        >
          <p className="text-md font-normal">{message.content}</p>
        </div>
      </div>
    </div>
  );
}
