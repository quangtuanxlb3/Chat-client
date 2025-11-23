import AxiosClient from "./AxiosClient";

const ConversationService = {
  getALl(): Promise<any> {
    return AxiosClient.get("/conversations/me");
  },

  create(data: { name: string; userIds: string[] }): Promise<any> {
    return AxiosClient.post("/conversations", data);
  },

  getById(conversationId: string): Promise<any> {
    return AxiosClient.get(`/conversations/${conversationId}`);
  },
};

export default ConversationService;
