import type { MessageType } from "./Message";
import type { UserType } from "./User";

export type ConversationType = {
  _id: string;
  name: string;
  isGroup: boolean;
  members: UserType[];
  isRead: boolean;
  unreadCount: number;
  lastMessage: MessageType;
  createdBy: UserType;
  createdAt: string;
};
