// Connect db -> + Join room with conver id
// get all message
// sendmessage -> stored in db

import { Socket } from "socket.io"
import { chatRepository } from "../../repositories/chat.repository"
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
  sendMessage: (socket: Socket) => {
    socket.on("sendMessage", (message: string, room: string) => {
      if (room === "") {
        socket.broadcast.emit("receiveMessage", message)
      } else {
        socket.to(room).emit("receiveMessage", message)
      }
      console.log(message)
    })
  },
  joinRoom: (socket: Socket) => {
    socket.on("joinRoom", async (room: string) => {
      await socket.join(room)
    })
  },
  disconnect: (socket: Socket) => {
    socket.on("disconnect", () => {
      //   console.log("User disconnected")
    })
  }
}
