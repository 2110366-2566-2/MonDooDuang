import { Socket } from "socket.io"
import { chatRepository } from "../../repositories/chat.repository"

export interface MessageType {
  message: string
  sender: "SELF" | "OTHER" | "SYSTEM"
  isRead: boolean
  timeSent: number
}

export const chatService = {
  getConversationsByUserId: async (userId: string) => {
    const data = await chatRepository.getConversationsByUserId(userId)
    if (data === null) {
      return []
    }

    return data.map((conversation) => conversation.conversationid)
  },
  getNameWithLastMessage: async (conversationId: string, userId: string) => {
    const data = await chatRepository.getNameWithLastMessage(conversationId, userId)
    if (data === null) {
      return {
        name: "",
        lastMessage: ""
      }
    }
    data.lastMessage = data.lastMessage === null ? "" : data.lastMessage
    return data
  },
  getMessagesByConversationId: async (conversationId: string, userId: string) => {
    const messages = await chatRepository.getMessagesByConversationId(conversationId, userId)
    if (messages === null) return []

    const formattedMessages: MessageType[] = []
    let prevTimeSent: number

    messages.forEach((message) => {
      const messageDate = message.created_at
      messageDate.setUTCHours(messageDate.getUTCHours() + 7)
      const currentTimeSent: number = messageDate.getTime()

      const formattedDate: string = new Date(currentTimeSent).toLocaleDateString("th-TH", {
        day: "numeric",
        month: "long"
      })
      if (prevTimeSent !== 0 && !chatService.isSameDay(prevTimeSent, currentTimeSent)) {
        formattedMessages.push({
          message: formattedDate,
          timeSent: currentTimeSent,
          sender: "SYSTEM",
          isRead: true
        })
      }

      formattedMessages.push({
        message: message.messagetext,
        timeSent: currentTimeSent,
        sender: message.sender,
        isRead: message.isread
      })

      prevTimeSent = currentTimeSent
    })

    return formattedMessages
  },
  getNameByConversationId: async (conversationId: string, userId: string) => {
    const data = await chatRepository.getNameByConversationId(conversationId, userId)
    if (data === null) {
      return {
        name: ""
      }
    }
    return { name: data[0].result }
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
  },
  isSameDay: (timestamp1: number, timestamp2: number) => {
    const date1 = new Date(timestamp1 * 1000) // Convert seconds to milliseconds
    const date2 = new Date(timestamp2 * 1000) // Convert seconds to milliseconds

    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }
}
