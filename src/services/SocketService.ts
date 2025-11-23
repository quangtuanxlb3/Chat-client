import { io, type Socket } from "socket.io-client";

const SocketService = {
  socket: null as Socket | null,
  // lưu callback lại
  conversationCallback: null as ((data: any) => void) | null,
  messageCallback: null as ((data: any) => void) | null,
  conversationId: null as string | null,

  connect() {
    if (this.socket) {
      return this.socket;
    }

    const token = localStorage.getItem("chat-token");
    this.socket = io("http://localhost:5000", {
      transports: ["websocket"],
      auth: { token },
    });

    this.socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    // 👉 Gán listener vào đây
    this.socket.on("conversation:new", (data) => {
      if (this.conversationCallback) {
        this.conversationCallback(data);
      }
    });

    this.socket.on("message:new", (data) => {
      if (this.messageCallback) {
        this.messageCallback(data);
      }
    });

    if (this.conversationId) {
      this.socket.emit("conversation:join", this.conversationId);
    }

    return this.socket;
  },

  onNewConversation(callback: (data: any) => void) {
    this.conversationCallback = callback;
  },

  onNewMessage(callback: (data: any) => void) {
    this.messageCallback = callback;
  },

  joinConversation(conversationId: string) {
    this.conversationId = conversationId;
    if (this.socket) {
      this.socket.emit("conversation:join", conversationId);
    }
  },

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.conversationCallback = null;
    }
  },
};

export default SocketService;
