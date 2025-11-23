import type { UserType } from "./User";

export type MessageType = {
  _id: string;
  conversationId: string;
  sender: UserType;
  content: string;
  createdAt: string;
};
