import AxiosClient from "./AxiosClient";

const MessageService = {
  getByConversation(conversationId: string): Promise<any> {
    return AxiosClient.get(`/messages`, { params: { conversationId } });
  },

  sendMessage(data: { conversationId: string; content: string }): Promise<any> {
    return AxiosClient.post("/messages/send", data);
  },
};

export default MessageService;
