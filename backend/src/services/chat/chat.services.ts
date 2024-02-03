// Connect db -> + Join room with conver id
// get all message

import { Socket } from "socket.io"
import { chatRepository } from "../../repositories/chat.repository"
export const chatService = {
  getConversationsByUserId: async (userId: string) => {
    const data = await chatRepository.getConversationsByUserId(userId)
    return data.map((conversation) => conversation.conversationid)
  },
  getNameWithLastMessage: async (conversationId: string, userId: string) => {
    const data = await chatRepository.getNameWithLastMessage(conversationId, userId)
    return data
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
      console.log("User disconnected")
    })
  }
}
