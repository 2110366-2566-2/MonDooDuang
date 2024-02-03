import { Socket } from "socket.io"
import { chatRepository } from "../../repositories/chat.repository"

export interface MessageType {
  message: string
  sender: "SELF" | "OTHER"
  isRead: boolean
  timeSent: number
}

export const chatService = {
  getConversationsByUserId: async (userId: string) => {
    const data = await chatRepository.getConversationsByUserId(userId)
    return data.map((conversation) => conversation.conversationid)
  },
  getNameWithLastMessage: async (conversationId: string, userId: string) => {
    const data = await chatRepository.getNameWithLastMessage(conversationId, userId)
    data.name = data.name[0].result
    data.lastMessage = data.lastMessage[0].messagetext
    return data
  },
  getMessagesByConversationId: async (conversationId: string, userId: string) => {
    const messages = await chatRepository.getMessagesByConversationId(conversationId, userId)
    return messages.map((message) => {
      return {
        message: message.messagetext,
        timeSent: message.created_at,
        sender: message.sender,
        isRead: message.isread
      }
    })
  },
  // Socket service
  sendMessage: async (socket: Socket) => {
    socket.on("sendMessage", async (message: MessageType, room: string, senderId: string) => {
      socket.to(room).emit("receiveMessage", message)
      await chatRepository.addMessage(room, senderId, message.message)
    })
  },
  joinRoom: (socket: Socket) => {
    socket.on("joinRoom", async (room: string) => {
      await socket.join(room)
    })
  },
  disconnect: (socket: Socket) => {
    socket.on("disconnect", () => {
      // console.log("User disconnected")
    })
  }
}
